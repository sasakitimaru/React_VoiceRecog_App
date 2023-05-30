import React, { useEffect,useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, } from 'react-native';
import { Iconify } from 'react-native-iconify';

type GenreCardProps = {
    genre: string,
    description?: string,
    id: number,
}
const GenreCard: React.FC<GenreCardProps> = ({ genre, id }) => {
    console.log(id)
    const [Icon, setIcon] = useState<JSX.Element>()
    useEffect(() => {
        switch (id) {
            case 1:
                setIcon(<Iconify icon="mingcute:airplane-fill" size={50} color="#fff" />)
                break;
            case 2:
                setIcon(<Iconify icon="ic:outline-menu-book" size={50} color="#fff" />)
                break;
            case 3:
                setIcon(<Iconify icon="bi:people-fill" size={50} color="#fff" />)
                break;
            case 4:
                setIcon(<Iconify icon="ic:outline-school" size={50} color="#fff" />)
                break;
            case 5:
                setIcon(<Iconify icon="healthicons:exercise-running" size={50} color="#fff" />)
                break;
            case 6:
                setIcon(<Iconify icon="icon-park-solid:newspaper-folding" size={50} color="#fff" />)
                break;
            case 7:
                setIcon(<Iconify icon="ic:sharp-video-library" size={50} color="#fff" />)
                break;
            case 8:
                setIcon(<Iconify icon="material-symbols:chart-data-rounded" size={50} color="#fff" />)
                break;
            case 9:
                setIcon(<Iconify icon="streamline:religion-symbol-yin-yang-religion-tao-yin-yang-taoism-culture" size={50} color="#fff" />)
                break;
        }
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.text}>{genre}</Text>
                {Icon}
            </View>
        </View>
    );
};
export default GenreCard;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    card: {
        width: 150,
        height: 150,
        backgroundColor: '#4169e1',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
});