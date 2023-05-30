import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const CircleArrowAnimation = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const r = 40;
  const circumference = r * 2 * Math.PI; // 半径40の円の円周

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, circumference],
  });

  return (
    <Svg height="100" width="100">
      <AnimatedPath
        d="M50,10 a40,40 0 1,0 0,80 a40,40 0 1,0 0,-80"
        stroke="black"
        strokeWidth="2.5"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
      />
      <Path
        d="M10,0 L10,-5 L20,0 L10,5 Z"
        stroke="black"
        strokeWidth="2"
        fill="black"
        transform={{ translate: '50, 10' }}
      />
    </Svg>
  );
};

export default CircleArrowAnimation;
