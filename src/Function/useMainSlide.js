import React, { useEffect, useRef, useState } from 'react';

const useMainSlide = (oneSldieWidth, maxSlideNum)=>{
    const [transformStyle, setTransformStyle] = useState(0);
    const [slideWidth, setSlideWidth] = useState(oneSldieWidth);
    const [slideNum, setSlideNum] = useState(0)
    const [prevBtnDP, setPrevBtnDP] = useState('block')
    const [nextBtnDP, setNextBtnDP] = useState('block')

    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [currentX, setCurrentX] = useState(0);
    const [lastX, setLastX] = useState(0);
    const [endX, setEndX] = useState(0)

    const startDragging = (e) => {
        setIsDragging(true);
        setCurrentX(getClientX(e));
        setStartX(getClientX(e));
    };

    const handleDragging = (e) => {
        if (!isDragging) return;

        setLastX(getClientX(e) - currentX)
        setCurrentX(getClientX(e));
        setTransformStyle(prev=>prev+lastX)
    };

    const stopDragging = (e) => {
        setEndX(getClientX(e))
        setIsDragging(false);
    };

    useEffect(()=>{
        if(startX-endX > 50 && slideNum !== maxSlideNum){
            setSlideNum(prev => prev + 1)
        }else if (startX-endX < -50 && slideNum !== 0) {
            setSlideNum(prev => prev - 1)
        }else{
            setTransformStyle(-slideWidth * slideNum);
        }
    },[endX])

    const getClientX = (e) => {
        return e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
    };

    const moveSlide = (btn) => {
        if (btn === 'next' && slideNum !== maxSlideNum) {
            setSlideNum(prev => prev + 1)
        }else if (btn === 'prev' && slideNum !== 0) {
            setSlideNum(prev => prev - 1)
        }
    }

    useEffect(() => {
        if (slideNum == 0) {
            setPrevBtnDP('none')
            setTransformStyle(0)
        }else if(slideNum == 1){
            setPrevBtnDP('block')
            setNextBtnDP('block')
            setTransformStyle(-slideWidth)
        }else if(slideNum == maxSlideNum) {
            setNextBtnDP('none')
            setTransformStyle(-slideWidth*maxSlideNum)
        }
    }, [slideNum])

    return{
        startDragging,
        handleDragging,
        stopDragging,
        moveSlide,
        transformStyle,
        prevBtnDP,
        nextBtnDP,
    }
}

    export default useMainSlide