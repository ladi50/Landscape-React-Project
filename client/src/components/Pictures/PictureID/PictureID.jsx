import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import Navbar from "../../../UI/Navbar/Navbar";
import axios from "axios";

import "./PictureID.css";

function PictureID(props) {
	const { id } = useParams();

	const userId = window.sessionStorage.getItem("userId");
	const pictureUserId = window.sessionStorage.getItem("picUserId");

	const [ alt, setAlt ] = useState("");
	const [ picURL, setPicURL ] = useState("");
	const [ picUserId, setPicUserId ] = useState("");
	const [ likes, setLikes ] = useState(null);
	const [ hearts, setHearts ] = useState(null);
	const [ views, setViews ] = useState(null);

	const editIcon = "edit-icon-black.png";
	const editIcon2 = "edit-icon2.png";
	const trashIcon = "trash-icon.png";
	const trashIcon2 = "trash-icon2.png";

	const editLink = `/pictures/${id}/edit`;
	const deleteLink = `/pictures/${id}/delete`;

	// Find the picture with the given ID in the DB.
	useEffect(() => {
		if (id !== "upload") {
			axios.post("http://localhost:3001/pictures/:id", { id })
				.then((res) => {
					setPicURL(res.data.data[0].fileName);
					setAlt(res.data.data[0].title);
					console.log(`A pic was found with id ${id}`); 
					setPicUserId(res.data.data[0].userID);
					window.sessionStorage.setItem("picUserId", res.data.data[0].userID);
				})
				.catch(err => console.log(err));
		}
	}, [ setPicURL, setAlt, id, setPicUserId ]);

	useEffect(() => {

		const iconsDivId = document.getElementById("icons-div");
		const img = document.getElementsByClassName("img")[0];
		const editIconElement = document.getElementById("edit-icon");
		const trashIconElement = document.getElementById("trash-icon");

		if (props.isLoggedIn && userId === picUserId) {

			iconsDivId.addEventListener("mouseover", () => {
				img.style.opacity = 0.6;
				iconsDivId.style.display = "block";
			});
			img.addEventListener("mouseout", () => {
				img.style.opacity = 1;
				iconsDivId.style.display = "none";
			});
			img.addEventListener("mouseover", () => {
				img.style.opacity = 0.6;
				iconsDivId.style.display = "block";
			});
			editIconElement.addEventListener("mouseover", () => {
				editIconElement.src = "http://localhost:3000" + process.env.PUBLIC_URL + "/images/" + editIcon2;
			});
			editIconElement.addEventListener("mouseout", () => {
				editIconElement.src = "http://localhost:3000" + process.env.PUBLIC_URL + "/images/" + editIcon;
			});
			trashIconElement.addEventListener("mouseover", () => {
				trashIconElement.src = "http://localhost:3000" + process.env.PUBLIC_URL + "/images/" + trashIcon2;
			});
			trashIconElement.addEventListener("mouseout", () => {
				trashIconElement.src = "http://localhost:3000" + process.env.PUBLIC_URL + "/images/" + trashIcon;
			});
		};
	}, [ props.isLoggedIn, picUserId, userId ]);

	// Raise views by 1 when entering the picture's page. 
	useEffect(() => {
		axios.patch("http://localhost:3001/pictures/:id", {
			id,
			userId
		})
		.then(res => {
			console.log("Views: ", res.status);
		})
		.catch(err => console.log(err));
	}, [ id, userId ]);

	// Show icons under picture
	useEffect(() => {
		axios.post("http://localhost:3001/pictures/:id", { id })
				.then((res) => {
					setLikes(res.data.data[0].measures.likes.amount);
					setHearts(res.data.data[0].measures.hearts.amount);
					setViews(res.data.data[0].measures.views.amount + 1);
				})
				.catch(err => console.log(err));
	}, [ id, setLikes, setHearts, setViews ]);

	function deletePicture(e) {
		e.preventDefault();

		axios.delete("http://localhost:3001/pictures/:id/delete", 
			{ data: { id } }
		).then(res => {
			console.log("Delete status: ", res.status);
			if (res.status === 200 && userId === pictureUserId) {
				props.deleteSession(id);
			}
		})
		.catch(err => console.log(err));
	};

	return (
		<div>
			<Navbar onLogout={props.onLogout} isLoggedIn={props.isLoggedIn} />
			<div id="picID">
				<h3>{alt}</h3>
				<img 
					className={ props.isLoggedIn && userId === picUserId ? "img hoverPicID" : "img" }
					src={process.env.PUBLIC_URL + "/images/" + picURL} 
					alt={alt} 
				/>
				{ 
					props.isLoggedIn &&
					<div id="icons-div">
						<a href={editLink}>
							<img
								id="edit-icon"
								src={process.env.PUBLIC_URL + "/images/" + editIcon} 
								alt="edit-icon" 
							/>
						</a>
						<NavLink to={deleteLink} onClick={deletePicture}>
							<img 
								id="trash-icon"
								src={process.env.PUBLIC_URL + "/images/" + trashIcon} 
								alt="delete-icon" 
							/>
						</NavLink>
					</div>
				}
				<div id="idIconsDiv">
					<div className="idIcons">
						<img width="30px" height="30px" src={process.env.PUBLIC_URL + "/images/heart2.png"} alt="hearts" />
						<span className="idNumbers">{hearts}</span>
					</div>
					<div className="idIcons">
						<img width="30px" height="30px" src={process.env.PUBLIC_URL + "/images/like.png"} alt="likes" />
						<span className="idNumbers">{likes}</span>
					</div>
					<div className="idIcons">
						<img width="30px" height="30px" src={process.env.PUBLIC_URL + "/images/eye.png"} alt="views" />
						<span className="idNumbers">{views}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default React.memo(PictureID);