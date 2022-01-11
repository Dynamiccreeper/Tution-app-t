import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
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
  Octicons,
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
} from '@expo/vector-icons';
import Modal from 'react-native-modal';
export default class AssignmentDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assignmentId:
        this.props.navigation.getParam('itemDetails')['assignmentId'],
      assignmentTitle: this.props.navigation.getParam('itemDetails')['title'],
      additionalInfo:
        this.props.navigation.getParam('itemDetails')['description'],
      image: this.props.navigation.getParam('itemDetails')['image'],
      date: this.props.navigation.getParam('itemDetails')['date'],
      subjectName: this.props.navigation.getParam('itemDetails')['subjectName'],
      assignmentDocId:
        this.props.navigation.getParam('itemDetails')['assignmentDocId'],
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
              maxWidth: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <Avatar source={{ uri: this.state.image }} size={'xlarge'} />
            <TouchableOpacity
              onPress={() => {
                this.setState({ isModalVisible: false });
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginTop: 10,
                  fontSize: 15,
                  textDecorationLine: 'underline',
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </Card>
        </View>
      </Modal>
    );
  };

  render() {
    return (
      <ScrollView>
        <SafeAreaProvider style={{ flex: 1, backgroundColor: '#F0F8FF' }}>
          <Header
            centerComponent={{
              text: 'Assignment Details',
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
            <View style={styles.container}>
              {this.showModal()}
              <View
                style={{
                  alignSelf: 'center',
                  margin: 10,
                  padding: 20,
                  alignItems: 'center',
                  marginTop: 5,
                  borderRadius: 10,
                  backgroundColor: '#fff',
                  width: '90%',
                }}>
                <Avatar
                  source={{ uri: this.state.image }}
                  size={'large'}
                  onPress={() => {
                    this.setState({ isModalVisible: true });
                  }}
                />

                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 18,
                    padding: 10,
                  }}>
                  Topic: {this.state.assignmentTitle}
                </Text>
                <View
                  style={{
                    alignSelf: 'center',
                    padding: 10,
                    backgroundColor: 'lightblue',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 16,
                    }}>
                    {this.state.subjectName}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    padding: 10,

                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      alignSelf: 'center',
                      padding: 10,
                      fontSize: 14,
                      flexWrap: 'wrap',
                    }}>
                    Description:{this.state.additionalInfo}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: '50%',
                    bottom: -10,
                    backgroundColor: 'blue',
                    borderRadius: 20,
                    padding: 10,
                  }}>
                  <Icon
                    name="delete"
                    type="MaterialCommunityIcons"
                    color="#fff"
                    size={20}
                    onPress={() => {
                      db.collection('Assignment')
                        .doc(this.state.assignmentDocId)
                        .delete();
                      db.collection('Responses')
                        .where('assignmentId', '==', this.state.assignmentId)
                        .get()
                        .then((snapshot) => {
                          snapshot.docs.map((doc) => {
                            db.collection('Responses').doc(doc.id).delete();
                          });
                        });

                      this.props.navigation.goBack();
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaProvider>
      </ScrollView>
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
});
