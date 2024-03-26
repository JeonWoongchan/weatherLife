import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import './css/intro.css'
import IntroInfo from './IntroInfo';
import SearchBox from '../Function/SearchBox';
import useSearchRegion from '../Function/useSearchRegion';
import IntroLogo from './IntroLogo';

export default function Intro() {
    const navigate = useNavigate()
    const [searchValue, setSearchValue] = useState('')
    const {searchBoxOn, setSearchBoxOn, searchBoxHandler} = useSearchRegion(searchValue)    

    useEffect(()=>{ // 검색지역 초기화
        localStorage.setItem('region', '')
    },[])

    return (
        <div id='intro'>
            <div className="intro-main">
                {/* <h1 className='intro-title'>Weather Life</h1> */}
                <IntroLogo/>
                <form className='intro-form'>
                    <input type="text" placeholder='지역을 검색하세요.' className="intro-form-input"
                    value={searchValue} 
                    onChange={(e) => {setSearchValue(e.target.value); searchBoxHandler(e.target.value);}}
                    onFocus={()=>{setSearchBoxOn(true)}}
                    onBlur={()=>{
                        setTimeout(()=>{ // 0.1초 뒤에 실행하게 해서 검색박스 눌렀을때 꺼지는거 방지(근데 이게 맞는건지..)
                            setSearchBoxOn(false)
                        },300)
                    }}/>
                    <FaSearch className='intro-input-icon'/>
                </form>
                {searchBoxOn ? <SearchBox searchValue={searchValue} searchBoxOn={searchBoxOn}/> : null}
                <IntroInfo/>
            </div>
        </div>
    );
}

