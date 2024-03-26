import React, { useEffect, useState } from 'react';
import './weatherFestival.css'
import FestivalSlide from './FestivalSlide';
import useWindowScroll from '../../Function/useWindowScroll';
import useInnerWidth from '../../Function/useInnerWidth';
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

export default function WeatherFestival(props) {
    const { scroll } = useWindowScroll()
    const [moreView, setMoreView] = useState(false)
    const { innerWidth } = useInnerWidth()

    const positionHandler = () => { // 스크롤과 moreView 상태별 css 속성 관리, 한번에 움직이는 것처럼 보이게 하기 위함, sticky로 설정하면 순차적으로 스크롤됨;
        return {
            transform: moreView && innerWidth > 950 ? 'translateX(-230px)' : null,
            position: moreView && scroll < 3000 && innerWidth > 950 ? 'sticky' : 'relative',
            top: moreView && scroll < 3000 && innerWidth > 950 ? '190px' : scroll > 3000 ? '1400px' : null
        }
    }

    console.log(window.innerWidth)

    return (
        <div id="weather-festival" className='container'>
            <section className='weather-festival-section' >
                <h2 className='title' style={positionHandler()}>시즌 축제</h2>
                <div className="festival-container">
                    <div className="festival-inner">
                        <FestivalSlide slideWidth={!moreView ? 960 : 500} moreView={moreView} setMoreView={setMoreView} />
                        {!moreView ?
                            <>
                                <div className="more-view-btn">
                                    <RiArrowDownSLine className='more-view open' onClick={() => { setMoreView(true) }} />
                                </div>
                                <div className="more-text">클릭해서 축제 더보기</div>
                            </>
                            : null}
                    </div>
                    <ul className="festival-list" style={!moreView ? { display: 'none' } : null}>
                        <li className='festival'>
                            <div className="festival-title">소제목</div>
                            <div className="festival-detail">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ducimus nulla possimus accusamus similique sed asperiores repellat quasi itaque voluptas, unde et atque voluptates veniam facere quaerat debitis molestias. Rem!Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ducimus nulla possimus accusamus similique sed asperiores repellat quasi itaque voluptas, unde et atque voluptates veniam facere quaerat debitis molestias. Rem!Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ducimus nulla possimus accusamus similique sed asperiores repellat quasi itaque voluptas, unde et atque voluptates veniam facere quaerat debitis molestias. Rem!</div>
                        </li>
                        <li className='festival'>
                            <div className="festival-title">소제목</div>
                            <div className="festival-detail">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ducimus nulla possimus accusamus similique sed asperiores repellat quasi itaque voluptas, unde et atque voluptates veniam facere quaerat debitis molestias. Rem!Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ducimus nulla possimus accusamus similique sed asperiores repellat quasi itaque voluptas, unde et atque voluptates veniam facere quaerat debitis molestias. Rem!Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ducimus nulla possimus accusamus similique sed asperiores repellat quasi itaque voluptas, unde et atque voluptates veniam facere quaerat debitis molestias. Rem!</div>
                        </li>
                        <li className='festival'>
                            <div className="festival-title">소제목</div>
                            <div className="festival-detail">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ducimus nulla possimus accusamus similique sed asperiores repellat quasi itaque voluptas, unde et atque voluptates veniam facere quaerat debitis molestias. Rem!Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ducimus nulla possimus accusamus similique sed asperiores repellat quasi itaque voluptas, unde et atque voluptates veniam facere quaerat debitis molestias. Rem!Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ducimus nulla possimus accusamus similique sed asperiores repellat quasi itaque voluptas, unde et atque voluptates veniam facere quaerat debitis molestias. Rem!</div>
                        </li>
                        <li className='festival'>
                            <div className="festival-title">소제목</div>
                            <div className="festival-detail">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ducimus nulla possimus accusamus similique sed asperiores repellat quasi itaque voluptas, unde et atque voluptates veniam facere quaerat debitis molestias. Rem!Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ducimus nulla possimus accusamus similique sed asperiores repellat quasi itaque voluptas, unde et atque voluptates veniam facere quaerat debitis molestias. Rem!Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ducimus nulla possimus accusamus similique sed asperiores repellat quasi itaque voluptas, unde et atque voluptates veniam facere quaerat debitis molestias. Rem!</div>
                        </li>
                        <li className='festival'>
                            <div className="festival-title">소제목</div>
                            <div className="festival-detail">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ducimus nulla possimus accusamus similique sed asperiores repellat quasi itaque voluptas, unde et atque voluptates veniam facere quaerat debitis molestias. Rem!Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ducimus nulla possimus accusamus similique sed asperiores repellat quasi itaque voluptas, unde et atque voluptates veniam facere quaerat debitis molestias. Rem!Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ducimus nulla possimus accusamus similique sed asperiores repellat quasi itaque voluptas, unde et atque voluptates veniam facere quaerat debitis molestias. Rem!</div>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
}

