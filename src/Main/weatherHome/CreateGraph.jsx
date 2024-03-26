import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';

export default function CreateGraph(props) {
    const chartRef = useRef(null);
    const [chartData, setChartData] = useState([])
    const [repeatArr, setRepeatArr] = useState([])

    useEffect(() => {
        if (props.data) {
            setRepeatArr(props.data.filter(e => e.category === 'TMP'))
        }
    }, [props.data])

    useEffect(() => {
        const arr = []
        if (props.data) {
            const TMP = props.data.filter(e => e.category === 'TMP')
            const TMP_VALUE = TMP.map(e => e.fcstValue).filter(value => value !== undefined);
            const MIN_TMP = Math.min(...TMP_VALUE)
            repeatArr.map((a, i) => {
                let temp = a.fcstValue
                return (
                    // chart.js 선그래프에서 음수 표현 못함 -> 제일 작은 y값 찾아서 그 값만큼 모든 값에 더함 : 그래프 상승하락폭만 보면됨
                    arr.push({ x: i, y: Number(temp) + Math.abs(MIN_TMP) }) 
                )
            })
            setChartData(arr)
            console.log(arr)
        }
    }, [repeatArr])

    useEffect(() => {
        console.log(chartData)
    }, [chartData])

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        // 그라데이션 생성
        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, 'rgba(175, 208, 253, 1)'); 
        gradient.addColorStop(1, 'rgba(175, 208, 253, 0)');

        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: '',
                datasets: [{
                    label: 'Data',
                    data: chartData,
                    borderColor: 'rgba(135, 208, 253, 1)',
                    backgroundColor : 'rgba(175, 208, 253, 0.2)',
                    borderWidth: 3,
                    pointRadius: 0,
                    color : '#000',
                    fill: true
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                        display: false,
                    },
                    y: {
                        display: false,
                    },
                },
                plugins: {
                    legend: {
                        display: false,
                    }
                },
            },
        });

        return () => {
            myChart.destroy();
        };

    }, [chartRef, chartData]);



    return (
        <tr>
            <td>
                <div className="graph">
                    <canvas ref={chartRef} width="3000" height="250"></canvas>
                </div>
            </td>
        </tr>
        
    );
};