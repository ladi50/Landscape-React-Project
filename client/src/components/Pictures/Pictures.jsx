import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../../UI/Navbar/Navbar";
import Picture from "./Picture/Picture";
import axios from "axios";
import "./Pictures.css";

const Pictures = (props) => {
	const [ pictures, setPictures ] = useState([]);
	const { setFalse } = props;

	useEffect(() => {
			axios.post("http://localhost:3001/pictures", {}, { withCredentials: true })
				.then(res => {

					const pics = res.data.data.map((pic, index) => {
						return <Picture 
							key={index} 
							clicked={() => setFalse()}
							picTitle={pic.title}
							picture={process.env.PUBLIC_URL + "/images/" + pic.fileName} 
							title={pic.title}
							url={"/pictures/" + pic._id}
							heart={process.env.PUBLIC_URL + "/images/heart.png"}
							picId={pic._id}
							heartsAmount={pic.measures.hearts.amount}
							likesAmount={pic.measures.likes.amount}
							viewsAmount={pic.measures.views.amount}
							like={process.env.PUBLIC_URL + "/images/like.png"}
							views={process.env.PUBLIC_URL + "/images/eye.png"}
							imgClicked={imgClicked}
							showIcons={showIcons}
							showIconsHoveringBar={showIconsHoveringBar}
							hideIconsHoveringBar={hideIconsHoveringBar}
							hideIcons={hideIcons}
							isLoggedIn={props.isLoggedIn}
						/>

						function imgClicked(e) {
							e.stopPropagation();
						};

						function showIcons(iconsDiv, icons, image) {
							iconsDiv[index].style.height = "24px";
							iconsDiv[index].style.padding = "8px 0";

							let icon = iconsDiv[index].getElementsByClassName("icons");
							setTimeout(() => {
								if (iconsDiv[index].style.height === "24px") {
											icon[0].style.display = "inline-block";
											icon[1].style.display = "inline-block";
											icon[2].style.display = "inline-block";
								}
							}, 450);

							image[index].style.outline = "3px solid rgb(70, 68, 68)";
						};

						function hideIcons(iconsDiv, icons, image) {
							iconsDiv[index].style.height = "0";
							iconsDiv[index].style.padding = "0";

							let icon = iconsDiv[index].getElementsByClassName("icons");
							setTimeout(() => {
								if (iconsDiv[index].style.height < "24px") {
									icon[0].style.display = "none";
									icon[1].style.display = "none";
									icon[2].style.display = "none";
								}
							}, 50);

							image[index].style.outline = "none";
						};

						function showIconsHoveringBar(iconsDiv, icons, image) {
							iconsDiv[index].style.height = "24px";
							iconsDiv[index].style.padding = "8px 0";

							let icon = iconsDiv[index].getElementsByClassName("icons");
							setTimeout (() => {
								if (iconsDiv[index].style.height === "24px") {
									icon[0].style.display = "inline-block";
									icon[1].style.display = "inline-block";
									icon[2].style.display = "inline-block";
								}
							}, 450)

							image[index].style.outline = "3px solid rgb(70, 68, 68)";
						};

						function hideIconsHoveringBar(iconsDiv, icons, image) {
							iconsDiv[index].style.height = "0";
							iconsDiv[index].style.padding = "0";

							let icon = iconsDiv[index].getElementsByClassName("icons");
							setTimeout(() => {
								if (iconsDiv[index].style.height < "24px") {
									icon[0].style.display = "none";
									icon[1].style.display = "none";
									icon[2].style.display = "none";
								}
							}, 50);

							image[index].style.outline = "none";
						};
					});

					setPictures(prevPics => {
						return [ ...prevPics, pics.filter(pic => pic) ];
					});
				})
				.catch(err => console.log(err));
	}, [ setPictures, setFalse, props.isLoggedIn ]);

	return (
		<div>
			<Navbar onLogout={props.onLogout} isLoggedIn={props.isLoggedIn}/>
			<div id="pic-div">
				{ props.isLoggedIn &&
					<NavLink onClick={() => setFalse()} id="uploadButton" to="/pictures/upload">Upload Picture</NavLink>
				}
				{pictures}
			</div>
		</div>
	);
};

export default React.memo(Pictures);