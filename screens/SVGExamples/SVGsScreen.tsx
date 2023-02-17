import React from 'react';
import { StyleSheet, View } from 'react-native';
import CoordinateExamples from './CoordinateExamples';
import SimpleExamples from './SimpleExamples';

function SVGsScreen() {

    return (
        <View style={styles.container}>
            <SimpleExamples />
            <CoordinateExamples />
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
    },
});

export default SVGsScreen;
