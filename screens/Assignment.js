import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
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
export default class Assignment extends React.Component {
  constructor() {
    super();
    this.state = {
      teacherId: firebase.auth().currentUser.email,
      assignment: [],
    };
  }

  getAssignments = () => {
    console.log(this.state.teacherId);
    db.collection('Assignment')
      .where('teacherId', '==', this.state.teacherId)
      .onSnapshot((snapshot) => {
        var assignment = [];
        snapshot.docs.map((doc) => {
          var student = doc.data();
          student['assignmentDocId'] = doc.id;
          assignment.push(student);
        });
        this.setState({
          assignment: assignment,
        });
        console.log(this.state.assignment);
      });
  };

  componentDidMount() {
    this.getAssignments();
  }

 renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        this.props.navigation.navigate('AssignmentDetails', {
          itemDetails: item,
        });
      }}
      style={styles.cardContainer}>
      <Image
        source={{
          uri: item.image,
        }}
        style={styles.img}
      />
      <View
        style={{
          flexDirection: 'column',
          paddingLeft: 10,
          width: '100%',
        }}>
        <Text
          style={[styles.input, { fontWeight: 'bold' }]}
          ellipsizeMode="tail"
          numberOfLines={1}>
          {item.title}
        </Text>
        <Text
          style={[styles.input, { fontSize: 14 }]}
          ellipsizeMode="tail"
          numberOfLines={1}>
          {item.subjectName}
        </Text>
        <Text
          style={[styles.input, { fontSize: 14 }]}
          ellipsizeMode="tail"
          numberOfLines={1}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
  keyExtractor = (item, index) => index.toString();

  render() {
    return (
      <SafeAreaProvider style={{ flex: 1, backgroundColor: '#F0F8FF' }}>
        <View style={{ flex: 1 }}>
          <Header
            centerComponent={{
              text: 'Assignment List',
              style: {
                margin: 2,
                padding: 2,
                fontWeight: 'bold',
                fontSize: 16,
                color: '#fff',
              },
            }}
            backgroundColor={'#0092D8'}
          />

          <FlatList
            data={this.state.assignment}
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
                this.props.navigation.navigate('Create');
              }}>
              <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
          </LinearGradient>
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
   cardContainer: {
    margin: 5,
    borderRadius: 10,
    padding: 5,
    borderWidth: 2,
    borderColor: '#38b6ff',
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    width: '60%',
    fontSize: 16,
    padding: 5,
  },
  img: {
    width: '30%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
});
