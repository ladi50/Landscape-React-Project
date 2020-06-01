const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");
const passport = require("passport");

// The User Routes
const users = require("./routes/user-router");

// The Pictures Routes
const pictures = require("./routes/picture-router");

// The Server PORT
const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors({ credentials: true, methods: [ "GET", "POST", "PUT", "PATCH", "DELETE" ], origin: "http://localhost:3000" }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use(session({
	secret: "This is my secret",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/landscape-reactDB", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
});

// Using the Users Routes
app.use(users);

// Using the Pictures Routes
app.use("/pictures", pictures);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));