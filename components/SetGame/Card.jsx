import React from 'react';
import { StyleSheet, View } from 'react-native';
import Motif from './Motif';

function Card() {
    return (
        <View style={styles.card}>
            <svg
                viewBox="-100 -100 200 200"
                height={300}
                width={200}
            >
                <Motif></Motif>
            </svg>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        height: 300,
        width: 200,
        border: '1px solid black',
        borderRadius: '1rem',
        margin: '1rem',
        backgroundColor: '#fffcf6',
    },
});

export default Card