// importing models
const Post = require("../models/post");
const Comment = require("../models/comment");

// create posts
module.exports.create = (req, res) => {
	Post.create(
		{
			content: req.body.content,
			user: req.user._id,
		},
		(err, post) => {
			if (err) {
				console.log(`Error in making post: ${err}`);
			}
			return res.redirect("back");
		}
	);
};

module.exports.destroy = (req, res) => {
	Post.findById(req.params.id, (err, post) => {
		/* post.user will be 'id' by default since we didn't populate
		.id means converting object id into string hence it can replace '_id' */
		if (post.user == req.user.id) {
			post.remove();
			Comment.deleteMany({ post: req.params.id }, (err) => {
				if (err) {
					console.log(
						`Error in deleting comments of post id: ${req.params.id}`
					);
				}
			});
		}
		return res.redirect("back");
	});
};
