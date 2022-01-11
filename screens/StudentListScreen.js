import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { ListItem, Avatar, Header, Icon } from 'react-native-elements';
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
import { LinearGradient } from 'expo-linear-gradient';

export default class StudentListScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      teacherId: firebase.auth().currentUser.email,
      allStudents: [],
    };
  }

  getStudents = () => {
    db.collection('allStudents')
      .where('teacherId', '==', this.state.teacherId)
      .onSnapshot((snapshot) => {
        var allStudents = [];
        snapshot.docs.map((doc) => {
          var student = doc.data();
          student['studentId'] = doc.id;
          allStudents.push(student);
        });
        this.setState({
          allStudents: allStudents,
        });
      });
  };

  
  componentDidMount() {

    this.getStudents();
  }
  renderItem = ({ item }) => (
    <ListItem
      bottomDivider
      onPress={() => {
        this.props.navigation.navigate('UpdateStudentDetailsScreen', {
          studentDetails: item,
        });
      }}>
      <ListItem.Content>
        <ListItem.Title style={{ color: 'black', fontWeight: 'bold' }}>
          {item.studentName}
        </ListItem.Title>
        <ListItem.Subtitle>{item.studentEmail}</ListItem.Subtitle>
      </ListItem.Content>

      <Icon
        name="delete"
        type="MaterialCommunityIcons"
        color="#38b6ff"
        onPress={() => {
          db.collection('allStudents').doc(item.studentId).delete();
        }}
      />
    </ListItem>
  );

  keyExtractor = (item, index) => index.toString();

  render() {
    return (

      <SafeAreaProvider style={{ flex: 1, backgroundColor: '#F0F8FF' }}>
        <View style={{ flex: 1 }}>
          <Header
            centerComponent={{
              text: 'Students List',
              style: {
                margin: 2,
                padding: 2,
                fontWeight: 'bold',
                fontSize: 19,
                color: '#fff',
              },
            }}
            backgroundColor={'#0092D8'} 
            //5ce1e6
          />

          <View style={{ flex: 1 }}>
            <FlatList
              data={this.state.allStudents}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
            />
                              <LinearGradient
            // Button Linear Gradient
            colors={['#5ce1e6', '#38b6ff']}
            start={{ x: -5, y: -1 }}
            end={{ x: 5, y: 1 }}
             style={styles.touchableOpacityStyle}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                this.props.navigation.navigate('AddStudentScreen');
               }}> 
              <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
          </LinearGradient>
          </View>
        </View> 
      </SafeAreaProvider> 
    );
  }
}

const styles = StyleSheet.create({
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    right: 30,
    bottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5ce1e6',
    borderRadius: 25,
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
  fabText: {
    color: 'white',
    fontSize: 20,
  },
});
