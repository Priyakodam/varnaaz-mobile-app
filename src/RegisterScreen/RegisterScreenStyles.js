import { StyleSheet } from 'react-native';


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
      marginBottom: 20,
      marginTop: 15,
  
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
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
    button: {
      width: '100%',
      height: 50,
      backgroundColor: '#007BFF',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    loginContainer: {
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    loginText: {
      fontSize: 16,
      color: '#333',
    },
    loginLink: {
      fontSize: 16,
      color: '#007BFF',
      fontWeight: 'bold',
    },
  });
export default styles;
