import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const Verify = (props) => {
    const [code, setCode] = useState("");
    const navigation = useNavigation();
    const username = props.route.params.username;

    const verifyCode = async () => {
        try {
            await Auth.confirmSignUp(username, code);
            console.log("Code confirmed successfully.");
            navigation.navigate('SignIn');
        } catch (error) {
            console.log("Error confirming the code: ", error);
        }
    };

    const resendCode = async () => {
        try {
            await Auth.resendSignUp(username);
            console.log("Code resent successfully");
        } catch (error) {
            console.log("Error resending the code: ", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>We are verifying your account</Text>
            <Text style={styles.subtitle}>Enter the code sent to your email</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setCode(text)}
                value={code}
            />
            <TouchableOpacity style={styles.submit} onPress={verifyCode}>
                <Text style={styles.submitText}>Verify</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={resendCode}>
                <Text style={styles.resendCodeText}>Resend Code</Text>
            </TouchableOpacity>
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
        fontSize: 16,
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
});

export default Verify;
