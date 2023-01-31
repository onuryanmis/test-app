import React, {useContext, useEffect, useState} from 'react';
import './RockPaperScissors.css';
import {GiPaper, GiRock, GiScissors} from "react-icons/gi";
import {RockPaperScissorsEnum} from "../../enum/rockPaperScissorsEnum";
import {SocketContext} from "../../context/SocketContext";
import {useParams} from "react-router-dom";

type GamePropsType = {
    choice: RockPaperScissorsEnum | null,
    setChoice: React.Dispatch<React.SetStateAction<RockPaperScissorsEnum | null>>
};

const RockPaperScissors: React.FC<GamePropsType> = ({choice, setChoice}) => {
    let {uuid} = useParams();
    const socket = useContext(SocketContext);
    const handleChoice = (choice: RockPaperScissorsEnum) => {
        socket.emit('choice', {choice, room: uuid});
        setChoice(choice);
    };

    return (
        <ul className={choice !== null ? 'choices selected' : 'choices'}>
            <li onClick={() => handleChoice(RockPaperScissorsEnum.ROCK)}
                className={choice === RockPaperScissorsEnum.ROCK ? 'selected-choice' : ''}><GiRock/></li>

            <li onClick={() => handleChoice(RockPaperScissorsEnum.PAPER)}
                className={choice === RockPaperScissorsEnum.PAPER ? 'selected-choice' : ''}><GiPaper/></li>

            <li onClick={() => handleChoice(RockPaperScissorsEnum.SCISSORS)}
                className={choice === RockPaperScissorsEnum.SCISSORS ? 'selected-choice' : ''}><GiScissors/></li>
        </ul>
    );
};

export default RockPaperScissors;