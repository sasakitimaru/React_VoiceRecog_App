import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import  IconButton from './bottom/IconButton';
type UnderMenuBarProps = {
    setTopic: (topic: String) => void;
    setPageName: (PageName: String) => void;
};
const UnderMenuBar:React.FC<UnderMenuBarProps> = ({setTopic,setPageName}) => {
    return(
        <View style={styles.container}>
            <IconButton setTopic={setTopic} setPageName={setPageName} Pagetarget='Home'>
                <Text>Home</Text>
            </IconButton>
            <IconButton setTopic={setTopic} setPageName={setPageName} Pagetarget='History'>
                <Text>History</Text>
            </IconButton>
            <IconButton setTopic={setTopic} setPageName={setPageName} Pagetarget='Setting'>
                <Text>Setting</Text>
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
  