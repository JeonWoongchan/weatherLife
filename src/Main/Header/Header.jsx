import React, { useEffect, useRef, useState } from 'react';
import { HiMenuAlt3 } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux"
import { setSearchRegionList, setViewMenu } from "../../store/store.js"
import './header.css'
import useWindowScroll from '../../Function/useWindowScroll'
import SearchBox from '../../Function/SearchBox.jsx'
import useSearchRegion from '../../Function/useSearchRegion.js';

export default function Header(props) {
    const { scroll } = useWindowScroll() // 스크롤
    const [searchValue, setSearchValue] = useState('') // 검색창 내용
    const searchRegion = localStorage.getItem('region') // 검색한 지역
    const { searchBoxOn, setSearchBoxOn, searchBoxHandler } = useSearchRegion(searchValue)
    const [nowTab, setNowTab] = useState('main')
    console.log(scroll)
    const scrollMove = (n)=>{
        window.scrollTo({
            top: n,
            behavior: 'smooth' // 'smooth' 옵션을 추가하면 부드러운 스크롤 효과를 얻을 수 있습니다.
        });
    }

    useEffect(()=>{
        if(nowTab == 'main'){
            scrollMove(0)
        }else if(nowTab == 'life'){
            scrollMove(900)
        }else if(nowTab == 'festivl'){
            scrollMove(1700)
        }else if(nowTab == 'music'){
            scrollMove(2450)
        }
        console.log(nowTab)
    },[nowTab])

    return (
        <header className='header' style={{ backgroundColor: scroll < 50 ? 'transparent' : null }}>
            <div className="header-inner">  
                <a href="/main" className='header-title'>Weather Life</a>
                <ul className='header-tab'>
                    <li><a className='menu' onClick={()=>{setNowTab('main')}}>Main</a></li>
                    <li><a className='menu' onClick={()=>{setNowTab('life')}}>Life</a></li>
                    <li><a className='menu' onClick={()=>{setNowTab('festivl')}}>Festival</a></li>
                    <li><a className='menu' onClick={()=>{setNowTab('music')}}>Music</a></li>
                </ul>
                <div className="header-menu">
                    <div className="header-menu-search-area">
                        <form className='header-search-form'>
                            <input type="text" className='header-search-input' placeholder='지역을 검색하세요' value={searchValue}
                                onChange={(e) => { setSearchValue(e.target.value); searchBoxHandler(e.target.value); }}
                                onFocus={() => { setSearchBoxOn(true) }}
                                onBlur={() => {
                                    setTimeout(() => { // 0.1초 뒤에 실행하게 해서 검색박스 눌렀을때 꺼지는거 방지(근데 이게 맞는건지..)
                                        setSearchBoxOn(false)
                                    }, 300)
                                }} />
                            <CiSearch className='search-icon' />
                        </form>
                        {searchBoxOn ? <SearchBox searchValue={searchValue} /> : null}
                    </div>
                </div>
            </div>
        </header>
    );
}

