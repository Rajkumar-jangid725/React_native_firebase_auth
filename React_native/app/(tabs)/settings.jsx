import { useEffect } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useGlobalState } from '../../context/GlobalState';

export default function Settings() {
    const {
        incrementClick,
        resetClick,
        screenClicks,
        setCurrentScreen,
        developerName
    } = useGlobalState();

    useEffect(() => {
        setCurrentScreen('/(tabs)/settings');
    }, []);

    return (
        <>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <Text style={styles.title}>Settings Screen</Text>
                    <Text style={styles.clicks}>Clicks: {screenClicks['/(tabs)/settings'] || 0}</Text>

                    <View style={{ marginTop: 16 }}>
                        <Button title="Click Me" onPress={() => incrementClick('/(tabs)/settings')} />
                    </View>

                    <View style={{ marginTop: 12 }}>
                        <Button title="Reset" onPress={() => resetClick('/(tabs)/settings')} />
                    </View>

                    <View style={{ marginTop: 24 }}>
                        <Text style={styles.paragraph}>
                            Customize your experience in the app from this Settings screen. You can update preferences, enable features,
                            or explore advanced configurations to suit your needs.
                        </Text>
                        <Text style={styles.paragraph}>
                            In future versions, this section may include options like notifications, themes, privacy settings, and more.
                            Currently, this page demonstrates persistent state tracking and UI composition.
                        </Text>
                        <Text style={styles.paragraph}>
                            Your actions here help verify the global state updates and scroll behavior across different content heights.
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