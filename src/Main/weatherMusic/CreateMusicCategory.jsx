import React from 'react';

export default function CreateMusicCategory(props) {

    return (
        <li className={`category ${props.nowCategory === props.categoryNum ? 'on' : null}`} onMouseOver={() => {props.setNowCategory(props.categoryNum)}}>{props.title}</li>
    );
}

