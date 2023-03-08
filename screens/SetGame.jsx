import React from 'react';
import { StyleSheet, View } from 'react-native';
import Set from '../components/SetGame/Set';

function SetGameScreen() {

    return (
        <View style={styles.container}>
            <Set />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
    },
});

export default SetGameScreen;
