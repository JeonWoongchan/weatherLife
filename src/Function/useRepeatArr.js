import React, { useEffect, useRef, useState } from 'react';

const useRepeatArr = (data, key, value)=>{
    const [repeatArr, setRepeatArr] = useState([])

    useEffect(() => {
        if (data) {
            setRepeatArr(data.filter(item => item.key === value))
        }
    }, [data])

    return {
        repeatArr
    }
}

export default useRepeatArr