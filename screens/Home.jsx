import React from 'react';
import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import HoverableView from '../components/HoverableView';

function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <ExamplePressableImage
                onPress={() => navigation.navigate('SVGs')}
                imageRequire={require('./svg_examples.png')}
                title={'SVG Examples'}
                color={'#D1495B'}
            />
            <ExamplePressableImage
                onPress={() => navigation.navigate('SetGame')}
                imageRequire={''}
                title={'Set Game'}
                color={'seagreen'}
            />
        </View>
    );
}

function ExamplePressableImage({ onPress, imageRequire, title, color }) {
    return (
        <HoverableView
            style={{ ...styles.hoverImage, borderWidth: 2, borderColor: color }}
            onHover={{ borderWidth: 4 }}
        >
            <Pressable
                style={styles.pressableImage}
                onPress={onPress}
            >
                <Text style={{ ...styles.header, color: color }}>{title}</Text>
                <Image
                    style={styles.image}
                    source={imageRequire}
                />
            </Pressable >
        </HoverableView>
    )

}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        // On small screens, wrap items around and center
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#fff',
        height: '100%',
    },
    hoverImage: {
        margin: '1rem',
    },
    pressableImage: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    image: {
        width: 400,
        height: 400,
    },
    header: {
        fontSize: 40,
        fontWeight: 'bold',
        margin: '1rem',
    }
});

export default HomeScreen;
