import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import { app } from '../../config/firebaseConfig';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import validationSchema from '../../utils/authSchema';

const Signup = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const db = getFirestore(app);

  const handleSignup = async (values) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredentials.user;

      await setDoc(doc(db, 'users', user.uid), {
        email: values.email,
        createdAt: new Date(),
      });

      await AsyncStorage.setItem('userEmail', values.email);
      await AsyncStorage.setItem('isGuest', 'false');

      router.push('/home');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert(
          'Signup Failed!',
          'This email address is already in use. Please use a different email.',
          [{ text: 'OK' }]
        );
      } else {
        Alert.alert(
          'Signup Error',
          'An unexpected error occurred. Please try again later.',
          [{ text: 'OK' }]
        );
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Text style={styles.heading}>Let's get you started</Text>

          <View style={styles.formContainer}>
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSignup}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="email-address"
                    onChangeText={handleChange('email')}
                    value={values.email}
                    onBlur={handleBlur('email')}
                    placeholder="Enter your email"
                    placeholderTextColor="#ccc"
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.error}>{errors.email}</Text>
                  )}

                  <Text style={styles.label}>Password</Text>
                  <TextInput
                    style={styles.input}
                    secureTextEntry
                    onChangeText={handleChange('password')}
                    value={values.password}
                    onBlur={handleBlur('password')}
                    placeholder="Enter your password"
                    placeholderTextColor="#ccc"
                  />
                  {touched.password && errors.password && (
                    <Text style={styles.error}>{errors.password}</Text>
                  )}

                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.submitButton}
                  >
                    <Text style={styles.submitText}>Sign Up</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>

            <TouchableOpacity
              style={styles.signinLink}
              onPress={() => router.push('/signin')}
            >
              <Text style={styles.signinText}>Already a User? </Text>
              <Text style={styles.signinLinkText}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
        <StatusBar barStyle="light-content" backgroundColor="#2b2b2b" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2b2b2b',
  },
  scrollContent: {
    minHeight: '100%',
  },
  container: {
    margin: 16,
    alignItems: 'center',
  },
  heading: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  formContainer: {
    width: '85%',
  },
  label: {
    color: '#f49b33',
    marginBottom: 6,
    marginTop: 16,
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    height: 42,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 12,
    color: '#fff',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: '#f49b33',
    marginTop: 24,
    padding: 12,
    borderRadius: 8,
  },
  submitText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signinLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  signinText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  signinLinkText: {
    color: '#f49b33',
    fontSize: 15,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
