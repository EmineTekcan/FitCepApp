import React, { useRef, useEffect } from 'react';
import { View, Dimensions, Animated } from 'react-native';
import Svg,{ G,Line,Circle} from 'react-native-svg';
import {styles} from './styles';

const window_width = Dimensions.get('window').width;

const LineChart = ({
    containerHeight =400,
    circleColor = '#ccc',
    circleRadius = 4,
    axisColor = '#fff',
    axisWidth = 2,
}) => {
    const marginFor_x_fromLeft = 50;
    const marginFor_y_fromBottom = 50;
    const padding_from_screenBorder= 20;

    const x_axis_x1_point = marginFor_x_fromLeft;
    const x_axis_y1_point = containerHeight - marginFor_y_fromBottom;
    const x_axis_x2_point = window_width - padding_from_screenBorder;
    const x_axis_y2_point = containerHeight - marginFor_y_fromBottom;

    const y_axis_x1_point = marginFor_x_fromLeft;
    const y_axis_y1_point =  padding_from_screenBorder;
    const y_axis_x2_point = marginFor_x_fromLeft;
    const y_axis_y2_point =containerHeight - marginFor_y_fromBottom;

    const AnimatedSvg = Animated.createAnimatedComponent(Svg);    
    const AnimatedLine = Animated.createAnimatedComponent(Line);
    const AnimatedCircle = Animated.createAnimatedComponent(Circle);
    
    const render_x_y_axis = () => {
        return(
            <G key="x-axis y-axis">
                <AnimatedCircle
                key="x-axis x1y1-circle"
                cx={x_axis_x1_point}
                cy={x_axis_y1_point}
                r={circleRadius}
                fill={circleColor}
                />
                <AnimatedCircle
                key="x-axis x2y2-circle"
                cx={x_axis_x2_point}
                cy={x_axis_y2_point}
                r={circleRadius}
                fill={circleColor}
                />
                <AnimatedCircle
                key="y-axis x1y1-circle"
                cx={y_axis_x1_point}
                cy={y_axis_y1_point}
                r={circleRadius}
                fill={circleColor}
                />
                <AnimatedLine
                    key="x-axis"
                    x1={x_axis_x1_point}
                    y1={x_axis_y1_point}
                    x2={x_axis_x2_point}
                    y2={x_axis_y2_point}
                    stroke={axisColor}
                    strokeWidth={axisWidth}
                />
                <AnimatedLine
                    key="y-axis"
                    x1={y_axis_x1_point}
                    y1={y_axis_y1_point}
                    x2={y_axis_x2_point}
                    y2={y_axis_y2_point}
                    stroke={axisColor}
                    strokeWidth={axisWidth}
                />
            </G>
        );
    };
    return(
        <View style={[styles.svgWrapper ,{height: containerHeight}]}>
            <AnimatedSvg width="100%" height="100%" style={styles.svgStyle}>
                {render_x_y_axis()}
            </AnimatedSvg>
        </View>
    );
    
}

