import React from 'react';
import './Homepage.css';
import {Link} from "react-router-dom";
import {generateUUID} from "../../helper/uuidHelper";

const Homepage: React.FC = () => {
    const uuid = generateUUID();

    return (
        <div id="homepage-wrapper">
            <img src={process.env.PUBLIC_URL + "/img/rock-paper-scissors.png"} alt=""/>
            <h1 id="homepage-title">TAŞ KAĞIT MAKAS</h1>
            <Link id="get-started-button" to={"/room/"+uuid}>Oynamaya Başlayın</Link>
        </div>
    );
};

export default Homepage;