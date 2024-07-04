import React from 'react'
import {ChartComponent,SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, StackingColumnSeries, Tooltip} from "@syncfusion/ej2-react-charts";

import { stackedCustomSeries, stackedPrimaryXAxis, stackedPrimaryYAxis } from '../../data/dummy';
import { useStateContext } from '../../contexts/ContextProvider';

export const Stacked = ({width, height}) => {
    const {currentMode, currentColor} = useStateContext();
    const second_chatColor = currentMode==='Dark'? '#B8B6B8' : '#33373E';
    const palette = [currentColor, second_chatColor];
    return (
        <ChartComponent
            width={width}
            height={height}
            background={currentMode === 'Dark' ? '#33373E' : '#fff'}
            palettes={palette}
            primaryXAxis={stackedPrimaryXAxis}
            primaryYAxis={stackedPrimaryYAxis}
            chartArea={{border: {width: 0}}}
            tooltip={{enable: true}}
            LengendSettings={{background: 'white'}}
            >
            <Inject services={[StackingColumnSeries, Category, Legend, Tooltip]} />
            <SeriesCollectionDirective>
                {stackedCustomSeries.map((item, index)=>(
                    <SeriesDirective key={index} {...item}/>
                ))}
            </SeriesCollectionDirective>
        </ChartComponent>
    )
}
