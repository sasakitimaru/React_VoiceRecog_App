import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const Verify = (props) => {
    const [code, setCode] = useState("");
    const navigation = useNavigation();
    const [warningText, setWarningText] = useState(null);
    const username = props.route.params.username;
    const password = props.route.params.password;
    const [resendmessage, setResendmessage] = useState(null);
    console.log('props : ', props.route.params.username)
    const MoveToLogin = () => {
        try {
            navigation.navigate('SignUp');
        } catch (error) {
            console.log('this page currently does not work')
        }
    }

    const verifyCode = async () => {
        try {
            await Auth.confirmSignUp(username, code);
            console.log("Code confirmed successfully.");
            await Auth.signIn(username, password);
            navigation.navigate('Home');
        } catch (error) {
            console.log("Error confirming the code: ", error);
            setWarningText(error.message);
        }
    };

    const resendCode = async () => {
        try {
            await Auth.resendSignUp(username);
            console.log("Code resent successfully");
            setResendmessage("認証コードを再送しました");
        } catch (error) {
            console.log("Error resending the code: ", error);
            setWarningText(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={MoveToLogin}>
                <Text style={{ color: 'blue' , paddingBottom: 10 }}>Sign up</Text>
            </TouchableOpacity>
            <Text style={styles.title}>アカウント認証</Text>
            <Text style={styles.subtitle}>メールアドレスに送られたコードを入力してください</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setCode(text)}
                value={code}
            />
            <TouchableOpacity style={styles.submit} onPress={verifyCode}>
                <Text style={styles.submitText}>Verify</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={resendCode}>
                <Text style={styles.resendCodeText}> 認証コードを再送する</Text>
            </TouchableOpacity>
            {(resendmessage !== null) &&
                <Text style={styles.resendMessage}>{resendmessage}</Text>
            }
            {(warningText !== null) && (
                <Text style={styles.createAccountWarning}>{warningText}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 14,
        textAlign: "center",
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: "100%",
        marginBottom: 15,
    },
    submit: {
        backgroundColor: "#007BFF",
        borderRadius: 5,
        padding: 10,
        alignItems: "center",
        width: "100%",
    },
    submitText: {
        color: "#FFF",
        fontWeight: "bold",
    },
    resendCodeText: {
        color: "#007BFF",
        marginTop: 10,
    },
    createAccountWarning: {
        color: 'red',
        fontSize: 14,
        marginTop: 5,
    },
    resendMessage: {
        fontSize: 14,
        marginTop: 5,
    },
});

export default Verify;
