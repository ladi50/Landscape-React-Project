import React from "react";
import boatImg from "./boat-img.jpg";
import beachImg from "./beach-img.jpg";
import lakeImg from "./lake-img.jpg";
import "./HomeImages.css";

const HomeImages = () => {
	const changeImgHandler = () => {
		let img = document.getElementById("img");
		
		switch (img.src) {
			case ("http://localhost:3000" + boatImg):
				setTimeout(() => {
					img.style.opacity = 0;
				}, 6000);
				setTimeout(() => {
					img.src = "http://localhost:3000" + beachImg;
				}, 9000);
				setTimeout(() => {
					img.style.opacity = 1;
				}, 9500);
				break;
			case ("http://localhost:3000" + beachImg):
				setTimeout(() => {
					img.style.opacity = 0;
				}, 6000);
				setTimeout(() => {
					img.src = "http://localhost:3000" + lakeImg;
				}, 9000);
				setTimeout(() => {
					img.style.opacity = 1;
				}, 9500);
				break;
			case ("http://localhost:3000" + lakeImg):
				setTimeout(() => {
					img.style.opacity = 0;
				}, 6000);
				setTimeout(() => {
					img.src = "http://localhost:3000" + boatImg;
				}, 9000);
				setTimeout(() => {
					img.style.opacity = 1;
				}, 9500);
				break;
			default:
				img.src = "http://localhost:3000" + boatImg;
		}
	};

	return (
		<img id="img" onLoad={changeImgHandler} src={boatImg} alt="view"/>
	);
};

export default HomeImages;