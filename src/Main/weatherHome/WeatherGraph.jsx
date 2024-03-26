import React, { useEffect, useRef, useState } from 'react';
import { FcNext, FcPrevious } from "react-icons/fc";
import './css/weatherGraph.css'
import CreateGraph from './CreateGraph'
import WeatherGraphHeader from './WeatherGraphHeader';
import WeatherGraphRainProb from './WeatherGraphRainProb';
import WeatherGraphRainAmt from './WeatherGraphRainAmt';
import WeatherGraphWind from './WeatherGraphWind';
import useMainSlide from '../../Function/useMainSlide'
import { useSelector } from 'react-redux';

export default function WeatherGraph(props) {
    const { startDragging,
        handleDragging,
        stopDragging,
        moveSlide,
        transformStyle,
        prevBtnDP,
        nextBtnDP } = useMainSlide(960, 2)

    return (
        <div id='weather-graph' >
            <section className='weather-graph-section'>
                <div className="slide-container">
                    <table className='slide-inner' style={{ transform: `translateX(${transformStyle}px)` }}
                        onMouseDown={startDragging}
                        onTouchStart={startDragging}
                        onMouseMove={handleDragging}
                        onTouchMove={handleDragging}
                        onMouseUp={stopDragging}
                        onTouchEnd={stopDragging}>
                        <thead>
                            <WeatherGraphHeader data={props.data} />
                        </thead>
                        <tbody>
                            <CreateGraph data={props.data} />
                            <WeatherGraphRainProb data={props.data} />
                            <WeatherGraphRainAmt data={props.data} />
                            <WeatherGraphWind data={props.data} />
                        </tbody>
                    </table>
                    <div className="graph-btn" style={{ display: prevBtnDP }}><span className="prev" onClick={() => { moveSlide('prev') }}><FcPrevious /></span></div>
                    <div className="graph-btn" style={{ display: nextBtnDP }}><span className="next" onClick={() => { moveSlide('next') }}><FcNext /></span></div>
                </div>
            </section>
        </div>
    );
}
