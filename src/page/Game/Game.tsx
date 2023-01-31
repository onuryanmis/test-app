import React, {useContext, useEffect, useState} from 'react';
import './Game.css';
import {BiLoaderCircle} from "react-icons/bi";
import {AiOutlineCheck} from "react-icons/ai";
import Stars from "../../component/Stars/Stars";
import RockPaperScissors from "../../component/RockPaperScissors/RockPaperScissors";
import {SocketContext} from "../../context/SocketContext";
import {RockPaperScissorsEnum} from "../../enum/rockPaperScissorsEnum";

type GamePropsType = {
    playerId: string;
};

const Game: React.FC<GamePropsType> = ({playerId}) => {
    const [round, setRound] = useState(1);
    const [currentPlayerScore, setCurrentPlayerScore] = useState(0);
    const [opponentScore, setOpponentScore] = useState(0);
    const [opponentChoiceLoader, setOpponentChoiceLoader] = useState(false); // TODO isimlendirmeyi değiştirelim.
    const [choice, setChoice] = useState<RockPaperScissorsEnum | null>(null);
    const socket = useContext(SocketContext);

    useEffect(() => {
        socket.on('round count', (count) => {
            setRound(count);
        })

        socket.on('opponent choice', () => {
            setOpponentChoiceLoader(true);
        })

        socket.off('result').on('result', (result) => {
            console.log(playerId)
            console.log(result)
            if(playerId === result.winner){
                setCurrentPlayerScore(prevState => prevState + 1);
            }else{
                setOpponentScore(prevState => prevState + 1);
            }
            setTimeout(() => {
                setOpponentChoiceLoader(false);
                setChoice(null);
            }, 3000)
        })
    }, [])

    return (
        <div>
            <h1 id="round-title"> - Round {round} - </h1>
            <section id="game-wrapper">
                <div id="playerOne" className="player-box">
                    <h4>SİZİN SKORUNUZ</h4>
                    <div className="stars">
                        <Stars fill={currentPlayerScore}/>
                    </div>
                    <RockPaperScissors choice={choice} setChoice={setChoice}/>
                </div>
                <div id="playerTwo" className="player-box">
                    <h4>RAKİBİN SKORU</h4>
                    <div className="stars">
                        <Stars fill={opponentScore}/>
                    </div>
                    {
                        opponentChoiceLoader ?
                            <AiOutlineCheck className="player-wait-check"/> :
                            <BiLoaderCircle className="player-wait-loader"/>
                    }
                </div>
            </section>
        </div>
    );
};

export default Game;