import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './css/mainWeather.css'
import AirLevelCircular from './AirLevelCircular';

export default function WeatherAirLevel() {
    const [airData, setAirData] = useState({
        data: [75, 36, 12],
        text: ['나쁨', '보통', '좋음']        
    })

    const CircularColor = (text)=>{
        return(
            text == '매우나쁨' ? 'rgb(201, 69, 45)':
            text == '나쁨' ? 'rgb(255, 66, 41)' :
            text == '보통' ? 'rgb(129, 193, 131)' :
            text == '좋음' ? 'rgb(88, 159, 229)' : null
        )
    }

    return (
        <div className='air-info'>
            <ul className='air-info-inner'>
                <li>
                    <span className='air-info-data'>
                        <CircularProgressbar
                            className='circular'
                            strokeWidth={10}
                            value={airData.data[0]}
                            styles={buildStyles({
                                // Colors
                                pathColor: CircularColor(airData.text[0]),
                                trailColor: '#d6d6d6',
                                backgroundColor: '#3e98c7',
                            })}
                        />
                        <span className='data-text'>
                            <span className='level'>{airData.data[0]}</span>
                            <small className='unit'>㎍/m³</small>
                        </span>
                    </span>
                    <p className='air-info-title'>초미세먼지</p>
                    <p className='air-info-level' style={{color:CircularColor(airData.text[0])}}>나쁨</p>
                </li>
                <li>
                    <span className='air-info-data'>
                        <CircularProgressbar
                            className='circular'
                            strokeWidth={10}
                            value={51}
                            styles={buildStyles({
                                // Colors
                                pathColor: CircularColor(airData.text[1]),
                                trailColor: '#d6d6d6',
                                backgroundColor: '#3e98c7',
                            })}
                        />
                        <span className='data-text'>
                            <span className='level'>{airData.data[1]}</span>
                            <small className='unit'>㎍/m³</small>
                        </span>
                    </span>
                    <p className='air-info-title'>미세먼지</p>
                    <p className='air-info-level' style={{color:CircularColor(airData.text[1])}}>보통</p>
                </li>
                <li>
                    <span className='air-info-data'>
                        <CircularProgressbar
                            className='circular'
                            strokeWidth={10}
                            value={16}
                            styles={buildStyles({
                                // Colors
                                pathColor: CircularColor(airData.text[2]),
                                trailColor: '#d6d6d6',
                                backgroundColor: '#3e98c7',
                            })}
                        />
                        <span className='data-text'>
                            <span className='level'>{airData.data[2]}</span>
                            <small className='unit'>ppm</small>
                        </span>
                    </span>
                    <p className='air-info-title'>오존</p>
                    <p className='air-info-level' style={{color:CircularColor(airData.text[2])}}>좋음</p>
                </li>
            </ul>
        </div>
    );
}

