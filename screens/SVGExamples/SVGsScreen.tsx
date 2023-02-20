import React from 'react';
import { StyleSheet, View } from 'react-native';
import CoordinateExamples from './CoordinateExamples';
import SimpleExamples from './SimpleExamples';
import ChristmasBulb from './ChristmasBulb';

function SVGsScreen() {

    return (
        <View style={styles.container}>
            <SimpleExamples />
            <CoordinateExamples />
            <ChristmasBulb />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
    },
});

export default SVGsScreen;
