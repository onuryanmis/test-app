import React from 'react';
import './Loader.css';

const Loader: React.FC = () => {
    return (
        <span className="bouncing-loader">
            <span></span>
            <span></span>
            <span></span>
        </span>
    );
};

export default Loader;