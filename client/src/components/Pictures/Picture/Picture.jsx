import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./Picture.css";

function Picture(props) {
	const userId = window.sessionStorage.getItem("userId");
	const loggedIn = window.sessionStorage.getItem("loggedIn");
	const [ hearts , setHearts ] = useState(0);
	const [ likes, setLikes ] = useState(0);

	const iconsDiv = document.getElementsByClassName("iconsBar");
	const icons = document.getElementsByClassName("icons");
	const image = document.getElementsByClassName("pic-img");

	const { picId, heartsAmount, likesAmount, viewsAmount } = props;

	useEffect(() => {
		setHearts(heartsAmount);
		setLikes(likesAmount);
	}, [ setHearts, setLikes, heartsAmount, likesAmount ]);

	function heartsNumHandler(picId) {
		if (loggedIn === "true") {
			axios.patch("http://localhost:3001/pictures/hearts", {
				id: picId,
				userId
			})
			.then(res => {
				if (res.data.success === true) {
					setHearts(prevstate => prevstate + 1);
					console.log("Hearts: ", res.status);
				}
				else if (res.data.success === false) {
					alert(res.data.data);
				}
			})
			.catch(err => console.log(err));
		} else {
			alert("Log In Please.");
		}
	};

	function likesNumHandler(picId) {
		if (loggedIn === "true") {
			axios.patch("http://localhost:3001/pictures/likes", {
				id: picId,
				userId
			})
			.then(res => {
				if (res.data.success === true) {
					setLikes(prevstate => prevstate + 1);
					console.log("Likes: ", res.status);
				}
				else if (res.data.success === false) {
					alert(res.data.data);
				}
			})
			.catch(err => console.log(err));
		} else {
			alert("Log In Please.");
		}
	};

	return (
		<div id="pics-div">
			<h3 className="pic-title">{props.picTitle}</h3>
			<NavLink className="pic-link" to={props.url}>
				<img
					className="pic-img" 
					src={props.picture} 
					alt={props.title} 
					onClick={(e) => props.imgClicked(e)}
					onMouseOver={() => props.showIcons(iconsDiv, icons, image)}
					onMouseOut={() => props.hideIcons(iconsDiv, icons, image)}
				/>
			</NavLink>
			<div 
				id="icons-bar" 	
				className="iconsBar" 
				onMouseOver={
					() => props.showIconsHoveringBar(iconsDiv, icons, image)
				}
				onMouseOut={
					() => props.hideIconsHoveringBar(iconsDiv, icons, image)
				}
			>
				<div className="icons">
					<img
						id="heart"
						onClick={() => heartsNumHandler(picId)}
						src={props.heart}
						alt={props.heartTitle}
					/>
					<span className="number">{ hearts }</span>
				</div>
				<div className="icons">
					<img
						id="like"
						onClick={() => likesNumHandler(picId)}
						src={props.like}
						alt={props.likeTitle}
					/>
					<span className="number">{ likes }</span>
				</div>
				<div className="icons">
					<img
						id="views"
						src={props.views}
						alt={props.viewsTitle}
					/>
					<span className="number">{ viewsAmount }</span>
				</div>
			</div>
		</div>
	);
};

export default React.memo(Picture);