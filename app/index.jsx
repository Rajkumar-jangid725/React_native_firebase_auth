import React from 'react';
import { useRouter } from 'expo-router';
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.signUpButton} onPress={() => router.push('/signup')}>
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>

          </View>

          <TouchableOpacity style={styles.signInLink} onPress={() => router.push('/signin')}>
            <Text style={styles.signInText}>Already a User? </Text>
            <Text style={styles.signInUnderline}>Sign in</Text>
          </TouchableOpacity>
        </View>

        <StatusBar barStyle="light-content" backgroundColor="#2b2b2b" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2b2b2b',
  },
  scrollContent: {
    minHeight: '100%',
  },
  container: {
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  buttonGroup: {
    width: '75%',
  },
  signUpButton: {
    backgroundColor: '#f49b33',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  signUpText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  guestButton: {
    borderColor: '#f49b33',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
  },
  guestText: {
    color: '#f49b33',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  line: {
    height: 2,
    backgroundColor: '#f49b33',
    width: 50,
  },
  orText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 8,
  },
  signInLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  signInText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  signInUnderline: {
    color: '#f49b33',
    fontWeight: '600',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  imageContainer: {
    flex: 1,
  },
  entryImage: {
    width: '100%',
    height: 300,
  },
});
