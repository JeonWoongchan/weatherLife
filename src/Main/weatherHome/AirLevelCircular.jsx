import React from 'react';
import './css/mainWeather.css'

export default function AirLevelCircular() {
    return (
        <strong className='air-info-circular'>
            <span className='air-level-graph'>
                <span className='level'>37</span>
                <small className='unit'>㎍/m³</small>
            </span>
        </strong>
    );
}

