import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import ThemeTextInput from './ThemeTextInput';
import ThemeButton from './ThemeButton';
import { Feather } from '@expo/vector-icons';
import getThemeContext from '../../context/ThemeContext';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import axios from 'axios';
import { getAppContext } from '../../context/AppContext';

const RegisterContainer = ({ setOverlayOpen, setLoginEmail, setLoginPassword }) => {
    const { theme } = getThemeContext();
    const { SERVER_URL } = getAppContext();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [retypePassword, setRetypePassword] = useState('');
    const [showRetypePassword, setShowRetypePassword] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (email === '' || username === '' || password === '' || retypePassword === '') {
            setError('Please fill all required fields');
            return;
        }

        if (password !== retypePassword) {
            setError('Passwords do not match');
            return;
        }

        const data = {
            email,
            username,
            firstName,
            lastName,
            phone,
            password,
        };

        setLoading(true);

        try {
            const response = await axios.post(`${SERVER_URL}/api/v1/users`, data);
            if (response) {
                setLoginEmail(email);
                setLoginPassword(password);
                setOverlayOpen(false);
            }
            setLoading(false);
        } catch (error) {
            if (String(error.response.data.error).startsWith('E11000')) {
                setError('Username or email already exists');
            } else {
                setError(error.response.data.message || error.response.data.error || error.message);
            }
            setLoading(false);
        }
    };

    useEffect(() => {
        if (password !== retypePassword) {
            setError('Passwords do not match');
        } else {
            setError(null);
        }
    }, [password, retypePassword]);

    const styles = StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            width: Dimensions.get('window').width * 0.9,
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: theme.colors.surface,
            borderRadius: 10,
        },
        hint: {
            color: theme.colors.text,
            fontSize: 12,
            alignSelf: 'flex-start',
            marginLeft: 10,
            marginBottom: 10,
        },
        error: {
            color: theme.colors.error,
            fontSize: 12,
            alignSelf: 'flex-start',
            marginLeft: 10,
            marginBottom: 10,
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
        },
        scrollContainer: {
            width: '100%',
            paddingBottom: 20,
        },
        title: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 10,
            marginTop: 10,
            color: theme.colors.text,
        },
    });

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Register</Text>
                <Feather name="x" size={24} color={theme.colors.icon} onPress={() => setOverlayOpen(false)} />
            </View>
            <ScrollView style={styles.scrollContainer}>
                <ThemeTextInput
                    title="Email*"
                    placeholder="Email"
                    value={email}
                    onChange={(text) => setEmail(text)}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                />
                <ThemeTextInput
                    title="Username*"
                    placeholder="Username"
                    value={username}
                    onChange={(text) => setUsername(text)}
                    textContentType="username"
                />
                <ThemeTextInput
                    title="First Name"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(text) => setFirstName(text)}
                    textContentType="givenName"
                />
                <ThemeTextInput
                    title="Last Name"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(text) => setLastName(text)}
                    textContentType="familyName"
                />
                <ThemeTextInput
                    title="Phone"
                    keyboardType="phone-pad"
                    placeholder="Phone"
                    value={phone}
                    onChange={(text) => setPhone(text)}
                    textContentType="telephoneNumber"
                />
                <ThemeTextInput
                    title="Password*"
                    placeholder="Password"
                    value={password}
                    onChange={(text) => setPassword(text)}
                    icon={<Feather name={showPassword ? 'eye-off' : 'eye'} size={24} color={theme.colors.icon} />}
                    onPressIcon={() => setShowPassword(!showPassword)}
                    secureTextEntry={!showPassword}
                    textContentType="newPassword"
                />
                <ThemeTextInput
                    title="Retype Password*"
                    placeholder="Retype Password"
                    value={retypePassword}
                    onChange={(text) => setRetypePassword(text)}
                    icon={<Feather name={showPassword ? 'eye-off' : 'eye'} size={24} color={theme.colors.icon} />}
                    onPressIcon={() => setShowRetypePassword(!showRetypePassword)}
                    secureTextEntry={!showRetypePassword}
                    textContentType="newPassword"
                />
                <Text style={styles.hint}>* Required</Text>
                {error ? (
                    <Animated.Text entering={FadeInUp} exiting={FadeOutUp} style={styles.error}>
                        {error}
                    </Animated.Text>
                ) : null}
                <ThemeButton title={!loading && 'Register'} onPress={handleRegister}>
                    {loading && <ActivityIndicator color={theme.colors.buttonText} />}
                </ThemeButton>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default RegisterContainer;
