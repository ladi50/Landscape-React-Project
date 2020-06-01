import React from "react";
import "./MenuLogo.css";

const MenuLogo = props => {
	return (
		<div className="outer-div" onClick={props.click}>
			<div className="burgerBar"></div>
			<div className="burgerBar"></div>
			<div className="burgerBar"></div>
		</div>
	);
};

export default MenuLogo;