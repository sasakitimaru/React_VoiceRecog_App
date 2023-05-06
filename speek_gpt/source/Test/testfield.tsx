import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ChatBubble from './ChatBubble';


const Test = () => {
    return (
        <View style={styles.container}>
            <ChatBubble isUser={false} text={'Thas is great to hear! Programming can be a very rewarding field to work in. What kind of programming are you interested in?'} />
            <ChatBubble isUser={true} text={'I am interested in web development.'} />
        </View>
    );
};

export default Test;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginLeft: 10,
    },
});

