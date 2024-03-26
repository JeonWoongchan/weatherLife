import React, { useState, useEffect } from 'react';
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

import './css/introInfo.css'
import OriginalSlideList from './json/slideList.json'
import useWindowWidth from '../Function/useWindowWidth';
import useSlide from '../Function/useSlide';


export default function IntroInfo() {
    const windowWidth = useWindowWidth() // 화면 가로 길이
    const [slideWidth, setSlideWidth] = useState(0);
    const {slideList, slideStyle, slideEffect, moveSlide} = useSlide(OriginalSlideList, slideWidth)
    
    useEffect(()=>{ // 화면 크기에 따라 슬라이드 크기 지정
        setSlideWidth(windowWidth > 800 ? 670 : 470)
    },[windowWidth])

    return (
        <div className='intro-info'>
            <div className="info-slide-container">
                <div className="info-slide" style={{ transform: `translateX(${slideStyle}px)`, transition: slideEffect, width: slideList.length * slideWidth }}>
                    {slideList.map((a, i) => {
                        return (
                            <div key={i} className="info-content">{i}</div>
                        )
                    })}
                </div>
                <div className="prev" onClick={() => { moveSlide('prev') }}><GrFormPrevious className="prev-icon"/> </div>
                <div className="next" onClick={() => { moveSlide('next') }}><GrFormNext className="next-icon"/></div>
            </div>
        </div>
    );
}

