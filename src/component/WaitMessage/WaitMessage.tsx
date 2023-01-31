import React from 'react';
import Loader from "../Loader/Loader";
import './WaitMessage.css';

type WaitMessagePropsType = {
    text: string;
};

const WaitMessage: React.FC<WaitMessagePropsType> = ({text}) => {
    return (
        <p className="wait-message">
            <span>{text}</span>
            <Loader/>
        </p>
    );
};

export default WaitMessage;