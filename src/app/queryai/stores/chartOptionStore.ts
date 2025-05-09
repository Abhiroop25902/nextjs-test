import {create} from 'zustand'
import Highcharts from "highcharts";

interface ChartOptionState {
    chartOption: Highcharts.Options | undefined
    updateChartOption: (newOption: Highcharts.Options) => void
}

export const chartOptionStore = create<ChartOptionState>(set => ({
    chartOption: undefined,
    updateChartOption: (newOption: Highcharts.Options | undefined) => {
        if (newOption) set(oldState => ({chartOption: newOption, updateChartOption: oldState.updateChartOption}))
    }
}))