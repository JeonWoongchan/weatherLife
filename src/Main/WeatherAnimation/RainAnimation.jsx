import React, { useState, useEffect } from 'react';
import './weatherAnimation.css'

export default function RainAnimation(props) {
    const [raindrops, setRaindrops] = useState([]);

    // 새로운 빗방울을 생성하는 함수
    const createRaindrop = () => ({
        x: Math.random() * window.innerWidth,
        y: -10,
        speed: Math.random() * (0.05 - 0.01) + 0.03, // 빗방울 속도
        opacity: Math.random()
    });

    // 초기 빗방울 배열 생성
    useEffect(() => {
        setRaindrops(Array.from({ length: 300 }, createRaindrop));
    }, []);

    // 빗방울 애니메이션 업데이트
    useEffect(() => {
        const updateRaindrops = () => {
            setRaindrops((prevRaindrops) =>
                prevRaindrops.map((raindrop) => ({
                    ...raindrop,
                    y: raindrop.y + raindrop.speed,
                    // 빗방울이 화면 하단에 도달하면 다시 위로 올림
                    ...(raindrop.y > window.innerHeight && { y: -10 }),
                }))
            );
        };

        const animationId = requestAnimationFrame(function animate() {
            updateRaindrops();
            animationId && requestAnimationFrame(animate);
        });

        return () => cancelAnimationFrame(animationId);
    }, [raindrops]);

    return (
        <div className="rain-container" style={props.aniStyle()}>
            {raindrops.map((raindrop, index) => (
                <div
                    key={index}
                    className="raindrop"
                    style={{
                        left: raindrop.x,
                        top: raindrop.y,
                        opacity: raindrop.opacity,
                    }}
                />
            ))}
        </div>
    );
}

