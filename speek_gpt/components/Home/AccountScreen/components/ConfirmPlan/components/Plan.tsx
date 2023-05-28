import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Plan = () => {
    const currentPlan = 'ノーマル';
    return (
        <View style={styles.container}>
            <Text>{`あなたの現在のプラン：${currentPlan}`}</Text>
            {
                currentPlan === 'ノーマル' &&
                <Text>まだプランを購入していません。</Text>
            }
        </View>
    );
};
export default Plan;

//あとでグローバルに定義
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});