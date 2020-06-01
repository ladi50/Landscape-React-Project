const express = require("express");
const passport = require("passport");

const router = express.Router();

// The User DB
const User = require("../models/user-model");

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user);
	});
});

router.post("/signup", (req, res) => {
	const { username, email, password } = req.body;

	User.find({}, (err, foundUsers) => {

		User.findOne({ email }, (err, foundUser) => {
			if (foundUser) {
				return console.log(`A user with the email ${email} is already exists.`);
			}
			else {
				User.register({ username, email }, password, (err, user) => {
					if (err && !foundUser) {
						console.log("Error with signing up a new user: ", err);
					} else {
						passport.authenticate("local")(req ,res, function() {
							console.log(`The user ${username} has been added to the DB!`);
							res.json({ success: true, data: req.user });
						});
					}
				});
			}
		});
	});
});

router.post("/login", (req, res) => {
	const { email, password } = req.body;
	const user = new User({ email, password });

	User.findOne({ email }, (err, foundUser) => {
		if (foundUser) {
			req.login(user, err => {
				if (err) {
					console.log("Error: ", err);
				} else {
					res.json({ success: true, data: foundUser });
					passport.authenticate("local")(req, res, function() {
						console.log(`A user with id ${foundUser._id} has logged to the website!`);
					});
				}
			})
		} else {
			console.log(`There are no users with the email ${email}`);
			const errMessage = "Invalid email and/or password, please try again";
			res.json({ success: false, data: errMessage })
		}
		console.log()
	})
});

router.get('/logout', function(req, res){
  req.logout();
  req.session.destroy();
});

module.exports = router;