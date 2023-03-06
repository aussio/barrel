import React from 'react';
import { StyleSheet, View } from 'react-native';
import CoordinateExamples from './Examples/CoordinateExamples';
import SimpleExamples from './Examples/SimpleExamples';
import Christmas from './Examples/Christmas';

function SVGsScreen() {

    return (
        <View style={styles.container}>
            <SimpleExamples />
            <CoordinateExamples />
            <Christmas />
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
