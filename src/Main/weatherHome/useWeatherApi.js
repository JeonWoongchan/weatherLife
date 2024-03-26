import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import useCurrentTime from './useCurrentTime';

const useWeatherAPI = ()=>{
    const { currentHour, currentMin, currentDate } = useCurrentTime()
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [baseTime, setBaseTime] = useState()
    const excelData = useSelector((state) => state.excelData) 
    const [regionName, setRegionName] = useState('')
    const searchRegion = useSelector(state=>state.searchRegion)

    const fetchData = async () => {
        try {
            setError(null);
            setData(null);
            setLoading(true);

            const URL = '/1360000/VilageFcstInfoService_2.0/getVilageFcst'
            const found = excelData.find(item => item.includes(regionName));

            const response = await axios.get(URL, {
                params: {
                    serviceKey: process.env.REACT_APP_WEATHER_API_KEY,
                    pageNo: '1',
                    numOfRows: '528',   
                    dataType: 'JSON',
                    base_date: currentDate,
                    base_time: `${baseTime}00`,
                    nx: found[5],
                    ny: found[6]
                }
            });
            setData(response.data.response.body.items.item);
            console.log(response.data.response.body.items.item)
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (currentHour >= 23) {
            setBaseTime(23);
        } else if (currentHour >= 20) {
            setBaseTime(20);
        } else if (currentHour >= 17) {
            setBaseTime(17);
        } else if (currentHour >= 14) {
            setBaseTime(14);
        } else if (currentHour >= 11) {
            setBaseTime(11);
        } else if (currentHour >= 8) {
            setBaseTime(8);
        } else if (currentHour >= 5) {
            setBaseTime(5);
        } else if (currentHour >= 2) {
            setBaseTime(2);
        } else if (currentHour >= 0) {
            setBaseTime(0);
        }
    }, [currentHour]);

    useEffect(()=>{
        setRegionName(localStorage.getItem('region'))
    },[searchRegion])

    useEffect(()=>{
        fetchData()
        // console.log(baseTime)
    },[baseTime, regionName])

    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error...</div>;
    // if (!data) return null;

    return {
        data, loading
    }
}

export default useWeatherAPI;