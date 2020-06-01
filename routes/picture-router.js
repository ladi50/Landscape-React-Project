const express = require("express");
const path = require("path");
const multer = require("multer");
const passport = require("passport");

const router = express.Router();

// The Pictures DB
const Picture = require("../models/picture-model"); 

const storage = multer.diskStorage({
	// Destination means - what is the directory that the file exists in.
	destination: (req, file, cb) => {
		cb(null, path.dirname("C://Users//ADI//Desktop//FullStack//React//Landscape//client//public//images"));
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	}
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
		cb(null, true);
	} else {
		cb(null, false);
		return cb(new Error('Only .png, .jpg and .jpeg formats allowed!'));
	}
};

const upload = multer({
	storage,
	fileFilter,
	limits: {
		fileSize: 1000000
	}
});

// Upload a Picture
router.post("/upload", upload.single("uploadPicture"), (req, res) => {

	if (!req.file) {
		console.log("Something went wrong while uploading a picture.");
	} else if (req.isAuthenticated) {
		res.json({ success: true, data: req.file });

		const { title } = req.body;
		const picture = new Picture({
			title,
			fileName: req.file.originalname,
			size: req.file.size,
			destination: req.file.destination + req.file.originalname,
			measures: {
					likes: {
						amount: 0,
						userID: []
					},
					hearts: {
						amount: 0,
						userID: []
					},
					views: {
						amount: 0,
						userID: []
					}
				},
			userID: req.user._id
		});

		picture.save(err => {
			if (err instanceof multer.MulterError) {
				console.log(err);
			} else if (err) {
				console.log(err);
			} else {
				console.log("A new picture was added to the DB!");
				console.log(req.file);
			}
		});
	}
});

// Post all the pictures on /pictures
router.post("/", (req, res) => {
	Picture.find({}, (err, foundPics) => {
		if (!foundPics) {
			return console.log("No Pictures have found.");
		} else if (err) {
			return console.log(err);
		}
		res.json({ success: true, data: foundPics })
	});
});

// Update icons bar of each picture

// // Update hearts of picture
router.patch("/hearts", (req, res) => {
	const { id, userId } = req.body;

	Picture.findOne({ _id: id }, (err, foundPic) => {
		if (foundPic) {
			const heartsUserId = foundPic.measures.hearts.userId;

			if (heartsUserId.includes(userId)) {
				console.log(`The user ${userId} has already loved that pic.`);
				res.json({ success: false, data: "You already loved that pic." });
			} else {
				Picture.updateOne({ _id: id }, { $inc: { "measures.hearts.amount": 1 }, $push: { "measures.hearts.userId": userId } }, (err, updatedPic) => {
					res.json({ success: true, data: foundPic });
				});
			}
		} else {
			console.log("Icons Update Error: ", err);
		}
	})
});

// // Update likes of picture
router.patch("/likes", (req, res) => {
	const { id, userId } = req.body;

	Picture.findOne({ _id: id }, (err, foundPic) => {
		if (foundPic) {
			const likesUserId = foundPic.measures.likes.userId;

			if (likesUserId.includes(userId)) {
				console.log(`The user ${userId} has already liked that pic.`);
				res.json({ success: false, data: "You already liked that pic." });
			} else {
				Picture.updateOne({ _id: id }, { $inc: { "measures.likes.amount": 1 }, $push: { "measures.likes.userId": userId } }, (err, updatedPic) => {
					res.json({ success: true, data: foundPic });
				});
			}
		} else {
			console.log("Icons Update Error: ", err);
		}
	})
});

// // Update views of picture
router.patch("/:id", (req, res) => {
	const { id, userId } = req.body;

	Picture.findOne({ _id: id }, (err, foundPic) => {
		if (foundPic) {
			Picture.updateOne({ _id: id }, { $inc: { "measures.views.amount": 1 }, $push: { "measures.views.userId": userId } }, (err, updatedPic) => {
				res.json({ success: true, data: foundPic });
			});
		} else {
			console.log("Icons Update Error: ", err);
		}
	})
});

// Post a particular pic with a given ID
router.post("/:id", (req, res) => {
	const { id } = req.body;

	Picture.find({ _id: id }, (err, foundPic) => {
		if (foundPic) {
			res.json({ success: true, data: foundPic })
		} else if (!foundPic) return console.log("No pic was found.")
		else {
			console.log(err);
		}
	});
});

// Edit picture's title
router.put("/:id/edit", (req, res) => {
	const { id, title } = req.body;

	Picture.findOne({ _id: id }, (err, foundPic) => {
		if (foundPic) {

			Picture.updateOne({ _id: id }, { $set: { title } }, (err , updatedPic) => {
				res.json({ succes: true, data: foundPic });
				console.log("The new title is: ", title);
			});

		} else if (!foundPic) return console.log("No pic was found.")
		else {
			console.log(err);
		}
	});
});

router.delete("/:id/delete", (req, res) => {
	const { id } = req.body;

	Picture.deleteOne({ _id: id }, ( err, deletedPic ) => {
		if (err) return console.log(err);
		console.log(`Picture with id ${id} has been deleted.`);
		res.json({ success: true, data: deletedPic });
	});
});

module.exports = router;