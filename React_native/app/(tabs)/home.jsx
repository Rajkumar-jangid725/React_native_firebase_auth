import { useEffect } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useGlobalState } from '../../context/GlobalState';

export default function Home() {
    const {
        incrementClick,
        resetClick,
        screenClicks,
        setCurrentScreen,
        developerName
    } = useGlobalState();

    useEffect(() => {
        setCurrentScreen('/(tabs)/home');
    }, []);

    const sendUserDetails = async () => {
        try {
            const response = await fetch('http:// 192.168.94.217:5000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: 'Test',
                    email: 'Raj@gmt.com',
                    age: 25
                })
            });

            const data = await response.json();
            console.log('API response:', data);

            Alert.alert('User Saved', JSON.stringify(data));
        } catch (error) {
            console.error('Error sending user details:', error);
            Alert.alert('Error', 'Failed to send user details.');
        }
    };

    return (
        <>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <Text style={styles.title}>Home Screen</Text>
                    <Text style={styles.clicks}>Clicks: {screenClicks['/(tabs)/home'] || 0}</Text>

                    <View style={{ marginTop: 16 }}>
                        <Button title="Click Me" onPress={() => incrementClick('/(tabs)/home')} />
                    </View>

                    <View style={{ marginTop: 12 }}>
                        <Button title="Reset" onPress={() => resetClick('/(tabs)/home')} />
                    </View>

                    <View style={{ marginTop: 16 }}>
                        <Button title="Send User Details" onPress={sendUserDetails} />
                    </View>

                    <View style={{ marginTop: 24 }}>
                        <Text style={styles.paragraph}>
                            Welcome to the Home Screen! This is your starting point where you can explore different parts of the app. Use the tabs to navigate.
                        </Text>
                        <Text style={styles.paragraph}>
                            Here you can track how many times you've clicked the button. Every screen tracks its clicks separately thanks to global state.
                        </Text>
                        <Text style={styles.paragraph}>
                            This ScrollView ensures content fits nicely on all screen sizes—even when there's more text or dynamic content in the future.
                        </Text>
                    </View>
                    <Text style={{ marginTop: 24, fontSize: 14, color: 'gray' }}>
                        Page developed by: <Text style={{ color: 'green', fontWeight: 'bold' }}>{developerName}</Text>
                    </Text>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        paddingBottom: 100,
        marginTop: 24
    },
    container: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    clicks: {
        fontSize: 18,
        marginVertical: 10,
    },
    paragraph: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 16,
        lineHeight: 22,
    },
});