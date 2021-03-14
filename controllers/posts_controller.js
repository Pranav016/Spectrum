// importing models
const Post = require("../models/post");
const Comment = require("../models/comment");

// create posts
module.exports.create = async (req, res) => {
	try {
		await Post.create({
			content: req.body.content,
			user: req.user._id,
		});
		return res.redirect("back");
	} catch (err) {
		console.log(`Error in creating post: ${err}`);
		return res.redirect("back");
	}
};

module.exports.destroy = async (req, res) => {
	try {
		let post = await Post.findById(req.params.id);
		/* post.user will be 'id' by default since we didn't populate the user obj
		.id means converting object id into string hence it can replace '_id' */
		if (post.user == req.user.id) {
			post.remove();
		}
		await Comment.deleteMany({ post: req.params.id });
		return res.redirect("back");
	} catch (err) {
		console.log(
			`Error in deleting comments of post id ${req.params.id}: ${err}`
		);
		return res.redirect("back");
	}
};
