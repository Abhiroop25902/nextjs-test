'use client'
import Highcharts from 'highcharts';
import {useEffect} from "react";
import {chartOptionStore} from "@/app/queryai/stores/chartOptionStore";
import constants from "@/app/queryai/constants";

export default function Chart() {
    const {chartComponentId} = constants

    const chartComponentOption = chartOptionStore(state => state.chartOption)

    useEffect(() => {
        if (chartComponentOption) Highcharts.chart(chartComponentId, chartComponentOption);
    }, [chartComponentId, chartComponentOption]);


    return <div id={chartComponentId} className={`h-full p-6 flex items-center text-center`}>
        Chart will appear when valid response comes
    </div>
}