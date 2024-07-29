// components/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform, TextInput, Image, TouchableOpacity } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { db } from "../FirebaseConfig/firebaseconfig";
import logo from '../Img/logo.png'; 
import styles from './RegisterScreenStyles';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [projectAssigned, setProjectAssigned] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!name || !role || !projectAssigned || !email || !phoneNumber || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      await addDoc(collection(db, 'users'), {
        name,
        role,
        projectAssigned,
        email,
        phoneNumber,
        password,
        status: 'Not Verified',
      });
      Alert.alert('Success', 'you have registered successfully!!!');
      setName('');
      setRole('');
      setProjectAssigned('');
      setEmail('');
      setPhoneNumber('');
      setPassword('');
    } catch (error) {
      Alert.alert('Error', 'There was an error registering the user.');
      console.error("Error adding document: ", error);
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
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Role"
          value={role}
          onChangeText={setRole}
        />
        <TextInput
          style={styles.input}
          placeholder="Project Assigned"
          value={projectAssigned}
          onChangeText={setProjectAssigned}
        />
          <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Login here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};



export default RegisterScreen;
