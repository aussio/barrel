import React from 'react';
import { StyleSheet, View } from 'react-native';
import CoordinateExamples from '../components/SVGExamples/Examples/CoordinateExamples';
import SimpleExamples from '../components/SVGExamples/Examples/SimpleExamples';
import Christmas from '../components/SVGExamples/Examples/Christmas';

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
