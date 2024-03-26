import React, { useState, useEffect } from 'react';

// 현재시간에 기반하여 api를 가져올 수 있는 시간으로 반환 
const useCurrentTime = () => {
    const [currentHour, setCurrentHour] = useState();
    const [currentDate, setCurrentDate] = useState();
    const [currentMin, setCurrentMin] = useState();

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const year = now.getFullYear().toString();
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const day = now.getDate().toString().padStart(2, '0');

            setCurrentDate(year + month + day);
            setCurrentHour(hours)
            setCurrentMin(minutes)

        }, 1000);

        // 컴포넌트가 언마운트될 때 clearInterval을 호출하여 메모리 누수 방지
        return () => clearInterval(intervalId);
    }, []);

    useEffect(()=>{
        // console.log(currentDate,currentHour,currentMin)
    },[currentDate,currentHour,currentMin])

    return { 
        currentHour, 
        currentMin,
        currentDate
    };
};

export default useCurrentTime;