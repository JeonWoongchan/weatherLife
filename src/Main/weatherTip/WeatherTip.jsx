import React, { useEffect, useState } from 'react';
import './weatherTip.css'
import tipList from './tipList.json'

export default function WeatherTip(props) {

    const [detailView, setDetailView] = useState('')

    const detailViewHandler = (i) => {
        if (i === detailView) {
            setDetailView('')
        } else {
            setDetailView(i)
        }

    }

    const detailViewStyle = (i) => {
        if (i === detailView) {
            return {
                width: '1250px',
                height: '550px',
                transition: 'width 0.5s ease'
            }
        } else if (detailView !== '') { // 다른 tip을 자세히 보고 있을 때 다른 tip 안보이게
            return {
                display: 'none'
            }
        }
    }

    return (
        <div id='weather-tip' className='container'>
            <section className='weather-tip-section' >
                <div className="title">Weather Life Tip</div>
                {
                    detailView === '' ? <h5>클릭해서 자세히 보기</h5> : <h5>다시 클릭해서 원래 화면 보기</h5>
                }
                <ul className='tip-list'>
                    {tipList.tip.map((a, i) => {
                        return (
                            <li className={`tip ${detailView === '' ? 'mini' : null}`} key={a.id} onClick={() => { detailViewHandler(i) }} style={detailViewStyle(i)}>
                                <div className="images">
                                    <img className='tip-image' src={a.image[0]} />
                                    {detailView === i ?
                                        <>
                                            <img className='tip-image' src={a.image[1]} />
                                            <img className='tip-image' src={a.image[2]} />
                                        </> 
                                    : null}
                                </div>
                                <div className='tip-inner'>
                                    <h3 className='tip-title'>{a.title}</h3>
                                    {detailView === i ? <h3 className='tip-detail'>{a.detail}</h3> : null}
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </section>
        </div>
    );
}



