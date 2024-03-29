const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = async (req, res) => {
	try {
		let posts = await Post.find({})
			.populate("user")
			.populate({
				path: "comments",
				populate: {
					path: "user",
				},
			});
		let users = await User.find({});
		return res.render("home", {
			title: "Home",
			posts: posts,
			all_users: users,
		});
	} catch (err) {
		console.log("Error with home controller:", err);
		return res.redirect("back");
	}
};
