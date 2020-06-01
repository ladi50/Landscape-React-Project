import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../../UI/Navbar/Navbar";
import axios from "axios";

import editIcon from "./edit-icon.png";
import "./EditPicture.css";

function EditPicture(props) {
	const [ text, setText ] = useState("");

	const userId = window.sessionStorage.getItem("userId");
	const picUserId = window.sessionStorage.getItem("picUserId");

	const { editSession, deleteSession } = props;
	const { id } = useParams();

	function changeHandler(e) {
		const { value } = e.target;
		setText(value);
	};

	function editPicture(e) {
		e.preventDefault();

		axios.put("http://localhost:3001/pictures/:id/edit", 
			{ id, title: text }, 
			{ withCredentials: true }
		).then(res => {
			console.log("Edit status: ", res.status);
			if (res.status === 200) {
				const fileName = res.data.data.fileName;
				editSession(fileName);
			}
		})
		.catch(err => console.log(err));
	};

	function deletePicture(e) {
		e.preventDefault();

		axios.delete("http://localhost:3001/pictures/:id/delete", 
			{ data: { id } }
		).then(res => {
			console.log("Delete status: ", res.status);
			if (res.status === 200 && userId === picUserId) {
				deleteSession(id);
			}
		})
		.catch(err => console.log(err));
	};

	return (
		<div>
			<Navbar onLogout={props.onLogout} isLoggedIn={props.isLoggedIn} />
			<form id="upload-form" method="post">
				<img id="img-logo" src={editIcon} alt="img-icon" />
				<h2 style={{ color: "#0B5774" }}>Edit Picture</h2>
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
				<button onClick={editPicture} id="upload-button" type="submit">Edit</button>
				<br />
				<button onClick={deletePicture} id="delete-button" type="submit">Delete</button>
			</form>
		</div>
	);
};

export default React.memo(EditPicture);