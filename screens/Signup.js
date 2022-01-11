import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';
import { Image } from 'react-native';
import {
  Entypo,
  Fontisto,
  FontAwesome5,
  Octicons,
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
} from '@expo/vector-icons';
import firebase from 'firebase';
import { LinearGradient } from 'expo-linear-gradient';

import db from '../config';

export default class SignUp extends React.Component {
  // declared constructor for initialising states
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      firstName: '',
      contact: '',
      address: '',
      confirmPassword: '',
    };
  }

  // function called onPress of SignUp button for registering user with firebase
  signUp = (email, password, confirmPassword) => {
    //checking if the password and confirm password are matching
    if (password != confirmPassword) {
      alert("Passwords don't match");
      Alert.alert("Passwords don't match");
    } else {
      //calling firebase signUp function
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          db.collection('users').add({
            name: this.state.firstName,
            contact: this.state.contact,
            email: this.state.email,
            address: this.state.address,
            image:"#"
          });
          alert('User added successfully');
          Alert.alert('User added successfully');
          this.props.navigation.navigate('Login');
        })
        .catch((error) => {
          var errorcode = error.code;
          var errorM = error.message;
          console.log(errorM);
        });
    }
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <ImageBackground
          source={require('../assets/back2.png')}
          style={styles.image}>
          <Image
            style={{ alignSelf: 'center', width: '70%', height: 200 }}
            source={require('../assets/i7.png')}
          />
          <ScrollView style={{ width: '100%' }}>
            <KeyboardAvoidingView
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={[styles.inputContainer, { marginTop: 50 }]}>
                <View style={styles.iconStyle}>
                  <AntDesign name={'user'} size={25} color="#0092D8" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder={'Name'}
                  onChangeText={(text) => {
                    this.setState({
                      firstName: text,
                    });
                  }}
                  value={this.state.firstName}
                />
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.iconStyle}>
                  <MaterialCommunityIcons
                    name={'phone'}
                    size={25}
                    color="#0092D8"
                  />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder={'Contact'}
                  maxLength={10}
                  keyboardType={'numeric'}
                  onChangeText={(text) => {
                    this.setState({
                      contact: text,
                    });
                  }}
                  value={this.state.contact}
                />
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.iconStyle}>
                  <Entypo name={'home'} size={25} color="#0092D8" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder={'Address'}
                  multiline={true}
                  numberOfLines={2}
                  onChangeText={(text) => {
                    this.setState({
                      address: text,
                    });
                  }}
                  value={this.state.address}
                />
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.iconStyle}>
                  <Entypo name={'mail'} size={25} color="#0092D8" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder={'Email Id'}
                  keyboardType={'email-address'}
                  onChangeText={(text) => {
                    this.setState({
                      email: text,
                    });
                  }}
                  value={this.state.email}
                />
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.iconStyle}>
                  <AntDesign name={'eye'} size={25} color="#0092D8" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder={'Password'}
                  secureTextEntry={true}
                  onChangeText={(text) => {
                    this.setState({
                      password: text,
                    });
                  }}
                  value={this.state.password}
                />
              </View>
              <View style={[styles.inputContainer, { marginBottom: 20 }]}>
                <View style={styles.iconStyle}>
                  <AntDesign name={'eyeo'} size={25} color="#0092D8" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder={'Confirm Password'}
                  secureTextEntry={true}
                  onChangeText={(text) => {
                    this.setState({
                      confirmPassword: text,
                    });
                  }}
                  value={this.state.confirmPassword}
                />
              </View>
              <LinearGradient
                // Button Linear Gradient
                colors={['#0092D8', '#38b6ff']}
                start={{ x: -5, y: -1 }}
                end={{ x: 5, y: 1 }}
                style={styles.signUpButton}>
                <TouchableOpacity
                style={{    

                    width: '80%',
                    height: 50,
                    marginTop: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    marginBottom:30
              }}
                  onPress={() => {
                    this.signUp(
                      this.state.email,
                      this.state.password,
                      this.state.confirmPassword
                    );
                  }}>
                  <Text style={styles.buttonText}>Sign up</Text>
                </TouchableOpacity>
              </LinearGradient>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Login')}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 16,
                    marginTop: 10,
                    marginBottom: 20,
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity> 
            </KeyboardAvoidingView>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  signUpButton: {
    width: '80%',
    height: 50,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,

  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '85%',
    height: 50,
    borderColor: '#38b6ff',
    borderRadius: 10,
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  iconStyle: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#38b6ff',
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 5,
    fontSize: 16,
    color: '#333',
  },
});
