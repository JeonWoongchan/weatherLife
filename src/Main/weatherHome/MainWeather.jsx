import React, { useEffect, useState } from 'react';
import './css/mainWeather.css'
import useShortWeather from './useShortWeather';
import useShortWeatherAPI from './useShortWeatherApi';
import WeatherAirLevel from './WeatherAirLevel'
import useCurrentTime from './useCurrentTime';
import SnowAnimation from '../WeatherAnimation/SnowAnimation';
import RainAnimation from '../WeatherAnimation/RainAnimation';

export default function MainWeather() {
    const {currentHour} = useCurrentTime()
    const { shortData, ShortLoding } = useShortWeatherAPI()
    const { weatherData, weatherText, weatherImg} = useShortWeather(shortData);
    const searchRegion = localStorage.getItem('region')
    const [pageBackground, setPageBackground] = useState('')
    const [animationOn, setAnimationOn] = useState(false)

    useEffect(()=>{
        if(!weatherText){
            return
        }
        if(weatherText == '맑음'){
            if(currentHour < 6 && currentHour > 20){
                setPageBackground('clearSkyNight')
            }else{
                setPageBackground('clearSky')
            }
        }else if(weatherText == '구름많음'){
            if(currentHour < 6 && currentHour > 20){
                setPageBackground('partiCloudySkyNight')
            }else{
                setPageBackground('partiCloudySky')
            }
        }else if(weatherText == '흐림'){
            if(currentHour < 6 && currentHour > 20){
                setPageBackground('CloudySkyNight')
            }else{
                setPageBackground('CloudySky')
            }
        }else if(weatherText == '비' || weatherText == '소나기' || weatherText == '빗방울'){
            setPageBackground('rainySky')
        }else if(weatherText == '비/눈' || weatherText == '빗방울/눈날림'){
            setPageBackground('rainySky')
        }else if(weatherText == '눈' || weatherText == '눈날림'){
            setPageBackground('snowySky')
        }

    },[weatherText])

    useEffect(()=>{
        if(pageBackground !== ''){
            setTimeout(()=>{
                setAnimationOn(true)
            },3000)
        }
    },[pageBackground])

    const aniStyle = ()=>{
        return{
            display : !animationOn ? 'none' : 'block'
        }
    }

    return (
        ShortLoding ? <div>loading...</div> :
        <div className='main-weather-container'
            style={{background: `linear-gradient(to bottom, rgba(169, 169, 169, 0) 0%, 
            rgba(255, 255, 255, 0.7) 90%, 
            rgb(255, 255, 255) 100%), 
            url('/images/${pageBackground}.jpg') center/cover`}}>
            <section className="main-weather" >
                <div className="main-weather-inner">
                    <h1 className='local-name'>{searchRegion}</h1>
                    <div className="weather-title">
                        <img className='weather-title-image' src={weatherImg} />
                        <div className="weather">
                            <h1 className='temperature'>{weatherData.T1H}°</h1>
                            <h3 className='weather-info'>{weatherText}</h3>
                        </div>
                        <div className="weather-detail">
                            <div className="detail-inner">
                                <div className="weather-data">
                                    {weatherData.RN1 !== '강수없음' ?
                                        <p className='data'>강수 <span className='data-span'>{weatherData.RN1}</span></p> : null}
                                    <p className='data'>습도 <span className='data-span'>{weatherData.REH}%</span></p>
                                    <p className='data'>체감 <span className='data-span'>{weatherData.WCI}°</span></p>
                                    <p className='data'>바람 <span className='data-span'>{weatherData.WSD}m/s</span></p>
                                </div>
                                <div className="sun-data">
                                    <p className='data'>
                                        <img className='sun-data-img' src="/images/sun-rise.png" alt="" />일출
                                        <span className='data-span' style={{ color: '#2a74f8' }}> 6:00</span>
                                    </p>
                                    <p className='data'>
                                        <img className='sun-data-img' src="/images/sun-set.png" alt="" />일몰
                                        <span className='data-span' style={{ color: '#2a74f8' }}> 18:00</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <WeatherAirLevel/>
                </div>
            </section>
            {
                pageBackground === 'rainySky' ? <RainAnimation aniStyle={aniStyle}/>
                : pageBackground === 'snowySky' ? <SnowAnimation aniStyle={aniStyle}/> : null
            }
        </div>
    );
}



