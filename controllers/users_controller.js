// importing models
const User = require("../models/user");

// render profile page
module.exports.profile = (req, res) => {
	User.findById(req.params.id, (err, user) => {
		if (err) {
			console.log(`error in loading profile ${err}`);
		}
		return res.render("user_profile", {
			title: "Profile",
			profile_user: user,
		});
	});
};

// render posts
module.exports.posts = (req, res) => {
	return res.end("<h1>User Posts</h1>");
};

// render sign-up page
module.exports.signUp = (req, res) => {
	if (req.isAuthenticated()) {
		return res.redirect("/users/profile");
	}
	return res.render("user_sign_up", {
		title: "Sign Up",
	});
};

// render sign-in page
module.exports.signIn = (req, res) => {
	if (req.isAuthenticated()) {
		return res.redirect("/users/profile");
	}
	return res.render("user_sign_in", {
		title: "Sign In",
	});
};

// get sign-up data
module.exports.create = async (req, res) => {
	try {
		if (req.body.password != req.body.confirm_password) {
			return res.redirect("back");
		}
		let user = await User.findOne({ email: req.body.email });
		if (!user) {
			await User.create(req.body);
			return res.redirect("/users/sign-in");
		}
	} catch (err) {
		console.log(`Error in sign-up controller: ${err}`);
		return res.redirect("back");
	}
};

// updating profile info
module.exports.update = (req, res) => {
	/* we check here to confirm that any other person is
	not just putting another id and is able to update their info,
	person making the request can only update his profile info */
	if (req.user.id == req.params.id) {
		User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
			return res.redirect("back");
		});
	} else {
		return res.status(401).send("Unauthorized access");
	}
};

// sign-in and create session for the user
module.exports.createSession = (req, res) => {
	return res.redirect("/");
};

// sign-out feature
module.exports.destroySession = (req, res) => {
	req.logout();
	return res.redirect("/");
};
