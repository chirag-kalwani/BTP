import React, {useLayoutEffect, useState} from 'react';
import Chart from 'react-apexcharts';
import useWindowSize from "../../Hooks/useWindowSize";

// This function is used to get the size of the window
// custom hook


function PieChart({labels, series, title, colors}) {
    const [width] = useWindowSize();
    return (
        <>
            <Chart
                type='pie'
                width={width <= 700 ? width : "85%"}
                height={450}
                series={series}
                options={{
                    title: {
                        text: title,
                        style: {
                            fontSize: '20px',
                            color: 'white',
                        }
                    },
                    legend: {
                        position: 'right',
                        horizontalAlign: 'left',
                        fontSize: '20px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 600,
                        labels: {
                            colors: 'white',
                        }
                    },
                    colors: colors,
                    noData: {
                        text: 'Empty Data',
                    },
                    labels: labels,
                    responsive: [{
                        breakpoint: 480,
                        options: {}
                    }]
                }}
            >
            </Chart>
        </>
    );
}

export default PieChart; // Exporting the component