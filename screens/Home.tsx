import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

function HomeScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Text>Basic React Native App!</Text>
            <Text>Test line of text. 🙌🏻</Text>
            <Button
                title="Go to SVG Examples"
                onPress={() => navigation.navigate('SVGs')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default HomeScreen;
