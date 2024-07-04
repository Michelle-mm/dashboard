import React from 'react'
import {SparklineComponent, SparklineTooltip, Inject} from "@syncfusion/ej2-react-charts";
export const SparkLine = ({id, height, width, data, currentColor, type, color}) => {
    return (
        <SparklineComponent
            id={id}
            height={height}
            width={width}
            lineWidth={3}
            valueType="Numeric"
            fill={color}
            border={{color: currentColor, width: 2}}
            dataSource={data}
            xName="x"
            yName="yval"
            type={type}
            tooltipSettings={{
                visible: true,
                format: '${x} : data ${yval}',
                trackLineSettings:{
                    visible: true
                }
            }}>
                <Inject services={[SparklineTooltip]}/>
        </SparklineComponent>
    )
}
