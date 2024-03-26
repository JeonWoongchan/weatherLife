import React, { useEffect, useState } from 'react';
import useSlide from '../../Function/useSlide';
import './weatherFestival.css'
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import useWindowScroll from '../../Function/useWindowScroll';
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

export default function FestivalSlide(props) {
    const OriginalSlideList = {
        "list": [
            {
                "id": 0,
                "image": '/images/snowySky.jpg'
            },
            {
                "id": 1,
                "image": '/images/rainySky.jpg'
            },
            {
                "id": 2,
                "image": '/images/snowySky.jpg'
            },
            {
                "id": 3,
                "image": '/images/rainySky.jpg'
            },
            {
                "id": 4,
                "image": '/images/snowySky.jpg'
            },
            {
                "id": 5,
                "image": '/images/rainySky.jpg'
            },
        ]
    }

    const { slideList, slideStyle, slideEffect, moveSlide, slideNumHandler, setSlideEffect } = useSlide(OriginalSlideList, props.slideWidth)
    const { scroll } = useWindowScroll()
    const [autoSlideOn, setAutoSlideOn] = useState(true)

    useEffect(() => {
        if (!autoSlideOn) {
            return
        }

        if (!props.moreView) {
            return
        }

        if (scroll > 2840) {
            slideNumHandler(6)
        } else if (scroll > 2490) {
            slideNumHandler(5)
        } else if (scroll > 2140) {
            slideNumHandler(4)
        } else if (scroll > 1790) {
            slideNumHandler(3)
        } else if (scroll > 1490) {
            setSlideEffect('')
            slideNumHandler(2)
            setTimeout(() => {
                setSlideEffect('all 0.5s')
            }, 100);
        } else {
            slideNumHandler(1)
        }
    }, [scroll])

    return (
        <div className="festival-slide-container" style={{ width: `${props.slideWidth}px`, position: props.moreView ? 'sticky' : 'relative', top: props.moreView ? '300px' : null }}>
            <div className="festival-slide"
                style={{
                    transform: `translateX(${slideStyle}px)`,
                    transition: slideEffect,
                    width: slideList.length * props.slideWidth
                }}>
                {slideList.map((a, i) => {
                    return (
                        <div key={i} className="festival-content" style={{ width: `${props.slideWidth}px` }}>
                            <img className='festival-img' src={a.image} alt="" />
                        </div>
                    )
                })}
            </div>
            {props.moreView ? 
            <>
                <div className="prev" onClick={() => { moveSlide('prev') }}><GrFormPrevious className="prev-icon" /> </div>
                <div className="next" onClick={() => { moveSlide('next') }}><GrFormNext className="next-icon" /></div>
            </> : null}        
            <button className='auto-slide-btn' onClick={() => { setAutoSlideOn(!autoSlideOn) }}
                style={{ display: !props.moreView ? 'none' : null, color: autoSlideOn ? 'blue' : 'red' }}>
                {autoSlideOn ? '켜기' : '끄기'}
            </button>
            <button className='close' onClick={() => { props.setMoreView(false); window.scrollTo({ top: 1700 }); }}// 눌렀을때 더보기 false, 원래 컴포넌트 위치로 이동
                                    style={({display: !props.moreView ? 'none' : null})}>접기</button>
        </div>
    );
}

