import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import IconButton from './bottom/IconButton';
import { Iconify } from 'react-native-iconify';
type UnderMenuBarProps = {
    setPageName: (PageName: String) => void;
};
const UnderMenuBar: React.FC<UnderMenuBarProps> = ({ setPageName }) => {
    return (
        <View style={styles.container}>
            <IconButton setPageName={setPageName} Pagetarget='Home'>
                <View style={styles.iconcontainer}>
                    <Iconify icon="solar:chat-round-call-linear" size={30} color="#000000" />
                    <Text style={styles.icontext}>AIChat</Text>
                </View>
            </IconButton>
            <IconButton setPageName={setPageName} Pagetarget='History'>
                <View style={styles.iconcontainer}>
                    <Iconify icon="icon-park-outline:history-query" size={30} color="#000000" />
                    <Text style={styles.icontext}>学習履歴</Text>
                </View>
            </IconButton>
            <IconButton setPageName={setPageName} Pagetarget='Setting'>
                <View style={styles.iconcontainer}>
                    <Iconify icon="material-symbols:account-circle-full" size={30} color="#000000" />
                    <Text style={styles.icontext}>アカウント</Text>
                </View>
            </IconButton>
            <IconButton setPageName={setPageName} Pagetarget='test'>
                <Text>Test</Text>
            </IconButton>
        </View>
    )
};
export default UnderMenuBar;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        // height: '10%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    iconcontainer: {
        // flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icontext: {
        fontSize: 10,
    },
});
