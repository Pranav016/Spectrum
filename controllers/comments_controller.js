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
