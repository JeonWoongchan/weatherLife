import React, { useEffect, useState } from 'react';
import './css/searchBox.css'
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { setSearchRegion, setSearchHistory } from '../store/store';
import { useNavigate } from 'react-router-dom';

export default function SearchBoxItem(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const searchHistory = useSelector(state=>state.searchHistory)
    
    useEffect(()=>{
        const storedHistory = localStorage.getItem('history')
        if(storedHistory){
            dispatch(setSearchHistory(JSON.parse(storedHistory)));
        }else{
            localStorage.setItem('history', JSON.stringify([]))
        }
    },[])

    const searchRegionHandler = (value)=>{
        // 페이지 렌더링을 위해 state값에 저장 -> 렌더링되어 새로운 지역의 정보 로딩
        dispatch(setSearchRegion(value)); 
        localStorage.setItem('region', value)
        navigate('/main')

        const valueIndex = searchHistory.indexOf(value)
        const newHistory = [...searchHistory]

        if(valueIndex >= 0){ // 검색기록에 이미 있을 경우 기존 기록 삭제
            newHistory.splice(valueIndex, 1)
        }

        if(newHistory.length >=5 ){ // 검색기록 5개까지만 저장하도록 설정
            newHistory.splice(0, 1)
        }
        
        newHistory.push(value)
        localStorage.setItem('history', JSON.stringify(newHistory.reverse()));
    }

    return (
        <div className="searchBox-item" 
            onClick={()=>{searchRegionHandler(props.data)}}>
            <div className='searchBox-item-title'>
                <CiSearch className='searchBox-item-searchIcon' />
                <p className="searchBox-item-name">{props.data}</p>
            </div>
        </div>
    )
}

