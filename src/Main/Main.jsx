import React, { useRef, useEffect, useState } from 'react';
import './css/main.css'
import Header from './Header/Header';
import MainWeather from './weatherHome/MainWeather';
import WeatherGraph from './weatherHome/WeatherGraph';
import useWeatherAPI from './weatherHome/useWeatherApi';
import ExcelReader from '../Function/ExcelReader';
import useWeather from './weatherHome/useWeather';
import WeatherTip from './weatherTip/WeatherTip';
import WeatherFestival from './weatherFestival/WeatherFestival';
import WeatherMusic from './weatherMusic/WeatherMusic';
import Footer from './Footer/Footer';

export default function Main() {
    const {data, loading} = useWeatherAPI()
    const {weatherData} = useWeather(data)
    ExcelReader()
    
    return (
        loading ? <div>Loading...</div> :
        <div id='main'>
            <Header/>
            <MainWeather />
            <WeatherGraph data={data}/>
            <WeatherTip />
            <WeatherFestival />
            <WeatherMusic />
            <Footer/>
        </div>
    );
}

