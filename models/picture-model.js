const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pictureSchema = new Schema(
	{
		id: Number,
		title: {
			type: String,
			required: true
		},
		fileName: String,
		size: Number,
		destination: String,
		measures: {
				likes: {
					amount: 0,
					userId: []
				},
				hearts: {
					amount: 0,
					userId: []
				},
				views: {
					amount: 0,
					userId: []
				}
			},
		userID: mongoose.ObjectId
	},
	{ timestamps: true }
);

const Picture = mongoose.model("Picture", pictureSchema);

module.exports = Picture;