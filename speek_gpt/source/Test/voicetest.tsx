import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import ChatBubble from './ChatBubble';

const Test = () => {

    return (
        <View>
            <ChatBubble isUser={true} text={"I really like play a tennise, I often start my day with couple of coffee! Can you like one?"} />
        </View>
    );
};

export default Test;
