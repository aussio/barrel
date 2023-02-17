import React from 'react';
import { StyleSheet } from 'react-native';
import { Example, ExampleGroup } from './Example';

function SimpleExamples() {
    const width: number = 200;
    const height: number = 200;
    return (
        <ExampleGroup title={"Simple Examples"}>
            <Example title={'Circle size of viewport'}>
                <svg width={width} height={height} viewBox="0 0 100 100" >
                    <circle cx="50" cy="50" r="50" />
                </svg>
            </Example>
            <Example title={'Circle, centered in viewport'}>
                <svg width={width} height={height} viewBox="0 0 200 200" >
                    <circle cx="100" cy="100" r="50" fill='green' />
                </svg>
            </Example>
            <Example title={'Circle, positioned "out" of the viewport'}>
                <svg width={width} height={height} viewBox="0 0 100 100" >
                    <circle cx="100" cy="100" r="50" fill='red' />
                    <text x="1" y="5" style={styles.tiny}>
                        (0, 0)
                    </text>
                    <text x="78" y="97" style={styles.tiny}>
                        (100, 100)
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

export default SimpleExamples;
