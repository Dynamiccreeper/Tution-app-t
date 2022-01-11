import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Header, Icon } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
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

export default class AddStudentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId: firebase.auth().currentUser.email,
      studentName: '',
      studentEmail: '',
      studentPassword: '',
    };
  }

  //Function to add student details in db
  addStudentDetails = (name, email, password) => {
    try {
      console.log(name + email +password)
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          console.log(user)
          alert('Student added successfully');
          Alert.alert('Student added successfully');
          db.collection('allStudents').add({
            teacherId: this.state.emailId,
            studentName: this.state.studentName,
            studentEmail: this.state.studentEmail,
            studentContact: "",
            image:"#",
          });
          this.props.navigation.navigate('StudentListScreen');
        })
        .catch((error) => {
          var errorcode = error.code;
          var errorM = error.message;
          console.log(errorM);
          alert(errorM);
        });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <SafeAreaProvider style={{ flex: 1, backgroundColor: '#F0F8FF' }}>
        <View style={{ flex: 1 }}>
          <Header
            centerComponent={{
              text: 'Students Details',
              style: {
                fontWeight: 'bold',
                fontSize: 16,
                color: '#fff',
              },
            }}
            leftComponent={
              <Icon
                name="arrow-left"
                type="feather"
                color="#ffffff"
                onPress={() => this.props.navigation.goBack()}></Icon>
            }
            backgroundColor={'#0092D8'}
          />
          <View
            style={{
              flex: 1,
              alignContent: 'center',
              justifyContent: 'center',
            }}>
              <View style={[styles.inputContainer, { marginTop: 50 }]}>
                <View style={styles.iconStyle}>
                  <AntDesign name={'user'} size={25} color="#0092D8" />
                </View>
                <TextInput
                  style={styles.textinput}
                  placeholder={'Name'}
                  onChangeText={(studentName) => {
                    this.setState({
                      studentName: studentName,
                    });
                  }}
                  value={this.state.studentName}
                />
              </View>
              <View style={[styles.inputContainer, { marginTop: 50 }]}>
                <View style={styles.iconStyle}>
                  <AntDesign name={'mail'} size={25} color="#0092D8" />
                </View>
                <TextInput
                  style={styles.textinput}
                  placeholder={'Email'}
                  onChangeText={(studentEmail) => {
                    this.setState({
                      studentEmail: studentEmail,
                    });
                  }}
                  value={this.state.studentEmail}
                />
              </View>

              <View style={[styles.inputContainer, { marginTop: 50 }]}>
                <View style={styles.iconStyle}>
                  <AntDesign name={'eye'} size={25} color="#0092D8" />
                </View>
                <TextInput
                  style={styles.textinput}
                  placeholder={'Password'}
                  onChangeText={(studentPassword) => {
                    this.setState({
                      studentPassword: studentPassword,
                    });
                  }}
                  value={this.state.studentPassword}
                />
              </View>
            <TouchableOpacity
              style={styles.updateButton}
              onPress={() => {
                if (
                  this.state.studentEmail === '' ||
                  this.state.studentPassword === '' ||
                  this.state.studentName === ''
                ) {
                  Alert.alert('Enter all details properly');
                  alert('Enter all details properly');
                } else {
                  this.addStudentDetails(
                    this.state.studentName,
                    this.state.studentEmail,
                    this.state.studentPassword
                  );
                }
              }}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  updateButton: {
    width: '60%',
    height: 50,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#00ADD8',
    borderRadius: 20,
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
    textinput: {
    marginTop: 5,
    marginBottom: 5,
    width: '80%',
    height: 50,
    borderColor: '#0092D8', 
    borderBottomWidth: 1.5,
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
  },
});
