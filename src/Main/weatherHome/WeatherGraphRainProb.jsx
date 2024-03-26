import React, { useEffect, useRef, useState } from 'react';
import './css/weatherGraph.css'
import useCurrentTime from './useCurrentTime';

export default function WeatherGraphRainProb(props) {
    const { currentHour, currentMin, currentDate } = useCurrentTime()
    const [repeatArr, setRepeatArr] = useState([])

    useEffect(() => {
        if (props.data) {
            setRepeatArr(props.data.filter(item => item.category === 'POP'))
        }
    }, [currentHour])
    
    return (
        !currentDate ? <tr className=""><th>Loading...</th></tr> :
        <tr className='rain-prob weather-table-tr'>
            <th className='graph-header'><span className='graph-header-span weather-title'>강수확률</span><span className='unit'>(%)</span></th>
                {repeatArr.map((a,i)=>{
                    return(
                        <td className='data' key={i}>
                            <span className='detail'>{a.fcstValue}</span>
                        </td>
                    )
                })}
            </tr>
    );
}

