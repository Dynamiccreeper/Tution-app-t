import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  FlatList,
  SafeAreaView,
  Image,
} from 'react-native';
import {
  Entypo,
  Fontisto,
  FontAwesome5,
  Octicons,
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
  FontAwesome,
} from '@expo/vector-icons';
import { Card, ListItem, Icon, Header } from 'react-native-elements';

import db from '../config';
import firebase from 'firebase';

import { Avatar } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
export default class SettingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId: firebase.auth().currentUser.email,
      name: '',
      docId: '',
      image: '',
    };
  }
  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate('Login');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  getUserDetails = () => {
    var email = this.state.emailId;
    db.collection('users')
      .where('email', '==', email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          console.log(doc.data());
          this.setState({
            name: data.name,
            image: data.image,
          });
        });
      });
  };

  componentDidMount() {
    this.getUserDetails();
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#F0F8FF' }}>
        <LinearGradient
          // Button Linear Gradient
          colors={['#0092D8', '#38b6ff']}
          start={{ x: -1, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            flex: 0.2,
            paddingTop: 25,
            justifyContent: 'center',
          }}>
          <View
            style={{
              paddingLeft: 5,
              flex: 1,
              flexDirection: 'row',
              alignContent: 'center',
            }}>
            <Image
              style={{
                width: 70,
                height: 70,
                margin: 10,
                borderColor: '#000000',
                borderWidth: 2,
                borderRadius: 35,
              }}
              source={{
                uri: this.state.image,
              }}
            />

            <View
              style={{
                marginTop: 20,
                alignItems: 'flex-start',
                padding: 10,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                {this.state.name}
              </Text>

              <Text
                style={{
                  color: 'white',
                  fontSize: 14,
                  marginTop: 5,
                }}>
                {this.state.emailId}
              </Text>
            </View>
          </View>
        </LinearGradient>

        <View style={{ flex: 0.7, padding: 10, backgroundColor: '#F0F8FF' }}>
          <View style={styles.ss}>
            <FontAwesome name={'user-circle-o'} size={24} color="#0092D8" />
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Profile');
              }}
              style={styles.sss}>
              <Text style={{ color: 'black', fontSize: 16 }}>
                Update Profile
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.ss}>
            <AntDesign name={'delete'} size={24} color="#0092D8" />
            <TouchableOpacity
              onPress={() => {
                db.collection('Assignment')
                  .where('teacherId', '==', this.state.emailId)
                  .onSnapshot((snapshot) => {
                    snapshot.docs.map((doc) => {
                      db.collection('Assignment').doc(doc.id).delete();
                    });
                  });
              }}
              style={styles.sss}>
              <Text style={{ color: 'black', fontSize: 16 }}>
                Delete all Assignments
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.ss}>
            <AntDesign name={'logout'} size={24} color="#0092D8" />
            <TouchableOpacity
              onPress={() => {
                this.logout();
              }}
              style={styles.sss}>
              <Text style={{ color: 'black', fontSize: 16 }}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{ flex: 0.1, padding: 10, backgroundColor: '#F0F8FF' }}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ss: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  sss: {
    height: 50,
    width: '100%',
    borderWidth: 1.5,
    borderColor: 'white',
    justifyContent: 'center',
    borderBottomColor: '#38b6ff',
    padding: 10,
  },
});
