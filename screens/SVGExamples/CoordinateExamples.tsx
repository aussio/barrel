import React from 'react';
import { StyleSheet } from 'react-native';
import { Example, ExampleGroup } from './Example';

function CoordinateExamples() {
    const width: number = 200;
    const height: number = 200;
    return (
        <ExampleGroup title={"Coordinate Examples"}>
            <Example title={'viewbox (0 0 100 100)\ncircle (50, 50)'}>
                <svg width={width} height={height} viewBox="0 0 100 100" >
                    <circle cx="50" cy="50" r="25" fill='red' />
                    <text x="1" y="5" style={styles.tiny}>
                        (0, 0)
                    </text>
                    <text x="43" y="50" style={styles.tiny}>
                        (50, 50)
                    </text>
                    <text x="78" y="97" style={styles.tiny}>
                        (100, 100)
                    </text>
                </svg>
            </Example>
            <Example title={'viewbox (-50 -50 100 100)\ncircle (50, 50)'}>
                <svg width={width} height={height} viewBox="-50 -50 100 100" >
                    <circle cx="50" cy="50" r="25" fill='red' />
                    <text x="-49" y="-45" style={styles.tiny}>
                        (-50, -50)
                    </text>
                    <text x="-5" y="0" style={styles.tiny}>
                        (0, 0)
                    </text>
                    <text x="34" y="47" style={styles.tiny}>
                        (50, 50)
                    </text>
                </svg>
            </Example>
        </ExampleGroup >
    )
}

const styles = StyleSheet.create({
    tiny: {
        fontSize: 5,
        fontWeight: 'bold',
    }
});

export default CoordinateExamples;
