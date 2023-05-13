import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, TouchableNativeFeedback } from 'react-native';
// import { Picker, PickerIOS } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { Iconify } from 'react-native-iconify';
// import { ItemValue } from '@react-native-picker/picker/typings/Picker';

type items = {
    label: string;
    value: string;
};
const InquiryForm = () => {
    const navigation = useNavigation();
    const items:items[] = [
        { label: 'その他', value: '0'},
        { label: '不具合', value: '1' },
        { label: '機能追加', value: '2' },
        { label: 'その他', value: '3' },
    ];
    const [selectedValue, setSelectedValue] = useState<items>(items[0]);

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Iconify icon="material-symbols:arrow-back-ios-new" size={30} color="#000000" />
                </TouchableOpacity>
            ),
            headerTitle: '問い合わせフォーム',
        });
    }, []);

    useEffect(() => {
        console.log(selectedValue);
    }, [selectedValue]);
    return (
        <View style={styles.container}>
            <View style={styles.componentcontainer}>
            <Text>メールアドレス</Text>
            <TextInput style={styles.textinputsmall}></TextInput>
            </View>
            <View style={styles.componentcontainer}>
            <Text>問い合わせ項目</Text>
            <TextInput style={styles.textinputsmall}></TextInput>
            </View>
            <Text>お問い合わせ内容</Text>
            <TextInput
                style={styles.textinput}
                onChangeText={(text) => console.log(text)}
                value={''}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    console.log('送信');
                }}
            >
                <Text style={styles.buttonText}>送信</Text>
            </TouchableOpacity>
            {/* <PickerIOS
                style={styles.pickerIOS}
                itemStyle={styles.picker}
                selectedValue={selectedValue ? selectedValue.value : items[0].value}
                onValueChange={(value) => setSelectedValue(items[value])}
                themeVariant='light'
            >
                {items.map((items, index) => (
                    <Picker.Item
                        key={index}
                        label={items.label}
                        value={items.value}
                    />
                ))}
            </PickerIOS> */}
        </View>
    );
};

export default InquiryForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    pickerIOS: {
        width: 200,
        // height: 50, // height increased
        // backgroundColor: '#FFFFFF',
    },
    picker: {
        // height: 50, // explicit height for each item
        backgroundColor: '#fff' // background color for each item
    },
    componentcontainer: {
        width: '100%',
        height: '10%',
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    textinputsmall: {
        width: '60%',
        height: '10%',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 5,
        padding: 10,
        margin: 10,
    },
    textinput: {
        // flex: 1,
        width: '60%',
        height: '30%',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 10,
        padding: 10,
        margin: 10,
    },
    button: {
        width: '60%',
        // height: '10%',
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#136FFF',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#136FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
