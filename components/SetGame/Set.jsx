import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Card from './Card';

function Set() {

    const cards = [
        <Card></Card>
    ]

    return (
        <View>
            {cards}
        </View>
    )
}

// const styles = StyleSheet.create({
// });

export default Set