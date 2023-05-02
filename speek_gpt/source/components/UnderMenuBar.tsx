import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import  IconButton from './bottom/IconButton';
type UnderMenuBarProps = {
    setPageName: (PageName: String) => void;
};
const UnderMenuBar:React.FC<UnderMenuBarProps> = ({setPageName}) => {
    return(
        <View style={styles.container}>
            <IconButton setPageName={setPageName} Pagetarget='Home'>
                <Text>Home</Text>
            </IconButton>
            <IconButton setPageName={setPageName} Pagetarget='History'>
                <Text>History</Text>
            </IconButton>
            <IconButton setPageName={setPageName} Pagetarget='Setting'>
                <Text>Setting</Text>
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
  });
  