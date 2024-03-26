import React, { useEffect, useRef, useState } from 'react';
import './css/weatherGraph.css'
import useCurrentTime from './useCurrentTime';

export default function WeatherGraphHeader(props) {
    const { currentHour, currentMin, currentDate } = useCurrentTime()
    const [repeatArr, setRepeatArr] = useState([])

    useEffect(() => {
        if (props.data) {
            setRepeatArr(props.data.filter(item => item.category === 'TMP'))
        }
    }, [currentHour])

    return (
        !currentDate ? <tr className=""><th>Loading...</th></tr> :
            <tr className='weather-time weather-table-tr'>
                <td className='data'><span className='graph-header-span'>오늘</span></td>
                {repeatArr.map((a, i) => {
                    let date = Number(a.fcstDate.slice(-4))
                    let time = a.fcstTime.slice(0, 2)
                    const SKY = props.data.filter(item => item.category === 'SKY')[i].fcstValue
                    const PTY = props.data.filter(item => item.category === 'PTY')[i].fcstValue
                    
                    const imageHandler = ()=>{
                        if (SKY == 3) {
                            if (time < 6 || time > 20) {
                                return '/images/partlCloudyNight.png' // 밤 이미지
                            } else {
                                return '/images/partlCloudy.png' // 낮 이미지
                            }
                        } else if (SKY == 4) {
                            return '/images/cloudy.png'
                        } else if (PTY == 1 || PTY == 4) {
                            return '/images/rainy.png'
                        } else if (PTY == 2) {
                            return '/images/snowy-rainy.png'
                        } else if (PTY == 3) {
                            return '/images/snowy.png'
                        } else if (SKY == 1) {
                            if (time < 6 || time > 20) {
                                return '/images/icon-moon.png' // 밤 이미지
                            } else {
                                return '/images/icon-sun.png' // 낮 이미지
                            }
                        }
                    }

                    return (
                        <td className='data' key={i}>
                            {time == '00' ? <span className='detail graph-header-span'>{(date) / 100}</span>
                                : <span className='detail'
                                    // 내일 날짜의 시간 색상
                                    style={{
                                        color: date - 1 == currentDate.slice(-4) ? 'rgb(181, 139, 209)'
                                            // 모레 날짜의 시간 색상
                                            : date - 2 == currentDate.slice(-4) ? 'rgb(12 124 179)' : 'none'
                                    }}>{parseInt(time, 10)}시</span>}
                            <img className='weather-icon' src={imageHandler()}></img>
                            <span className='num'>{a.fcstValue}</span>
                        </td>
                    )
                })}
            </tr>
    );
}

