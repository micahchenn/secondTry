import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, TimeScale, LinearScale, LineElement, PointElement, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-date-fns';
import zoomPlugin from 'chartjs-plugin-zoom';
import crosshairPlugin from 'chartjs-plugin-crosshair';
import 'chartjs-chart-financial';
import '../../Styling_Pages/Static_Elements/Stock_Line_Graph.css';


ChartJS.register(TimeScale, LinearScale, LineElement, PointElement, Tooltip, Legend, zoomPlugin, crosshairPlugin);

const Stock_Line_Graph = ({ data, color }) => {
    const chartData = {
        labels: data ? Object.keys(data).reverse() : [],
        datasets: [
            {
                label: 'Stock Price',
                data: data ? Object.values(data).map(item => item['4. close']).reverse() : [],
                fill: false, // Fill the area under the line
                backgroundColor: color + '66', // Lighter color for the fill
                borderColor: color,
                pointRadius: 0,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                    tooltipFormat: 'MM/dd/yyyy',
                    max: data ? Object.keys(data)[0] : null,
                },
                grid: {
                    display: false,
                },
                ticks: {
                    maxRotation: 0,
                    autoSkip: true,
                    maxTicksLimit: 5 // Adjust this number to the maximum number of ticks you want to display
                },
            },
            y: {
                type: 'linear',
                beginAtZero: false,
                grid: {
                    display: false,
                },
                ticks: {
                    callback: function (value) {
                        return value.toFixed(2); // Format the y-axis labels to have two decimal points
                    }
                },
            },
        },
        plugins: {
            crosshair: {
                line: {
                    color: color,
                    width: 1
                },
                sync: {
                    enabled: false,
                },
                zoom: {
                    enabled: false,
                }
            },
            tooltip: {
                enabled: true,
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function (context) {
                        var label = context.dataset.label || '';

                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                        }
                        return label;
                    }
                }
            },
            zoom: {
                limits: {
                    x: { min: 'original', max: 'original' },
                    y: { min: 'original', max: 'original' },
                },
                pan: {
                    enabled: true,
                    mode: 'xy',
                    overScaleMode: 'none',
                },
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true,
                    },
                    mode: 'xy',
                    overScaleMode: 'none',
                },
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };


    return (
        <div className="chart-container">
            {data && <Line data={chartData} options={options} />}
        </div>
    );
};

export default Stock_Line_Graph;