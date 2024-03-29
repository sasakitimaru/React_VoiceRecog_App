import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Keyboard, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Iconify } from 'react-native-iconify';
import { API, graphqlOperation } from 'aws-amplify';
import { createInquiryForm } from '../../../../src/graphql/mutations';

type items = {
    label: string;
    value: string;
};
const InquiryForm = () => {
    const [isSendMessage, setIsSendMessage] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [item, setItem] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Iconify
                        icon="material-symbols:arrow-back-ios-new"
                        size={30}
                        color="#000000"
                        style={{ marginLeft: 10 }}
                    />
                </TouchableOpacity>
            ),
            headerTitle: '問い合わせフォーム',
        });
    }, []);

    const handleInquiryForm = async () => {
        if (!email || !item || !content) {
            Alert.alert('email,問い合わせ項目,お問い合わせ内容は必須です');
            return;
        }
        const Data = {
            email: email,
            item: item,
            message: content,
        };
        try {
            API.graphql(
                graphqlOperation(createInquiryForm, { input: Data })
            );
            setIsSendMessage(true);
            setTimeout(() => {
                navigation.goBack();
            }
            , 1000);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            {/* <View style={styles.container}> */}
                <View style={styles.formcontainer}>
                    <View style={styles.componentcontainer}>
                        <Text>メールアドレス</Text>
                        <TextInput
                            style={styles.textinputsmall}
                            // placeholder='XXX@example.com'
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                        />
                    </View>
                    <View style={styles.componentcontainer}>
                        <Text>問い合わせ項目</Text>
                        <TextInput
                            style={styles.textinputsmall}
                            onChangeText={(text) => setItem(text)}
                            value={item}
                        />
                    </View>
                    <View style={styles.formcomponentcontainer}>
                        <Text>お問い合わせ内容</Text>
                        <TextInput
                            style={styles.textinput}
                            scrollEnabled={true}
                            onChangeText={(text) => setContent(text)}
                            multiline={true}
                            blurOnSubmit={true}
                            textAlignVertical='top'
                            maxLength={400}
                            value={content}
                            returnKeyLabel='確定'
                            returnKeyType='done'
                            onSubmitEditing={() => {
                                Keyboard.dismiss();
                            }
                            }
                        />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                handleInquiryForm();
                            }}
                            disabled={isSendMessage}
                        >
                            {!isSendMessage ?
                                <Text style={styles.buttonText}>送信</Text>
                                :
                                <Iconify icon="material-symbols:check-circle-rounded" size={30} color="#136FFF" />
                                // <Text style={styles.buttonText}>送信</Text>
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            {/* </View> */}
        </KeyboardAvoidingView>
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
    formcontainer: {
        width: '100%',
        // height: '100%',
        flexDirection: 'column',
    },
    componentcontainer: {
        width: '100%',
        // height: '10%',
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#FFFFFF',
    },
    textinputsmall: {
        width: '60%',
        // height: '20%',
        // backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 5,
        padding: 10,
        margin: 10,
    },
    textinput: {
        // flex: 1,
        width: '60%',
        height: '100%',
        // backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 10,
        padding: 10,
        margin: 10,
    },
    button: {
        width: '60%',
        // height: '100%',
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
    formcomponentcontainer: {
        width: '100%',
        height: '40%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20%'
    },
});
