const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = (req, res) => {
	Post.findById(req.body.postId, (err, post) => {
		if (err) {
			console.log(`error in saving comment: ${err}`);
		}
		if (post) {
			Comment.create(
				{
					content: req.body.content,
					user: req.user._id,
					post: req.body.postId,
				},
				(err, comment) => {
					if (err) {
						console.log(`error in saving comment: ${err}`);
					}
					post.comments.push(comment);
					post.save();

					return res.redirect("/");
				}
			);
		}
	});
};

module.exports.destroy = (req, res) => {
	Comment.findById(req.params.id, (err, comment) => {
		if (err) {
			console.log(`Error in deleting comment: ${err}`);
		}
		//comments.user is an id by default since it is un-populated
		if (comment.user == req.user.id) {
			let postId = comment.post;
			comment.remove();
			Post.findByIdAndUpdate(
				postId,
				{ $pull: { comments: req.params.id } },
				(err) => {
					console.log(
						`Error in deleting comment from posts model: ${err}`
					);
				}
			);
		}
		return res.redirect("back");
	});
};
