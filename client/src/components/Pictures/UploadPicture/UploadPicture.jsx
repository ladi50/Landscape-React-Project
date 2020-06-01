import React, { useState } from "react";
import Navbar from "../../../UI/Navbar/Navbar";
import axios from "axios";

import imageIcon from "./img-icon.png";
import "./UploadPicture.css";

function UploadPicture(props) {
	const [ text, setText ] = useState("");
	const [ file, setFile ] = useState("");

	const { uploadSession } = props;

	function uploadPicHandler(e) {
		e.preventDefault();

		const formData = new FormData();
		formData.append("title", text);
		formData.append("uploadPicture", file);

		axios.post("http://localhost:3001/pictures/upload", formData, { withCredentials: true })
		.then(res => {
			if (res.status === 200) {
				console.log("A new picture was added!");

				const fileName = res.data.data.originalname;
				uploadSession(fileName);
			}
		})
		.catch(err => console.log(err));
	};

	function changeHandler(e) {
		const { value } = e.target;
		setText(value);
	};

	function fileChangeHandler(e) {
		setFile(e.target.files[0]);
	};

	return (
		<div>
			<Navbar onLogout={props.onLogout} isLoggedIn={props.isLoggedIn} />
			<form onSubmit={(e) => uploadPicHandler(e)} id="upload-form" method="post">
				<img id="img-logo" src={imageIcon} alt="img-icon" />
				<h2 style={{ color: "#0B5774" }}>Upload a Picture</h2>
				<input 
					id="upload-input" 
					onChange={changeHandler} 
					type="text" 
					name="title" 
					value={text} 
					placeholder="Picture Title" 
					autoComplete="off" 
				/>
				<br /><br />
				<input 
					onChange={fileChangeHandler} 
					type="file" 
					name="uploadPicture" 
				/>
				<br /><br />
				<button id="upload-button" type="submit">Add Picture</button>
			</form>
		</div>
	);
};

export default React.memo(UploadPicture);