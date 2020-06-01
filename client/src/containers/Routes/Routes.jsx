import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import Pictures from "../../components/Pictures/Pictures";
import Login from "../../components/Login/Login";
import Signup from "../../components/Signup/Signup";
import PictureID from "../../components/Pictures/PictureID/PictureID";
import UploadPicture from "../../components/Pictures/UploadPicture/UploadPicture";
import EditPicture from "../../components/Pictures/EditPicture/EditPicture";
import axios from "axios";

function Routes(props) {
	const [ isLoggedIn, setIsLoggedIn ] = useState(false);
	const [ uploadedPic, setUploadedPic ] = useState(false);
	const [ editedPic, setEditedPic ] = useState(false);
	const [ deletedPic, setDeletedPic ] = useState(false);

	const userId = window.sessionStorage.getItem("userId");
	const picUserId = window.sessionStorage.getItem("picUserId");

	// On Loading the Routes, checks if a user session exsists.
	useEffect(() => {
		const activeSession = window.sessionStorage.getItem("user");
		if (activeSession) {
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
		}
	}, [ setIsLoggedIn, picUserId, userId ]);

	// Sign Up
	function addUserHandler(e, text) {
		e.preventDefault();

		axios.post("http://localhost:3001/signup", {
			username: text.username,
			email: text.email,
			password: text.password
		}, { withCredentials: true })
			.then(res => {
				console.log(res.status);
				const username = res.data.data.username;
				window.sessionStorage.setItem("user", username);

				const id = res.data.data._id;
				window.sessionStorage.setItem("userId", id);

				setIsLoggedIn(true);
				window.sessionStorage.setItem("loggedIn", true);
			})
			.catch(err => console.log(err.message));
	};

	// Log In
	function loginUserHandler(e, id, text, setMessage) {
		e.preventDefault();

		axios.post("http://localhost:3001/login", {
			email: text.email,
			password: text.password 
		}, { withCredentials: true })
			.then(res => {
				if (res.data.success === true) {
					id = res.data.data._id;
					window.sessionStorage.setItem("userId", id);
					console.log(`The user with id ${id} has logged.`);

					const username = res.data.data.username;
					window.sessionStorage.setItem("user", username);

					if (res.status === 200) {
						setIsLoggedIn(true);
						window.sessionStorage.setItem("loggedIn", true);
					}
				}
				else if (res.data.success === false) {
					setMessage(prevState => {
						return {
							...prevState,
							message: res.data.data
						}
					});
				}
			})
			.catch(err => console.log(err.message));
	};

	// Log out
	function logout () {
		window.sessionStorage.removeItem("user");
		window.sessionStorage.removeItem("userId");
		window.sessionStorage.removeItem("picUserId");
		window.sessionStorage.removeItem("edited");
		window.sessionStorage.removeItem("deleted");
		window.sessionStorage.removeItem("loggedIn");
		setIsLoggedIn(false);
	};

	// Set a New Upload Session
	function setUploadSession(fileName) {
		window.sessionStorage.setItem("uploaded", fileName);
	};

	// Set Picture Uploading to True
	const setUploadState = useCallback(() => {
		setUploadedPic(true);
	}, [ setUploadedPic ]);

	// Checks if there is an uploaded session, if there is, the state changes to true.
	useEffect(() => {
		const uploadedSession = window.sessionStorage.getItem("uploaded");

		if (uploadedSession) {
			setUploadState();
		}
	}, [ setUploadState ]);

	// Set Picture Uploading to False
	function setFalse() {
		window.sessionStorage.removeItem("uploaded");
		window.sessionStorage.removeItem("edited");
		window.sessionStorage.removeItem("deleted");
		setUploadedPic(false);
		setEditedPic(false);
		setDeletedPic(false);
	};

	// Set a new edit session
	function setEditSession(fileName) {
		window.sessionStorage.setItem("edited", fileName);
		setEditedPic(true);
	};

	// Set a new delete session
	function setDeletedSession(id) {
		window.sessionStorage.setItem("deleted", id);
		setDeletedPic(true);
	};

	return (
		<Router>
        	<Switch>
        		<Route exact path="/"><HomePage onLogout={logout} isLoggedIn={isLoggedIn}/></Route>
        		<Route exact path="/pictures"><Pictures onUploading={setUploadState} setFalse={setFalse} onLogout={logout} isLoggedIn={isLoggedIn}/></Route>
        		{
        			!isLoggedIn ?
	        			<Switch>
			        		<Route path="/login">
			      				{
			      					isLoggedIn ?
			      					<Redirect to="/" /> :
			      					<Login clicked={loginUserHandler} />
			      				}
			  				</Route>
			      			<Route path="/signup">
			      				{ 
			      					isLoggedIn ? 
			      					<Redirect to="/" /> : 
			      					<Signup clicked={addUserHandler} /> 
			      				}
			  				</Route>
        					<Route exact path="/pictures/:id">
        						<PictureID onLogout={logout} isLoggedIn={isLoggedIn} />
    						</Route>
      						{/*Default Route When No Match*/}
	      					<Route><HomePage onLogout={logout} isLoggedIn={isLoggedIn}/></Route>
		  				</Switch>
	  				:
	  					<Switch>
			  				<Route exact path="/pictures/upload">
			  					{
			  						!uploadedPic ?
			  						<UploadPicture 
		  								onUploading={setUploadState} 
		  								uploadSession={setUploadSession}  
			  							setFalse={setFalse} 
		  								onLogout={logout} 
		  								isLoggedIn={isLoggedIn} 
	  								/>
			  						: <Redirect to="/pictures" />
			  					}
		  					</Route>
        					<Route exact path="/pictures/:id">
        						{
        							!deletedPic ?
        							<PictureID 
        								onLogout={logout} 
        								isLoggedIn={isLoggedIn} 
        								deleteSession={setDeletedSession} 
    								/>
    								: <Redirect to="/pictures" />
        						}
    						</Route>
    						{ 
    							userId === picUserId ?
	    							<Route exact path="/pictures/:id/edit">
	    							{
	    								!editedPic && !deletedPic ?
		      							<EditPicture 
		      								onLogout={logout} 
		      								isLoggedIn={isLoggedIn} 
		      								editSession={setEditSession}
		      								deleteSession={setDeletedSession}
	      								/>
		      							: <Redirect to="/pictures" />
	    							}
		      						</Route>
	      						: <Redirect to="/pictures" />
    						}
      						{/*Default Route When No Match*/}
      						<Route><HomePage onLogout={logout} isLoggedIn={isLoggedIn}/></Route>
		  				</Switch>
				}
      			{/*Default Route When No Match*/}
      			<Route><HomePage onLogout={logout} isLoggedIn={isLoggedIn}/></Route>
        	</Switch>
        </Router>
	);
};

export default React.memo(Routes);