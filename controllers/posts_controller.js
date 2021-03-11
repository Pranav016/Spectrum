// importing models
const Post = require("../models/post");

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
