import React from 'react';
import { StyleSheet, View, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

//ボトムメニューのアイコンボタン

type IconButtonProps = {
    setTopic: (topic: String) => void;
    setPageName: (PageName: String) => void;
    Pagetarget: String,
    children: JSX.Element
};

const IconButton: React.FC<IconButtonProps> = ({setTopic,setPageName,Pagetarget,children}) => {
    const navigation = useNavigation();
    const moveTodesignatedPage = () => {
        setTopic('');
        setPageName(Pagetarget);
    };
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={moveTodesignatedPage}>
                {children}
            </TouchableOpacity>
        </View>
    )
};
export default IconButton;

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '33.33%',
    },
    button: {
      padding: 8,
    },
});
  