import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  Dimensions,
  Button,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { Card, Header, Icon, Avatar } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Entypo,
  Fontisto,
  FontAwesome5,
  FontAwesome,
  Octicons,
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
} from '@expo/vector-icons';
import { Switch } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Modal from 'react-native-modal';
export default class ResponcesDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teacherId: this.props.navigation.getParam('itemDetails')['teacherId'],
      assignmentId:
        this.props.navigation.getParam('itemDetails')['assignmentId'],
      // assignmentTitle: this.props.navigation.getParam('itemDetails')['title'],
      description: this.props.navigation.getParam('itemDetails')['description'],
      image2: this.props.navigation.getParam('itemDetails')['image'],
      // date: this.props.navigation.getParam('itemDetails')['date'],
      modalVisible: false,
      studentId: this.props.navigation.getParam('itemDetails')['studentId'],
      responseId: this.props.navigation.getParam('itemDetails')['responseId'],
      subject: this.props.navigation.getParam('itemDetails')['subjectname'],
      teacherRemark: '',
      completed: this.props.navigation.getParam('itemDetails')['completed'],
      assignmentTitle: this.props.navigation.getParam('itemDetails')['assignmentTitle'],
    };
    console.log(this.props.navigation.getParam('itemDetails'));
  }
  showModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        isVisible={this.state.isModalVisible}
        backDropOpacity={0.4}>
        <View>
          <Card
            containerStyle={{
              width: 200,
              alignItems: 'center',
              justifyContent: 'center',
              alignContent: 'center',
              alignSelf: 'center',
            }}>
            <Avatar source={{ uri: this.state.image2 }} size={'large'} />
            <TouchableOpacity
              onPress={() => {
                this.setState({ isModalVisible: false });
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginTop: 10,
                  fontSize: 16,
                  textDecorationLine: 'underline',
                }}>
                CANCEL
              </Text>
            </TouchableOpacity>
          </Card>
        </View>
      </Modal>
    );
  };
  async addDetails() {
    if (
      this.state.description &&
      this.state.image2 &&
      this.state.studentId &&
      this.state.teacherId &&
      this.state.remark
    ) {
      console.log('submit pressed');
      try {
        var uniqueId = this.createUniqueId();
        console.log(uniqueId);
        var response = await fetch(this.state.image2);
        var blob = await response.blob();
        console.log(blob);
        var ref = firebase
          .storage()
          .ref()
          .child(
            'Responces/' +
              this.state.teacherId +
              '/' +
              this.state.assignmentId +
              '/' +
              this.state.studentId +
              '/' +
              uniqueId
          );
        ref
          .put(blob)
          .then((response) => {
            console.log('Hi');
            this.fetchImage(uniqueId);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert(
        'Error',
        'All fields are required!',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
    }
  }

  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }
  markResponse = (remark) => {
    try {
      if (remark == 'Complete') {
        db.collection('Responses').doc(this.state.responseId).update({
          completed: true,
          teacherRemark: this.state.teacherRemark,
        });
        this.props.navigation.goBack();
      } else {
        db.collection('Responses').doc(this.state.responseId).delete();
        db.storage()
          .ref()
          .child(
            'Responses/' +
              this.state.teacherId +
              '/' +
              this.state.assignmentId +
              '/' +
              this.state.studentId
          )
          .delete();
        this.props.navigation.goBack();
      }
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    return (
      <SafeAreaProvider style={{ flex: 1, backgroundColor: '#F0F8FF' }}>
        <Header
          centerComponent={{
            text: 'Responses Details',
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
          }}>
          {this.showModal()}
          <Text
            style={{
              marginTop: 10,
              fontSize: 16,
              padding: 5,
              fontWeight: 'bold',
            }}>
            Assignment Title: {this.state.assignmentTitle}
          </Text>
           <Text
            style={{
              marginTop: 10,
              fontSize: 14,
              padding: 5,
            }}>
            Check response below:
          </Text>
          
          <ScrollView style={{ flex: 1 }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 50,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                backgroundColor: 'white',
                padding: 10,
              }}>
              <Avatar
                source={{ uri: this.state.image2 }}
                size={'large'}
                onPress={() => {
                  this.setState({ isModalVisible: true });
                }}
                containerStyle={{ position: 'absolute', top: -20 }}
              />

              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 16,
                  padding: 10,
                  marginTop:50
                }}>
                StudentEmail: {this.state.studentId}
              </Text>
              <Text
                style={{
                  alignSelf: 'center',
                  padding: 10,
                  fontSize: 14,
                }}>
                Additional Comment: {this.state.description}
              </Text>

              {this.state.completed ? (
                <Text>Teacher Remark: {this.state.teacherRemark}</Text>
              ) : (
                <View>
                  <View style={{ marginHorizontal: 10 }}>
                    <TextInput
                      style={styles.inputFont}
                      onChangeText={(teacherRemark) =>
                        this.setState({ teacherRemark })
                      }
                      placeholder={'Remark'}
                      multiline={true}
                      numberOfLines={4}
                      placeholderTextColor={'black'}
                      value={this.state.teacherRemark}
                    />
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent:"space-between" }}>
                    <TouchableOpacity
                      style={styles.getStartedButton}
                      onPress={() => {
                        this.markResponse('Complete');
                      }}>
                      <Text style={styles.buttonText}>Complete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.getStartedButton}
                      onPress={() => {
                        this.markResponse('Redo');
                      }}>
                      <Text style={styles.buttonText}>Redo</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  updateButton: {
    width: '60%',
    height: 50,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#000',
    borderRadius: 20,
  },
  textinput: {
    marginTop: 5,
    marginBottom: 5,
    width: '80%',
    height: 50,
    borderColor: 'black',
    borderBottomWidth: 1.5,
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
  },
  inputFont: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    color: 'black',
    marginTop: 15,
  },
  submitButton: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  getStartedButton: {
    width: '40%',
    padding: 10,
    height: 40,
    marginTop: 20,
    marginBottom: 70,
 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00ADD8',
    borderRadius: 10,
  },
});
