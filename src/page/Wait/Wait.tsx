import React from 'react';
import './Wait.css';
import WaitMessage from "../../component/WaitMessage/WaitMessage";
import CopyUrl from "../../component/CopyUrl/CopyUrl";
import {useParams} from "react-router-dom";

const Room: React.FC = () => {
    let {uuid} = useParams();

    return (
        <div id="wait-page-wrapper">
            <CopyUrl url={"http://localhost:3000/room/" + uuid}/>
            <WaitMessage text="Rakibin bağlanması bekleniyor"/>
        </div>
    );
};

export default Room;