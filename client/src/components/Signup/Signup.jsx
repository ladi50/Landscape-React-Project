import React, { useState } from "react";
import Navbar from "../../UI/Navbar/Navbar";
import "./Signup.css";

const Signup = (props) => {
	const [ text, setText ] = useState({
		username: "",
		email: "",
		password: ""
	});

	function handleChange(e) {
		const { value, name } = e.target;

		setText(prevText => {
			return {
				...prevText,
				[ name ]: value
			};
		});
	};

	console.log("Signup text: ", text);

	return (
		<React.Fragment>
			<Navbar />
			<form id="signup-form" method="post">
				<img 
					className="logo-signup" 
					src={process.env.PUBLIC_URL + '/images/logo.png'} 
					alt="logo" 
				/>
				<h2 className="signup-title">Sign Up</h2>
				<input 
					onChange={handleChange}
					type="text" 
					name="username" 
					value={text.username}
					placeholder="Username" 
					autoFocus 
					autoComplete="off" 
				/>
				<input 
					onChange={handleChange}
					id="signup-email" 
					type="email" 
					name="email"
					value={text.email} 
					placeholder="Email" 
					autoComplete="off" 
				/>
				<input 
					onChange={handleChange}
					type="password" 
					name="password"
					value={text.password} 
					placeholder="Password" 
				/>
				<br /><br />
				<button onClick={(e) => {props.clicked(e, text)}} id="signup-button" type="submit">Sign up!</button>
			</form>
		</React.Fragment>
	);
};

export default Signup;