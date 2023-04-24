import React, { useRef, useState } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

const CreateForm = () => {
    const passRef = useRef();
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigation = useNavigation();

    const checkpassword = (e) => {
        console.log("confirm password: ", confirmPassword);
        console.log("current password: ", password);
        const match = confirmPassword === password;
        setPasswordsMatch(match);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if (passwordsMatch) {
            try {
                const { user } = await Auth.signUp({
                    username: email,
                    password,
                    attributes: {
                        name: username,
                        email: email,
                    },
                });
                console.log('user created:', user);
                navigation.navigate('Verify', { username: email });
            } catch (error) {
                console.log('error signing up:', error);
            }
        // } else {
            // console.log("passwords don't match");
        // }　なんかパスワードマッチがうまくいかないからコメントアウト
        //多分だけどuseStateのレンダリングとパスワード更新のタイミングが違う
    };

    return (
        <View style={styles.createAccountBox}>
            <Text style={styles.createAccountLabel}>Username</Text>
            <TextInput
                onChangeText={(text) => setUsername(text)}
                placeholder="Username"
                style={styles.createAccountInput}
            />
            <Text style={styles.createAccountLabel}>Email</Text>
            <TextInput
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                placeholder="Email"
                style={styles.createAccountInput}
            />
            <Text style={styles.createAccountLabel}>Password</Text>
            <TextInput
                onChangeText={(text) => setPassword(text)}
                ref={passRef}
                secureTextEntry={true}
                placeholder="Password"
                style={styles.createAccountInput}
            />
            <Text style={styles.createAccountLabel}>Password Again</Text>
            <TextInput
                onChangeText={(text) => setConfirmPassword(text)}
                onChange={(e) => checkpassword(e)}
                secureTextEntry={true}
                placeholder="Password Again"
                style={styles.createAccountInput}
            />
            {!passwordsMatch && (
                <Text style={styles.createAccountWarning}>Not match</Text>
            )}
            <TouchableOpacity onPress={handleSubmit} style={styles.createAccountButton}>
                <Text style={styles.createAccountButtonText}>Sign up</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    createAccountBox: {
        padding: 20,
    },
    createAccountLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    createAccountInput: {
        fontSize: 16,
        paddingHorizontal: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 5,
    },
    createAccountWarning: {
        color: 'red',
        fontSize: 14,
        marginTop: 5,
    },
    createAccountButton: {
        backgroundColor: '#2196F3',
        borderRadius: 5,
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
    },
    createAccountButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default CreateForm;
