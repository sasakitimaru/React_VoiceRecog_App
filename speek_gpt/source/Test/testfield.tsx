import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { View } from 'react-native-animatable';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function CircleAnimation(token: number, plan: string, isElevenlabs: boolean) {
    let percentageOfUsedNomalToken: number = 0; // 0 はtokenに置き換え
    let percentageOfUsedPremiumToken: number = 0; // 0 はtokenに置き換え
    isElevenlabs = false;
    let circlecolor = '';
    isElevenlabs ? circlecolor = '#136FFF' : circlecolor = '#FF367F';
    token = 800;
    plan = 'premium';
    if (plan === 'nomal') {
        percentageOfUsedNomalToken = token / 200;
        percentageOfUsedPremiumToken = token / 100;
    } else if (plan === 'standard') {
        percentageOfUsedNomalToken = token / 2000;
        percentageOfUsedPremiumToken = token / 100;
    } else if (plan === 'premium') {
        percentageOfUsedNomalToken = token / 2000;
        percentageOfUsedPremiumToken = token / 1000;
    }
    const animatedValue = useRef(new Animated.Value(0)).current;
    const r = 30;
    const circumference = 2 * Math.PI * r; // 2πr

    const strokeDashoffset = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [circumference, circumference * Math.max(1 - (
            isElevenlabs ? percentageOfUsedPremiumToken :
                percentageOfUsedNomalToken
        ), 0)],
    });

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false,
        }).start();
    }, []);

    return (
        <View style={styles.container}>
            <Text>CircleAnimation</Text>
            <View style={styles.circlecontainer}>
                <Svg viewBox="0 0 100 100">
                    <Circle
                        cx="50"
                        cy="50"
                        r={r}
                        fill="none"
                        stroke="#E6E6E6"
                        strokeWidth={5}
                    />
                    <AnimatedCircle
                        cx="50"
                        cy="50"
                        r={r}
                        fill="none"
                        transform={`rotate(-90 50 50)`}
                        stroke={circlecolor}
                        strokeWidth={5}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                    />
                </Svg>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circlecontainer: {
        flex: 0.4,
        width: '80%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#FFEEEE',
    },
});
