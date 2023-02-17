import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function Example({ title, children }) {
    return (
        <View style={exampleStyles.container}>
            <Text style={exampleStyles.header}>
                {title}
            </Text>
            <View style={exampleStyles.svg}>
                {children}
            </View>
        </View>
    )
}

function ExampleGroup({ title, children }) {
    return (
        <>
            <Text style={exampleGroupStyles.header}>
                {title}
            </Text>
            <View style={exampleGroupStyles.container}>
                {children}
            </View>
        </>
    )
}

const exampleStyles = StyleSheet.create({
    container: {
        // Only make the Example container as large as the largest child.
        // This forces the header text to wrap around to the width of the SVG.
        maxWidth: 'min-content',
        maxHeight: 'min-content',
        textAlign: 'center',
        padding: '1rem',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: '.5rem'
    },
    svg: {
        // Make the <View> around the SVG stick to the `width/height` attributes of the SVG
        maxWidth: 'fit-content',
        maxHeight: 'fit-content',
        borderStyle: 'dashed',
        borderColor: 'lightgrey',
        borderWidth: 2,
    }
});

const exampleGroupStyles = StyleSheet.create({
    header: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: '.5rem',
        padding: '2rem',
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
    },
});

export { Example, ExampleGroup };
