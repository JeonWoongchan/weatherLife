import React, { useEffect, useState } from 'react'; 
import useCurrentTime from './useCurrentTime';

const useShortWeather = (data)=>{
    const {currentHour, currentMin, currentDate} = useCurrentTime()
    const [weatherData, setWeatherData] = useState({
        T1H: null,
        RN1: null,
        SKY: null,
        UUU: null,
        VVV: null,
        REH: null,
        PTY: null,
        WCI: null,
        LGT: null,
        VEC: null,
        WSD: null,
    });
    const [weatherText, setWeatherText] = useState('')
    const [weatherImg, setWeatherImg] = useState('/images/icon-sun.png')

    useEffect(()=>{
        if(data){
            const T1H = data.find(item => item.category === 'T1H').fcstValue // 기온
            const RN1 = data.find(item => item.category === 'RN1').fcstValue // 1시간 강수량
            const SKY = data.find(item => item.category === 'SKY').fcstValue // 하늘상태
            const UUU = data.find(item => item.category === 'UUU').fcstValue // 풍속(동서)
            const VVV = data.find(item => item.category === 'VVV').fcstValue // 풍속(남북)
            const REH = data.find(item => item.category === 'REH').fcstValue // 습도
            const PTY = data.find(item => item.category === 'PTY').fcstValue // 강수형태    
            const LGT = data.find(item => item.category === 'LGT').fcstValue // 낙회    
            const VEC = data.find(item => item.category === 'VEC').fcstValue // 풍향
            const WSD = data.find(item => item.category === 'WSD').fcstValue // 풍속

            setWeatherData(prev => ({...prev, T1H: T1H}))
            setWeatherData(prev => ({...prev, RN1: RN1}))
            setWeatherData(prev => ({...prev, SKY: SKY}))
            setWeatherData(prev => ({...prev, UUU: UUU}))
            setWeatherData(prev => ({...prev, VVV: VVV}))
            setWeatherData(prev => ({...prev, REH: REH}))
            setWeatherData(prev => ({...prev, PTY: PTY}))   
            setWeatherData(prev => ({...prev, WCI: (13.12 + 0.6215 * T1H - 11.37 * Math.pow(WSD, 0.16) + 0.3965 * T1H * Math.pow(WSD, 0.16)).toFixed(1)}))   
            setWeatherData(prev => ({...prev, LGT: LGT}))
            setWeatherData(prev => ({...prev, VEC: VEC}))
            setWeatherData(prev => ({...prev, WSD: WSD}))

            if(PTY == 1){
                setWeatherData(prev => ({...prev, PTY: '비'}))
            }else if(PTY == 2){
                setWeatherData(prev => ({...prev, PTY: '비/눈'}))
            }else if(PTY == 3){
                setWeatherData(prev => ({...prev, PTY: '눈'}))
            }else if(PTY == 5){
                setWeatherData(prev => ({...prev, PTY: '빗방울'}))
            }else if(PTY == 6){
                setWeatherData(prev => ({...prev, PTY: '빗방울/눈날림'}))
            }else if(PTY == 7){
                setWeatherData(prev => ({...prev, PTY: '눈날림'}))
            }

            if(SKY >= 8){
                setWeatherData(prev => ({...prev, SKY: '흐림'}))
            }else if(SKY >= 4){
                setWeatherData(prev => ({...prev, SKY: '구름많음'}))
            }else{
                setWeatherData(prev => ({...prev, SKY: '맑음'}))
            }      
        }
    },[data])

    useEffect(()=>{
        if(weatherData.PTY != 0){
            setWeatherText(weatherData.PTY)
        }else{
            setWeatherText(weatherData.SKY)
        }
    },[weatherData])

    useEffect(()=>{
        if(weatherText == '구름많음'){
            if(currentHour < 6 || currentHour > 20){
                setWeatherImg('/images/partlCloudyNight.png') // 밤 이미지
            }else{
                setWeatherImg('/images/partlCloudy.png') // 낮 이미지
            }
        }else if(weatherText == '흐림'){
            setWeatherImg('/images/cloudy.png')
        }else if(weatherText == '비' || weatherText == '소나기' || weatherText == '빗방울'){
            setWeatherImg('/images/rainy.png')
        }else if(weatherText == '비/눈' || weatherText == '빗방울/눈날림'){
            setWeatherImg('/images/rainy.png')
        }else if(weatherText == '눈' || weatherText == '눈날림'){
            setWeatherImg('/images/snowy.png')
        }else if(weatherText == '맑음'){
            if(currentHour < 6 || currentHour > 20){
                setWeatherImg('/images/icon-moon.png') // 밤 이미지
            }else{
                setWeatherImg('/images/icon-sun.png') // 낮 이미지
            }
        }
    },[weatherText])

    return {
        weatherData, 
        weatherText, 
        weatherImg,
    }
}

export default useShortWeather;