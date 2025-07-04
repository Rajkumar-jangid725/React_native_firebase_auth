import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { getAuth, signOut } from 'firebase/auth';

export default function Profile() {
  const router = useRouter();
  const auth = getAuth();
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const fetchUserEmail = async () => {
      const email = await AsyncStorage.getItem('userEmail');
      setUserEmail(email);
    };

    fetchUserEmail();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem('userEmail');
      setUserEmail(null);

      Alert.alert('Logged out', 'You have been logged out successfully.');
      router.push('/signin');
    } catch (error) {
      Alert.alert('Logout Error', 'Error while logging out');
    }
  };

  const handleSignup = () => {
    router.push('/signup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>

      {userEmail ? (
        <>
          <Text style={styles.email}>Email: {userEmail}</Text>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b2b2b',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginTop: 24
  },
  title: {
    fontSize: 22,
    color: '#f49b33',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  email: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#f49b33',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
