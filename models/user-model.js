const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		id: Number,
		username: {
			type: String,
			unique: false,
			required: true
		},
		email: {
			type: String,
			unique: true,
			required: true
		},
		password: {
			type: Number,
			min: [ 6, "Password must be at least 6 characters." ]
		}
	},
	{ timestamps: true }
);

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const User = mongoose.model("User", userSchema);

module.exports = User;