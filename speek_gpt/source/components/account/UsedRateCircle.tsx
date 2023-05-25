import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { View } from 'react-native-animatable';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';
import { User, tokenlimit } from '../../Plan.type';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
type UsedRateCircleProps = {
    user: User,
    isElevenlabs: boolean,
};
const UsedRateCircle: React.FC<UsedRateCircleProps> = ({ user, isElevenlabs }) => {
    // console.log('user: ', user);
    let percentageOfUsedNomalToken: number = 0;
    let percentageOfUsedPremiumToken: number = 0;
    let token = user.token;
    let eleventoken = user.eleventoken;
    let plan = user.plan;
    console.log(token, plan, isElevenlabs)
    let circlecolor = '';
    isElevenlabs ? circlecolor = '#136FFF' : circlecolor = '#FF367F';
    // token = 800;
    if (plan === 'nomal') {
        percentageOfUsedNomalToken = token / tokenlimit['nomal'].token;
        percentageOfUsedPremiumToken = eleventoken / tokenlimit['nomal'].eleventoken;
    } else if (plan === 'standard') {
        console.log('standard', isElevenlabs)
        percentageOfUsedNomalToken = token / tokenlimit['standard'].token;
        percentageOfUsedPremiumToken = eleventoken / tokenlimit['standard'].eleventoken;
    } else if (plan === 'premium') {
        percentageOfUsedNomalToken = token / tokenlimit['premium'].token;
        percentageOfUsedPremiumToken = eleventoken / tokenlimit['premium'].eleventoken;
    }
    const animatedValue = useRef(new Animated.Value(0)).current;
    const r = 40;
    const circumference = 2 * Math.PI * r; // 2πr
    const revisedUsedRate = Math.max(1 - (
        isElevenlabs ? percentageOfUsedPremiumToken :
            percentageOfUsedNomalToken
    ), 0)

    const strokeDashoffset = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [circumference, circumference * revisedUsedRate],
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
            <View style={styles.circlecontainer}>
                <Svg viewBox="0 0 100 100">
                    <Circle
                        cx="50"
                        cy="50"
                        r={r}
                        fill="none"
                        stroke="#E6E6E6"
                        strokeWidth={7}
                    />
                    <AnimatedCircle
                        cx="50"
                        cy="50"
                        r={r}
                        fill="none"
                        transform={`rotate(-90 50 50)`}
                        stroke={circlecolor}
                        strokeWidth={7}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                    />
                    <SvgText
                        x="50"
                        y="50"
                        textAnchor="middle"
                        fill="black"
                        fontSize="10"
                        dy=".3em" // vertically center text
                    >
                        {isElevenlabs ? `${Math.min(percentageOfUsedPremiumToken * 100,100).toFixed(0)}%` :
                            `${Math.min(percentageOfUsedNomalToken * 100,100).toFixed(0)}%`}
                    </SvgText>
                </Svg>
            </View>
        </View>
    );
}

export default UsedRateCircle;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '80%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circlecontainer: {
        // flex: 0.4,
        width: '100%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#fffeee',
    },
});
