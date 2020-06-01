import React, { useState } from "react";
import Navbar from "../../UI/Navbar/Navbar";
import "./Login.css";

const Login = (props) => {
	const [ text, setText ] = useState({
		id: "",
		email: "",
		password: "",
		message: null 
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

	console.log("Login text: ", text);

	return (
		<div>
			<Navbar />
			<form>
				<img 
					className="logo-login" 
					src={process.env.PUBLIC_URL + '/images/logo.png'} 
					alt="logo" 
				/>
				<h2 className="login-title">Log In</h2>
				{
					text.message !== null &&
					<p id="errMsg" name="message">{text.message}</p>
				}
				<input
					id="login-email" 
					onChange={handleChange}
					value={text.email} 
					name="email" 
					type="email" 
					placeholder="Email" 
					autoFocus 
					autoComplete="off" 
				/>
				<input
					onChange={handleChange} 
					value={text.password}
					name="password" 
					type="password" 
					placeholder="Password" 
				/>
				<br /><br />
				<button 
					onClick={(e) => {props.clicked(e, text.id, text, setText)}} 
					id="login-button" 
					type="submit"
				>
					Log In!
				</button>
			</form>
		</div>
	);
};

export default Login;