import React, { useEffect, useState } from 'react';
import './css/introLogo.css'

export default function IntroLogo() {
    const TitleText = 'WEATHER LIFE'
    const [logoWord, setLogoWord] = useState('')
    const [index, setIndex] = useState(0)

    console.log(TitleText.slice(0, 3))

    useEffect(() => { // 텍스트 타이핑 효과 구현
        const typing = setInterval(() => {
            if(logoWord.length === TitleText.length){
                setTimeout(()=>{
                    setLogoWord('')
                    setIndex(0)
                }, 1000)
            }else{
                setLogoWord((prev)=>prev += TitleText[index])
                setIndex((prev)=>prev+1)
            }
        },300);

        return () => {
            clearInterval(typing);
        };
    })

    return (
        <div className='intro-logo'>
            {logoWord}
            <div className="cursor">|</div>
        </div>
    );
}

