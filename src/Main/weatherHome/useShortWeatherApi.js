import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useCurrentTime from './useCurrentTime';
import { useSelector } from 'react-redux';

const useShortWeatherAPI = ()=>{
    const {currentHour, currentMin, currentDate} = useCurrentTime()
    const [shortData, setShortData] = useState(null);
    const [shortLoding, setShortLoding] = useState(false);
    const [error, setError] = useState(null);
    const [baseTime, setBaseTime] = useState('')
    const excelData = useSelector((state) => state.excelData) 
    const [regionName, setRegionName] = useState('')
    const searchRegion = useSelector(state=>state.searchRegion)

    const fetchData = async () => {
        try {
            setError(null);
            setShortData(null);
            setShortLoding(true);

            const URL = '/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst'
            const found = excelData.find(item => item.includes(regionName));

            const response = await axios.get(URL, {
                params: {
                    serviceKey: process.env.REACT_APP_WEATHER_API_KEY,
                    numOfRows: '591', 
                    pageNo: '1',
                    dataType: 'JSON',
                    base_date: currentDate,
                    base_time: baseTime,
                    nx: found[5],
                    ny: found[6]
                }
            });
            setShortData(response.data.response.body.items.item);
        } catch (e) {
            setError(e);
        }
        setShortLoding(false);
    };

    useEffect(() => {
        if (currentMin > 30) {
            setBaseTime((currentHour)+'30')
        }else{
            setBaseTime((currentHour-1)+'30')
        }
    }, [currentHour, currentMin]);

    useEffect(()=>{ // 새로고침 시 state값 초기화 되므로 localstorage에서 값 가져와서 지역의 정보 받아옴
        setRegionName(localStorage.getItem('region'))
    },[searchRegion])

    useEffect(()=>{
        fetchData()
    },[baseTime, regionName])

    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error...</div>;
    // if (!data) return null;

    return {
        shortData, shortLoding
    }
}

export default useShortWeatherAPI;