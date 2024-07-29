import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform, TextInput, Image, TouchableOpacity } from 'react-native';
import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from "../FirebaseConfig/firebaseconfig";
import { AuthContext } from '../Context/AuthContext'; // Import AuthContext
import Icon from 'react-native-vector-icons/Ionicons'; // Import Icon
import logo from '../Img/logo.png';
import * as Location from 'expo-location'; // Import Location

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for password visibility
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // State for button disabled
  const [isLoggingIn, setIsLoggingIn] = useState(false); // State for logging in
  const { login } = useContext(AuthContext); // Get the login function from context

  useEffect(() => {
    // Enable the button only if both email and password are provided
    setIsButtonDisabled(!(email && password));
  }, [email, password]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }
  
    setIsLoggingIn(true); // Set logging in state to true
  
    // Get the user's current location
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Error', 'Permission to access location was denied.');
      setIsLoggingIn(false); // Set logging in state to false
      return;
    }
  
    let location = await Location.getCurrentPositionAsync({});
    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;
  
    try {
      const usersCollection = collection(db, 'users');
      const q = query(usersCollection, where('email', '==', email), where('password', '==', password));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        Alert.alert('Error', 'No user found with the provided email and password.');
        setIsLoggingIn(false); // Set logging in state to false
        return;
      }
  
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      if (userData.status === 'Verified') {
        // Include latitude and longitude in userData
        login({ ...userData, latitude, longitude });
  
        Alert.alert('Success', 'Login successful');
  
        setEmail('');
        setPassword('');
        navigation.navigate('Dashboard');
      } else {
        Alert.alert('Error', 'User status is not Verified.');
      }
    } catch (error) {
      Alert.alert('Error', 'There was an error logging in.');
      console.error("Error logging in: ", error);
    } finally {
      setIsLoggingIn(false); // Ensure to set logging in state to false
    }
  };
  

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={60}
    >
      <View style={styles.contentContainer}>
        <Image source={logo} style={styles.logo} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Icon name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} color="gray" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.button, isButtonDisabled && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={isButtonDisabled || isLoggingIn}
        >
          <Text style={styles.buttonText}>
            {isLoggingIn ? 'Logging in...' : 'Login'}
          </Text>
        </TouchableOpacity>
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>Register here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 155,
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    bottom: 27,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#a9a9a9',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    fontSize: 16,
    color: '#333',
  },
  registerLink: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
