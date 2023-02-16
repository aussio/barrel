import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function SVGsScreen() {
    return (
        <div style={styles.container}>
            <div style={styles.example}>
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="50" />
                </svg>
            </div>
            <div style={styles.example}>
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="50" fill='red'/>
                </svg>
            </div>
            <div style={styles.example}>
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="100" cy="100" r="50" fill='green'/>
                </svg>
            </div>
        </div>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    example: {
        maxWidth: '200px',
        margin: '1rem',
        borderStyle: 'dashed',
        borderColor: 'lightgrey',
        borderWidth: 2,
    }
});

export default SVGsScreen;
