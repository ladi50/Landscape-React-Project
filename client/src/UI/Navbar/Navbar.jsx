import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import MenuLogo from "./MenuLogo/MenuLogo";
import "./Navbar.css";

function Navbar(props) {

	useEffect(() => {
		const links = document.querySelectorAll("a");
		links.forEach(link => {
			if(link.href === window.location.href && link.href !== "http://localhost:3000/") {
				link.classList.add("activeLink");
			}
		})
	}, []);

	const toggleLinks = () => {
		let mobileMenu = document.getElementById("mobile");
		let mobileLink = mobileMenu.querySelectorAll(".mobile-link");

		
		if (mobileMenu.style.display === "flex") {
			mobileLink[0].style.display = "none";
			mobileLink[1].style.display = "none";
			if (!props.isLoggedIn) {
				mobileLink[2].style.display = "none";
			}
			mobileMenu.classList.remove("navbar-mobile");
			mobileMenu.classList.add("navbar-mobile-reverse");
			setTimeout(() => {
				mobileMenu.style.display = "none";
			}, 800);
		} else {
			mobileLink[0].style.display = "none";
			mobileLink[1].style.display = "none";
			if (!props.isLoggedIn) {
				mobileLink[2].style.display = "none";
			}
			mobileMenu.style.display = "flex";
			mobileMenu.classList.replace("navbar-mobile-reverse", "navbar-mobile");
			setTimeout(() => {
				mobileLink[0].style.display = "block";
				mobileLink[1].style.display = "block";
				if (!props.isLoggedIn) {
					mobileLink[2].style.display = "block";
				}
			}, 700);
		}
	};

	const mouseOverBurgerHandler = () => {
		const divs = document.querySelectorAll(".burgerBar");
		divs[0].style.backgroundColor = "#F4F5E0";
		divs[1].style.backgroundColor = "#F4F5E0";
		divs[2].style.backgroundColor = "#F4F5E0";
	};

	const mouseOutBurgerHandler = () => {
		const divs = document.querySelectorAll(".burgerBar");
		divs[0].style.backgroundColor = "black";
		divs[1].style.backgroundColor = "black";
		divs[2].style.backgroundColor = "black";
	};

	const userButtonOver = () => {
		const link = document.querySelectorAll(".userLink");
		link[0].innerHTML = "Logout";
		link[1].innerHTML = "Logout";
	};
	const userButtonOut = () => {
		const link = document.querySelectorAll(".userLink");
		link[0].innerHTML = "Hello " + username;
		link[1].innerHTML = "Hello " + username;
	};

	const username = window.sessionStorage.getItem("user");

	return (
		<React.Fragment>
			<div className="navbar">
				<ul className="navbar-links">
					<li>
						<NavLink className="home-link" to="/">
							<img className="logo" src={process.env.PUBLIC_URL + '/images/logo.png'} alt="logo" />
							Landscape
						</NavLink>
					</li>
					<li onMouseOver={mouseOverBurgerHandler} onMouseOut={mouseOutBurgerHandler} className="right burger">
						<MenuLogo className="burger-link" click={toggleLinks}>
							<img className="burger-logo" src= {process.env.PUBLIC_URL + '/images/menu.png'} alt="menu-logo" />
						</MenuLogo>
					</li>
					<div id="links">
						{ 
							!props.isLoggedIn ? 
							<>
								<li className="right"><NavLink to="/login">Log In</NavLink></li>
								<li className="right"><NavLink to="/signup">Sign Up</NavLink></li>
							</>
							:
								<li onMouseOver={userButtonOver} onMouseOut={userButtonOut} className="right">
									<NavLink onClick={(e) => {props.onLogout(e)}} className="userLink" to="/logout">
										Hello {username}
									</NavLink>
								</li>
						 }
						<li className="right"><NavLink to="/pictures">Pictures</NavLink></li>
					</div>
				</ul>
			</div>
			<div id="mobile" className="navbar-mobile">
				<NavLink style={{width: props.isLoggedIn ? "100%" : "33.34%"}} className="mobile-link" to="/pictures">Pictures</NavLink>
				{
					!props.isLoggedIn ?
					<div style={{ width: "66.66%" }}>
						<NavLink style={{width: "50%"}} className="mobile-link" to="/signup">Sign Up</NavLink>
						<NavLink style={{width: "50%"}} className="mobile-link" to="/login">Log In</NavLink>
					</div>
					:
						<li onMouseOver={userButtonOver} onMouseOut={userButtonOut} style={{width: "100%"}}>
							<NavLink onClick={(e) => {props.onLogout(e)}} className="mobile-link userLink" to="/logout">
								Hello {username}
							</NavLink>
						</li>
				}
			</div>
		</React.Fragment>
	);
};

export default Navbar;