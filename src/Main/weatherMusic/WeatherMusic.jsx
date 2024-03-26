import React, { useState, useEffect } from 'react';
import './weatherMusic.css'
import weatherMusicList from './weatherMusicList.json'
import weatherMusicCategoryList from './weatherMusicCategoryList.json'
import CreateMusicCategory from './CreateMusicCategory';
import CreateMusicList from './CreateMusicList';
import { useSelector } from 'react-redux';

const WeatherMusic = React.forwardRef((props, ref) => {
    const [nowCategory, setNowCategory] = useState(0)
    const [musicList, setMusicList] = useState([])
    const [selectMusic, setSelectMusic] = useState({})

    useEffect(() => {
        if (!weatherMusicList) {
            return
        }

        if (nowCategory === 0) {
            setMusicList(weatherMusicList.music.spring)
            setSelectMusic(weatherMusicList.music.spring[0])
        } else if (nowCategory === 1) {
            setMusicList(weatherMusicList.music.summer)
            setSelectMusic(weatherMusicList.music.summer[0])
        } else if (nowCategory === 2) {
            setMusicList(weatherMusicList.music.fall)
            setSelectMusic(weatherMusicList.music.fall[0])
        } else if (nowCategory === 3) {
            setMusicList(weatherMusicList.music.winter)
            setSelectMusic(weatherMusicList.music.winter[0])
        } else if (nowCategory === 4) {
            setMusicList(weatherMusicList.music.rainy)
            setSelectMusic(weatherMusicList.music.rainy[0])
        } else if (nowCategory === 5) {
            setMusicList(weatherMusicList.music.snowy)
            setSelectMusic(weatherMusicList.music.snowy[0])
        }
    }, [nowCategory])

    return (
        !weatherMusicList ? <div className=""></div> :
            <div id='weather-music' className='container'>
                <section className='weather-music-section' ref={ref}>
                    <h2 className='title'>Weather Life 추천 음악</h2>
                    <ul className="music-category">
                        {
                            weatherMusicCategoryList.category.map((a, i) => {
                                return (
                                    <CreateMusicCategory key={i} nowCategory={nowCategory} setNowCategory={setNowCategory} categoryNum={i} title={a} />
                                )
                            })
                        }
                    </ul>
                    <div className="music-container">
                        <div className="music-container-inner">
                            <div className="main-music">
                                <img className='main-music-img' src="/images/clearSky.jpg" alt="" />
                                <div className='music-top'>
                                    <p className='music-title'>{selectMusic.title}</p>
                                    <p className='music-artist'>{selectMusic.artist}</p>
                                </div>
                                <p className='music-detail'>{selectMusic.detail}</p>    
                            </div>
                            <ul className="music-list">
                                {
                                    musicList.map((a, i) => {
                                        return (
                                            <CreateMusicList key={i} data={a} setSelectMusic={setSelectMusic} />
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
    );
})

export default WeatherMusic

