import React from 'react';
import Chart from 'react-apexcharts';
import useWindowSize from "../../Hooks/useWindowSize";

function BarChart({xaxis, yaxis, name}) {
    const [width] = useWindowSize();
    return (
        <>
            <Chart
                type='line'
                width={width <= 700 ? width : "85%"}
                height={450}
                series={[{data: yaxis,}]}
                options={{
                    title: {
                        text: `Last 6 Month expenditure on a product ${name}`,
                        style: {fontSize: '20px', color: 'white'}
                    },

                    colors: ['#F44336'],
                    xaxis: {
                        categories: xaxis,
                        title: {
                            text: 'Last 6 Month',
                            style: {
                                color: 'white',
                                fontSize: '15px'
                            },
                        },
                        labels: {
                            style: {
                                colors: 'white',
                                fontSize: '15px',
                            },
                        },
                    },
                    yaxis: {
                        title: {
                            text: 'Amount in Rs',
                            style: {
                                color: 'white',
                                fontSize: '15px',
                            }
                        },
                        labels: {
                            formatter(val) {
                                return `${val} ₹`;
                            },
                            style: {
                                colors: 'white',
                                fontSize: '15px',
                            }
                        },
                    },
                    dataLabels: {
                        formatter(val) {
                            return `${val} ₹`;
                        },
                    },
                    noData: {
                        text: 'Empty Data',
                        style: {
                            color: 'white',
                            fontSize: '15px',
                        }
                    },
                    plotOptions: {bar: {horizontal: false}},
                }}
            >
            </Chart>
        </>
    );
}

export default BarChart;