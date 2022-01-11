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

export default class UpdateStudentDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentId: this.props.navigation.getParam('studentDetails')['studentId'],
      studentName: this.props.navigation.getParam('studentDetails')[
        'studentName'
      ],
      studentCurriculum: this.props.navigation.getParam('studentDetails')[
        'studentCurriculum'
      ],
      studentCurriculumLevel: this.props.navigation.getParam('studentDetails')[
        'studentCurriculumLevel'
      ],
      studentClassNo: this.props.navigation.getParam('studentDetails')[
        'studentClassNo'
      ],
    };
  }

//Function to update student details in db
  updateStudentDetails = () => {
    //updating student details according to studentId 
    db.collection('allStudents').doc(this.state.studentId).update({
      studentName: this.state.studentName,
      studentCurriculum: this.state.studentCurriculum,
      studentCurriculumLevel: this.state.studentCurriculumLevel,
      studentClassNo: this.state.studentClassNo,
    });
    alert('Student Details Updated');
    Alert.alert('Student Details Updated');
    this.props.navigation.navigate('StudentListScreen');
  };

//Function to delete student record in db
  deleteStudentRecord = () => {
    //deleting student details according to studentId 
    db.collection('allStudents').doc(this.state.studentId).delete();
    alert('Student Details deleted');
    Alert.alert('Student Details deleted');
    this.props.navigation.navigate('StudentListScreen');
  };

  render() {
    return (
      <SafeAreaProvider style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Header
            centerComponent={{
              text: 'Students Details',
              style: {
                fontWeight: 'bold',
                fontSize: 19,
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
            rightComponent={
              <Icon
                name="delete"
                type="MaterialCommunityIcons"
                color="#ffffff"
                onPress={() => {
                  this.deleteStudentRecord();
                }}
              />
            }
            backgroundColor={'#000000'}
          />
          <View
            style={{
              flex: 1,
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            <TextInput
              style={styles.textinput}
              placeholder={'Student name'}
              onChangeText={(text) => {
                this.setState({
                  studentName: text,
                });
              }}
              value={this.state.studentName}
            />
            <TextInput
              style={styles.textinput}
              placeholder={'Student curriculum'}
              onChangeText={(text) => {
                this.setState({
                  studentCurriculum: text,
                });
              }}
              value={this.state.studentCurriculum}
            />
            <TextInput
              style={styles.textinput}
              placeholder={'Student curriculum level'}
              onChangeText={(text) => {
                this.setState({
                  studentCurriculumLevel: text,
                });
              }}
              value={this.state.studentCurriculumLevel}
            />
            <TextInput
              style={styles.textinput}
              placeholder={'Completed Class Number'}
              maxLength={3}
              keyboardType={'numeric'}
              onChangeText={(text) => {
                this.setState({
                  studentClassNo: text,
                });
              }}
              value={this.state.studentClassNo}
            />
            <TouchableOpacity
              style={styles.updateButton}
              onPress={() => {
                this.updateStudentDetails();
              }}>
              <Text style={styles.buttonText}>Update </Text>
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
    backgroundColor: '#000000',
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
