import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, } from 'react-native';
import GenreCard from './GenreCard';

const TestField = () => {
    const genres = [
        {
            id: 1,
            genre: '旅行',
            description: '空港やホテルでの会話、レストランでの食事の注文、観光地での質問など。',
            icon: 'mingcute:airplane-fill'
        },
        {
            id: 2,
            genre: '仕事',
            description: 'ビジネスミーティング、プレゼンテーション、電子メールの書き方など。',
            icon: 'ic:outline-menu-book'
        },
        {
            id: 3,
            genre: '日常生活',
            description: '家庭での日常的な会話、買い物、友達との会話、天気についての話など。',
            icon: 'bi:people-fill'
        },
        {
            id: 4,
            genre: '学校',
            description: '授業でのディスカッション、先生との会話、友達との会話、学校のイベントについての話など。',
            icon: 'ic:outline-school'
        },
        {
            id: 5,
            genre: '健康とフィットネス',
            description: '医者との会話、ジムでの会話、健康やエクササイズについての話など。',
            icon: 'healthicons:exercise-running'
        },
        {
            id: 6,
            genre: 'ニュースと現代の問題',
            description: '政治、経済、環境問題などについてのディスカッション。',
            icon: 'icon-park-solid:newspaper-folding'
        },
        {
            id: 7,
            genre: 'エンターテイメント',
            description: '映画、音楽、スポーツ、本についての話など。',
            icon: 'ic:sharp-video-library'
        },
        {
            id: 8,
            genre: 'テクノロジー',
            description: '新しいガジェット、ソーシャルメディア、AIや他の新しい技術についての話など。',
            icon: 'material-symbols:chart-data-rounded'
        },
        {
            id: 9,
            genre: '文化と芸術',
            description: '美術館や劇場での会話、伝統的な祭りや文化についての話など。',
            icon: 'streamline:religion-symbol-yin-yang-religion-tao-yin-yang-taoism-culture'
        }
    ];
    return (
        <View style={styles.container}>
            <Text style={styles.h1}>ジャンルを決めよう</Text>
            <FlatList
                style={styles.list}
                data={genres}
                renderItem={({ item }) => <GenreCard genre={item.genre} id={item.id}/>}
                // keyExtractor={(item) => item.toString()}
                numColumns={2}
            />
        </View>
    );
};
export default TestField;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    h1: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    list: {
        flex: 1,
        padding: 10,
        width: '100%',
    },
});