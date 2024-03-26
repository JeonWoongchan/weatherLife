import { useState, useEffect } from 'react';

// 슬라이드 목록, 슬라이드 크기에 따라 슬라이드 기능 구현
const useSlide = (originalSlideList, slideWidth) => {
    const [slideList, setSlideList] = useState([]) // 복제된 슬라이드 리스트
    const [slideNum, setSlideNum] = useState(1) // 현재 슬라이드 번호
    const [slideStyle, setSlideStyle] = useState(0) // 슬라이드 transform
    const [slideEffect, setSlideEffect] = useState('all 0.5s'); // 슬라이드 transition
    const [nowMoving, setNowMoving] = useState(false) // 슬라이드가 움직이는 중일때 true
    
    const slideNumHandler = (num)=>{ // 슬라이드 번호를 설정하여 슬라이드 이동시키는 함수
        setSlideNum(num)
        setSlideStyle(-slideWidth * num)
    }
    
    useEffect(()=>{ // 무한슬라이드 구현을 위해 첫번째, 마지막 슬라이드를 복제
        setSlideEffect(''); // 복제한 슬라이드로 바뀔때 티안나게 애니메이션 끔
        setSlideList([originalSlideList.list[originalSlideList.list.length-1], ...originalSlideList.list, originalSlideList.list[0]])
        setTimeout(() => {
            setSlideEffect('all 0.5s')
        }, 100);
    },[])

    useEffect(()=>{ // 지정된 슬라이드 크기에 따라 보여줄 슬라이드 위치 지정
        setSlideStyle(-slideWidth)
    },[slideWidth])

    useEffect(()=>{ // 무한슬라이드 구현을 위해 마지막 슬라이드 일때 같은 내용의 슬라이드로 위치바꿈
        const timer = setTimeout(()=>{
            if(slideNum === 0){ // 마지막에서 두번째 칸이면 박스 개수만큼 왼쪽으로 이동
                setSlideEffect(''); // 애니메이션 꺼야지 티 안남
                setSlideStyle(-(slideList.length-2)*slideWidth)
                setSlideNum(slideList.length-2)

                setTimeout(() => {
                    setSlideEffect('all 0.5s')
                }, 100);
            }else if(slideNum === slideList.length-1){
                setSlideEffect(''); // 애니메이션 꺼야지 티 안남
                setSlideStyle(-slideWidth)
                setSlideNum(1)

                setTimeout(() => {
                    setSlideEffect('all 0.5s')
                }, 100);
            }
        }, 500) // 슬라이드 애니메이션 끝나고
        return () => {
            clearInterval(timer);
        };
        
    },[slideNum])

    const moveSlide = (a) => { // 슬라이드 움직이기
        if (a == 'prev' && !nowMoving) {
            setSlideNum(prev => prev - 1)
            setSlideStyle(prev=>prev+slideWidth)
            //화살표 무한클릭 방지
            setNowMoving(true)
            setTimeout(() => {
                setNowMoving(false)
            }, 600);
        }else if (a == 'next' && !nowMoving) {
            setSlideNum(prev => prev + 1)
            setSlideStyle(prev=>prev-slideWidth)
            //화살표 무한클릭 방지
            setNowMoving(true)
            setTimeout(() => {
                setNowMoving(false)
            }, 600);
        }
        console.log(slideNum)
    }

    return {
        slideList,
        slideStyle,
        slideEffect,
        slideNumHandler,
        moveSlide,
        setSlideEffect
    }
};

export default useSlide;