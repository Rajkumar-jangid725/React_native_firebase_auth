import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import { app } from '../../config/firebaseConfig';
import validationSchema from '../../utils/authSchema';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signin = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const db = getFirestore(app);

  const handleSignin = async (values) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredentials.user;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        console.log('User data:', userDoc.data());
        await AsyncStorage.setItem('userEmail', values.email);
        await AsyncStorage.setItem('isGuest', 'false');
        router.push('/home');
      } else {
        console.log('No such Doc');
      }
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/invalid-credential') {
        Alert.alert(
          'Signin Failed!',
          'Incorrect credentials. Please try again.',
          [{ text: 'OK' }]
        );
      } else {
        Alert.alert(
          'Sign in Error',
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
              onSubmit={handleSignin}
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
                    <Text style={styles.submitText}>Sign In</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>

            <TouchableOpacity
              style={styles.linkContainer}
              onPress={() => router.push('/signup')}
            >
              <Text style={styles.linkText}>New User? </Text>
              <Text style={styles.linkCTA}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
        <StatusBar barStyle="light-content" backgroundColor="#2b2b2b" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signin;

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
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  linkText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  linkCTA: {
    color: '#f49b33',
    fontSize: 15,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
