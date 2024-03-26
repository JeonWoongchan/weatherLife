import React, { useState, useEffect } from 'react';
import './weatherAnimation.css'

export default function SnowAnimation(props) {
    const [snowflakes, setSnowflakes] = useState([]);

    // 새로운 눈송이를 생성하는 함수
    const createSnowflake = () => ({
        x: Math.random() * window.innerWidth,
        y: -10,
        size: Math.random() * 3 + 5,
        speed: Math.random() * 0.015,
        opacity: Math.random()
    });

    // 초기 눈송이 배열 생성
    useEffect(() => {
        setSnowflakes(Array.from({ length: 200 }, createSnowflake));
    }, []);

    // 눈송이 애니메이션 업데이트
    useEffect(() => {
        const updateSnowflakes = () => {
            setSnowflakes((prevSnowflakes) =>
                prevSnowflakes.map((snowflake) => ({
                    ...snowflake,
                    y: snowflake.y + snowflake.speed,
                    // 눈송이가 화면 하단에 도달하면 다시 위로 올림
                    ...(snowflake.y > window.innerHeight && { y: -10 }),
                }))
            );
        };

        const animationId = requestAnimationFrame(function animate() {
            updateSnowflakes();
            animationId && requestAnimationFrame(animate);
        });

        return () => cancelAnimationFrame(animationId);
    }, [snowflakes]);

    return (
        <div className="snow-container" style={props.aniStyle()}>
            {snowflakes.map((snowflake, index) => (
                <div
                    key={index}
                    className="snow"
                    style={{
                        left: snowflake.x,
                        top: snowflake.y,
                        width: snowflake.size,
                        height: snowflake.size,
                        opacity: snowflake.opacity,
                    }}
                />
            ))}
        </div>
    )
}

