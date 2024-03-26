import React from 'react';
import './weatherMusic.css'
import { useSelector } from 'react-redux';

export default function CreateMusicList(props) {
    
    return (
        <li className='music' onClick={()=>{props.setSelectMusic(props.data)}}>
            <div className="music-img-cover">
                <img className='music-img' src={props.data.image} alt="" />
            </div>
            <div className="details">
                <h3 className='music-title'>{props.data.title}</h3>
                <p className='music-artist'>{props.data.artist}</p>
            </div>
        </li>
    );
}

