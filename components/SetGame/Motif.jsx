import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function Motif() {
    const fill = {
        solid: "#5f4c6c",
        stripe: "",
        empty: "transparent",
    }
    const shape = {
        capsule: <Capsule />,
        diamond: <Diamond />,
        squiggle: <Squiggle />,
    }

    return (
        <g
            fill={fill.solid}
            stroke={fill.solid}
        >
            {shape.squiggle}
        </g>
    )
}

function Capsule() {
    return (
        <g
            strokeWidth={40}
            strokeLinecap={"round"}
        >
            <line x1={-25} y1={0} x2={25} y2={0} />
        </g>
    )
}

function Diamond() {
    return (
        <path
            d="M33.87, 0L67.74, 53.65,33.87, 107.3,0, 53.65Z"
        />
    )
}

function Squiggle() {
    return (
        <path d="M 10 80 Q 52.5 10, 95 80 T 180 80" stroke="black" fill="transparent" />
    )
}

// const styles = StyleSheet.create({
// });

export default Motif