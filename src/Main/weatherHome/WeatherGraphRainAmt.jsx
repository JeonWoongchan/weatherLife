import React, { useEffect, useRef, useState } from 'react';
import './css/weatherGraph.css'
import useCurrentTime from './useCurrentTime';

export default function WeatherGraphRainAmt(props) {
    const { currentHour, currentMin, currentDate } = useCurrentTime()
    const [repeatArr, setRepeatArr] = useState([])

    useEffect(() => {
        if (props.data) {
            setRepeatArr(props.data.filter(item => item.category === 'PCP'))
        }
    }, [currentHour])

    return (
        !currentDate ? <tr className=""><th>Loading...</th></tr> :
            <tr className='rain-amt weather-table-tr'>
                <th className='graph-header'><span className='graph-header-span weather-title'>강수량</span><span className='unit'>(mm)</span></th>
                {repeatArr.map((a, i) => {
                    return (
                        <td className='data' key={i}>
                            <span className='detail'>{a.fcstValue == '강수없음' ? 0 : a.fcstValue[0]}</span>
                        </td>
                    )
                })}
            </tr>
    );
}

