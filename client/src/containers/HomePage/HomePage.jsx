import React from "react";
import Navbar from "../../UI/Navbar/Navbar";
import HomeImages from "../../components/HomeImages/HomeImages";

const HomePage = (props) => (
	<React.Fragment>
		<Navbar onLogout={props.onLogout} isLoggedIn={props.isLoggedIn}/>
        <h1 className="home-title" style={{zIndex: 1000}}>Share and Explore Extraordinary Views!</h1>
        <HomeImages />
    </React.Fragment>
);

export default HomePage;