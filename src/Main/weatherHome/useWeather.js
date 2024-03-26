import React, { useEffect, useState } from 'react';

//그래프 헤더에 쓸 데이터
const useWeather = (data)=>{
    // 기온, 날씨
    const [weatherData, setWeatherData] = useState({
        TMP: [], // 기온
        SKY:[], // 하늘상태
        PTY:[], // 강수형태
    })

    useEffect(()=>{
        if(!data){
            return
        }

        const TMP = data.filter(item => item.category === 'TMP')
        const SKY = data.filter(item => item.category === 'SKY')
        const PTY = data.filter(item => item.category === 'PTY')

        setWeatherData(prev => ({...prev, TMP: TMP}))
        setWeatherData(prev => ({...prev, SKY: SKY}))
        setWeatherData(prev => ({...prev, PTY: PTY}))
    },[data])

    return {
        weatherData
    }
}

export default useWeather;