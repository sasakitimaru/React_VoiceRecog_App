import React, { useState, useEffect, useContext } from 'react';
import { View , TouchableOpacity, StyleSheet } from 'react-native';
import { Iconify } from 'react-native-iconify';

const AudioReplay = () => {
    return (
        <TouchableOpacity
            style={styles.audioReplayButton}
            onPress={() => {
                console.log('audio replay button pushed');
            }
            }>
            <Iconify icon="mdi:replay" size={20} color="#111111" />
        </TouchableOpacity>
    );
};
export default AudioReplay;

const styles = StyleSheet.create({
    audioReplayButton: {
        flexDirection: 'row',
    }
});