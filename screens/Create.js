import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';

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
import * as Font from 'expo-font';
import firebase from 'firebase';
import { Avatar, Header, Icon } from 'react-native-elements';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Modal from 'react-native-modal';
import db from '../config';
export default class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      subject: '',
      description: '',
      cameraPermissions: '',
      modalVisible: false,
      image:
        'https://pixselo.com/testimonial/neo-systek/dummy-placeholder-image-400x400/',

      teacherId: firebase.auth().currentUser.email,
      assignmentId: '',
    };
    console.log(this.state.teacherId);
  }
  takePhotoFromCamera = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      cameraPermissions: status === 'granted',
    });
    if (this.state.cameraPermissions) {
      await ImagePicker.launchCameraAsync({
        compressImageMaxWidth: 290,
        compressImageMaxHeight: 290,
        cropping: true,
        compressImageQuality: 0.9,
      }).then((image) => {
        this.setState({ image: image.uri });
        console.log('Worked' + this.state.image);
        this.setState({
          modalVisible: false,
        });
      });
    } else {
      return alert('Permissions Not Granted').then(() => {
        this.setState({
          modalVisible: false,
        });
      });
    }
  };

  selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    this.setState({
      modalVisible: false,
    });
    if (!cancelled) {
      this.setState({ image: uri });
      console.log('Worked' + this.state.image);
      this.setState({
        modalVisible: false,
      });
    }
  };

  fetchImage = (uniqueId) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child('Assignment/' + this.state.teacherId + '/' + uniqueId);
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
        db.collection('Assignment').add({
          title: this.state.title,
          description: this.state.description,
          subjectName: this.state.subject,
          image: url,
          teacherId: this.state.teacherId,
          assignmentId: uniqueId,
        });
        console.log('Successful');
        Alert.alert('Successful');
        this.setState({
          subject: '',
          image: '#',
          title: '',
          description: '',
        });
        this.props.navigation.goBack();
      })
      .catch((error) => {
        console.log('error' + error);
        Alert.alert('Something went wrong in media uplaod, try again');
        this.setState({
          image:
            'https://pixselo.com/testimonial/neo-systek/dummy-placeholder-image-400x400/',
        });
      });
  };

  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }
  async addDetails() {
    if (
      this.state.title &&
      this.state.description &&
      this.state.subject &&
      this.state.image &&
      this.state.teacherId
    ) {
      console.log('submit pressed');
      try {
        var uniqueId = this.createUniqueId();
        console.log(uniqueId);
        var response = await fetch(this.state.image);
        var blob = await response.blob();
        console.log(blob);
        var ref = firebase
          .storage()
          .ref()
          .child('Assignment/' + this.state.teacherId + '/' + uniqueId);
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

  render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{
            text: 'Add Assignement',
            style: { color: '#fff',fontSize:16 },
          }}
          containerStyle={{
            backgroundColor: '#0092D8',
          }}
          leftComponent={
            <Icon
              name="arrow-left"
              type="feather"
              color="#ffffff"
              onPress={() => this.props.navigation.goBack()}></Icon>
          }
        />

        <View>
          <Modal
            style={styles.modalView}
            isVisible={this.state.modalVisible}
            backdropOpacity={0.4}
            deviceWidth={Dimensions.get('window').width}
            deviceHeight={Dimensions.get('window').height}
            onBackdropPress={() => this.setState({ modalVisible: false })}>
            <View style={styles.modalMainView}>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: -13,
                  right: -10,
                  margin: 10,
                  padding: 10,
                }}
                onPress={() => this.setState({ modalVisible: false })}>
                <MaterialIcons
                  name="cancel"
                  size={24}
                  color="#2460a7ff"
                  onPress={() => this.setState({ modalVisible: false })}
                />
              </TouchableOpacity>
              <Text style={{ textAlign: 'center', margin: 5, padding: 5 }}>
                Choose An Option
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.takePhotoFromCamera();
                  }}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                  }}>
                  <Feather
                    name="camera"
                    size={24}
                    color="#2460a7ff"
                    onPress={() => this.setState({ modalVisible: false })}
                  />
                  <Text style={{ textAlign: 'center' }}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.selectPicture();
                  }}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                  }}>
                  <FontAwesome
                    name="photo"
                    size={24}
                    color="#2460a7ff"
                    onPress={() => this.setState({ modalVisible: false })}
                  />
                  <Text style={{ textAlign: 'center' }}>Photos</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.fieldsContainer}>
          <ScrollView>
            <Avatar
              size="medium"
              source={{
                uri: this.state.image,
              }}
              onPress={() => {
                this.setState({ modalVisible: true });
              }}
              containerStyle={{ alignSelf: 'center', margin: 20 }}
            />

            <View style={{ marginHorizontal: 10 }}>
              <TextInput
                style={styles.inputFont}
                onChangeText={(title) => this.setState({ title })}
                placeholder={'Title'}
                placeholderTextColor={'black'}
                value={this.state.title}
              />
              <TextInput
                style={[styles.inputFont, { height: 100 }]}
                onChangeText={(description) => this.setState({ description })}
                placeholder={'Description'}
                multiline={true}
                numberOfLines={4}
                placeholderTextColor={'black'}
                value={this.state.description}
              />
              <TextInput
                style={styles.inputFont}
                onChangeText={(subject) => this.setState({ subject })}
                placeholder={'Subject'}
                multiline={true}
                numberOfLines={20}
                placeholderTextColor={'black'}
                value={this.state.subject}
              />
            </View>
            <View style={styles.submitButton}>
              <Button
                onPress={() => this.addDetails()}
                title="Submit"
                color="#2460a7ff"
              />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
  },

  fieldsContainer: {
    flex: 1,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    padding: 10,
    margin: 10,
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
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    alignSelf: 'center',
    borderColor: '#bbbb',
    width: '60%',
    height: '60%',
  },
  modalMainView: {
    backgroundColor: '#ffff',
    borderRadius: 10,
    shadowOffset: {
      width: 2,
      height: 10,
    },
    shadowColor: '#bbbb',
  },
});
