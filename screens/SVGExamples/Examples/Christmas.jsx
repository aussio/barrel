import React from 'react';
import { StyleSheet } from 'react-native';
import { Example, ExampleGroup } from '../Example';
import Grid from '../Grid';

function Christmas() {
    const width = 400;
    const height = 400;
    return (
        <ExampleGroup title={"Christmas"}>
            <Bulb width={width} height={height} />
            <Tree width={200} height={height} />
            <GingerbreadMan width={200} height={height} />
        </ExampleGroup >
    )
}

function Bulb({ width, height }) {
    const red = "#D1495B";
    const gold = "#F79257";
    return (
        <Example title={'Circles\nand a rect'}>
            <svg width={width} height={height} viewBox="-100, -100, 200, 200" >
                <Grid xStart={-100} xEnd={100} yStart={-100} yEnd={100} step={50} />
                {/* Bulb */}
                <circle cx="0" cy="20" r="70" fill={red} />
                {/* Ring */}
                <circle
                    cx="0"
                    cy="-75"
                    r="12"
                    fill="none"
                    stroke={gold}
                    strokeWidth={2}
                />
                {/* Ring attachment */}
                <rect
                    x="-18"
                    y="-65"
                    width="36"
                    height="20"
                    fill={gold}
                />
                {/* Vertical line up the middle, out of curiosity to check position */}
                {/* <line y1={-100} y2={100} stroke="gray" strokeWidth={.25}/> */}
            </svg>
        </Example>
    )
}

function Tree({ width, height }) {
    return (
        <Example title={'Polygons (triangles) and a rect'}>
            <svg width={width} height={height} viewBox="-100, -200, 200, 400" >
                <Grid xStart={-100} xEnd={100} yStart={-200} yEnd={200} step={20} />
                <polygon points="0,0    80,120 -80,120" fill="#234236" />
                <polygon points="0,-40  60,60  -60,60" fill="#0C5C4C" />
                <polygon points="0,-80  40,0   -40,0" fill="#38755B" />
                <rect x="-20" y="120" width="40" height="30" fill="brown" />
            </svg>
        </Example>
    )
}

function GingerbreadMan({ width, height }) {
    return (
        <Example title={'Lines and round borders'}>
            <svg width={width} height={height} viewBox="-100, -200, 200, 400" >
                <Grid xStart={-100} xEnd={100} yStart={-200} yEnd={200} step={50} />

                <circle style={styles.gb.body} cx={0} cy={-50} r={30} />

                <circle style={styles.gb.eye} cx={-12} cy={-55} r={3} />
                <circle style={styles.gb.eye} cx={12} cy={-55} r={3} />
                <rect style={styles.gb.mouth} x={-10} y={-40} width={20} height={5} rx={2} />

                <line style={styles.gb.limb} x1={-40} y1={-10} x2={40} y2={-10} />
                <line style={styles.gb.limb} x1={-25} y1={50} x2={0} y2={-15} />
                <line style={styles.gb.limb} x1={25} y1={50} x2={0} y2={-15} />

                <circle style={styles.gb.button} cx={0} cy={-10} r={5} />
                <circle style={styles.gb.button} cx={0} cy={10} r={5} />
            </svg>
        </Example>
    )
}

const gingerbread = "#cd803d"
const styles = StyleSheet.create({
    gb: {
        body: {
            fill: gingerbread,
        },
        eye: {
            fill: "white",
        },
        mouth: {
            fill: "none",
            stroke: "white",
            strokeWidth: "2px",
        },
        limb: {
            stroke: gingerbread,
            strokeWidth: "35px",
            strokeLinecap: "round",
        },
        button: {
            fill: "black",
        },
    }
});

export default Christmas;
