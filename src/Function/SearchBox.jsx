import React, { useEffect, useRef, useState } from 'react';
import './css/searchBox.css'
import { useDispatch, useSelector } from 'react-redux';
import SearchBoxItem from './SearchBoxItem';

export default function SearchBox(props) {
    const searchRegionList = useSelector(state=>state.searchRegionList)
    const regionList = useSelector(state=>state.regionList)
    const searchHistory = useSelector(state=>state.searchHistory)
    const searchBoxList = props.searchValue == '' ? searchHistory : searchRegionList // 검색창 입력값 없으면 검색 기록 보여줌
    console.log(searchHistory)

    return (
        <div id='searchBox'>
            {!regionList ? <div>Loading...</div> :
                <div className="searchBox-container">
                    {
                        searchHistory.length === 0 &&  props.searchValue == '' ? <p className='no-history'>최근 검색기록 없음</p> : null
                    }
                    {
                        searchBoxList.map((a, i) => {
                            return (
                                <SearchBoxItem data={a} key={i}/>
                            )
                        })
                    }
                </div>
            }
        </div>
    );
}
