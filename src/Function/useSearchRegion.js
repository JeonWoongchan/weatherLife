import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { setSearchRegionList } from "../store/store.js"
import regionList from '../store/json/regionList.json'

// 지역 검색 기능 : 검색어 가져와서 지역리스트에서 검색
// 검색어 입력시 searchBox on/off
const useSearchRegion = ()=>{
    const [searchBoxOn, setSearchBoxOn] = useState(false) // 검색창 박스 on/off
    const regionList = useSelector(state=>state.regionList) // 전체 지역 리스트
    const dispatch = useDispatch()

    const searchBoxHandler = (value)=>{
        if(value.length != 0){
            dispatch(setSearchRegionList(regionList.filter(city => city.includes(value))))
        }
    }

    return {
        searchBoxOn,
        setSearchBoxOn,
        searchBoxHandler,
    }
}

export default useSearchRegion