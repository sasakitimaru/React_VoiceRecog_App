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
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const ref = useRef();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const [warningText, setWarningText] = useState('');

    const checkpassword = (e: any) => {
        console.log("confirm password: ", e);
        console.log("current password: ", password);
        const match = e === password;
        setPasswordsMatch(match);
    };

    const handleSubmit = async (e: any) => {
        if(passwordsMatch) {
            e.preventDefault();
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
                setWarningText(error.message);
            };
        } else {
            setWarningText('パスワードが一致しません');
        }
    };

    return (
        <View style={styles.createAccountBox}>
            <Text style={styles.createAccountLabel}>ニックネーム</Text>
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
                secureTextEntry={true}
                placeholder="Password"
                style={styles.createAccountInput}
            />
            <Text style={styles.createAccountLabel}>Password(確認)</Text>
            <TextInput
                onChangeText={(text) => checkpassword(text)}
                // onChange={(e) => checkpassword(e)}
                secureTextEntry={true}
                placeholder="Password Again"
                style={styles.createAccountInput}
            />
            {(warningText !== null) && (
                <Text style={styles.createAccountWarning}>{warningText}</Text>
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
