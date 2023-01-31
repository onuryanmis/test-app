import React, {ReactNode} from 'react';
import './Stars.css';
import {AiFillStar, AiOutlineStar} from "react-icons/ai";

type StarsPropsType = {
    fill: number;
};

const Stars: React.FC<StarsPropsType> = ({fill}) => {
    return <>{generateStars(fill)}</>;
};

const generateStars = (fill: number) => {
    let stars: ReactNode[] = [<AiOutlineStar/>, <AiOutlineStar/>, <AiOutlineStar/>,];
    stars.fill(<AiFillStar/>, 0, fill)

    return stars.map((item, key) =>
        <span key={key}>{item}</span>
    );
};

export default Stars;