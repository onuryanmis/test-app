import React, {useContext, useEffect, useState} from 'react';
import './Room.css';
import {useNavigate, useParams} from "react-router-dom";
import Wait from "../Wait/Wait";
import Game from "../Game/Game";
import {isValidUUID} from "../../helper/uuidHelper";
import {SocketContext} from "../../context/SocketContext";

const Room: React.FC = () => {
    const socket = useContext(SocketContext);
    const [playerCount, setPlayerCount] = useState<number>(1);
    const [playerId, setPlayerId] = useState<string>("");

    let {uuid} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isValidUUID(uuid)) {
            navigate("/");
        }

        socket.emit('join room', uuid);

        socket.on('room size', (count: number) => {
            setPlayerCount(count);
        })

        socket.on('player count error', () => {
            socket.emit('leave room', uuid);
            navigate('/')
        })

        socket.on('player name', (id) => {
            setPlayerId(id);
        })
    }, []);

    return (
        <>
            {playerCount === 2 ? <Game playerId={playerId}/> : null}
            {playerCount === 1 ? <Wait/> : null}
        </>
    );
};


export default Room;