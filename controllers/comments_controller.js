const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async (req, res) => {
	try {
		let post = await Post.findById(req.body.postId);
		if (post) {
			let comment = await Comment.create({
				content: req.body.content,
				user: req.user._id,
				post: req.body.postId,
			});
			post.comments.push(comment);
			post.save();
		}
		return res.redirect("/");
	} catch (err) {
		if (err) {
			console.log(`error in saving comment: ${err}`);
			return res.redirect("back");
		}
	}
};

module.exports.destroy = async (req, res) => {
	try {
		let comment = await Comment.findById(req.params.id);
		//comments.user is an id by default since it is un-populated
		if (comment.user == req.user.id) {
			let postId = comment.post;
			comment.remove();
			await Post.findByIdAndUpdate(postId, {
				$pull: { comments: req.params.id },
			});
		}
		return res.redirect("back");
	} catch (err) {
		console.log(`Error in deleting comment: ${err}`);
		return res.redirect("back");
	}
};
