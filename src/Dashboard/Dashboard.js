import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { AuthContext } from '../Context/AuthContext'; 

const Dashboard = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);


  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome, {user.name}!!!</Text>
        <View style={styles.locationContainer}>
          <Text style={styles.welcomeText}>Your Location:</Text>
          <Text style={styles.welcomeText}>Latitude: {user.latitude}</Text>
          <Text style={styles.welcomeText}>Longitude: {user.longitude}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          logout();
          navigation.navigate('Login'); 
        }}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
      
      {/* Other components or buttons can be placed here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  header: {
    flexDirection: 'column', // Arrange items vertically
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10, // Add spacing between lines
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
  locationContainer: {
    alignItems: 'center', // Center align the location texts
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Dashboard;
