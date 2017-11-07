import React from 'react';
// import { Container,Item,H1,Input,Subtitle, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../actions';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
  FlatList,
  Image,
} from 'react-native';

import ReversedFlatList from 'react-native-reversed-flat-list';

import {send, subscribe} from 'react-native-training-chat-server';

import { Permissions, Notifications } from 'expo';



function mapStateToProps(state, props) {
  return {
    user:state.userReducers.userLoggedIn,
    userName:state.userReducers.ChatName
    };
}
function mapDispatchToProps(dispatch){return bindActionCreators(Actions,dispatch);}


const PUSH_ENDPOINT = 'https://exp.host/--/api/v2/push/send';


// const NAME = 'sdd';
const CHANNEL = 'HElloo';
const AVATAR =
  'https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_400x400.jpg';


  class ProfileScreen extends React.Component {
    // Nav options can be defined as a function of the screen's props:
    // static navigationOptions = ({ navigation }) => ({
    //   title: `Chat with ${navigation.state.params.user}`,
    state = {
      typing: '',
      messages: [],
      token:[],
      notification:{}
    };
    componentWillMount() {
      subscribe(CHANNEL, messages => {
        this.setState({messages});
      });
      this.registerForPushNotificationsAsync();
            if(this.props.userName=='rishi')
            this.setState({token:"ExponentPushToken[DzXktGC92UX5bLHI3h_VYi]"})
            else
            this.setState({token:"ExponentPushToken[6lB3SgEv-mS0RJ7wwGPodh]"})
            
          }
    registerForPushNotificationsAsync= async ()=> {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
    
      // only ask if permissions have not already been determined, because
      // iOS won't necessarily prompt the user a second time.
      if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
    
      // Stop here if the user did not grant permissions
      if (finalStatus !== 'granted') {
        return;
      }
    
      // Get the token that uniquely identifies this device
      let token = await Notifications.getExpoPushTokenAsync();
      // POST the token to your backend server from where you can retrieve it to send push notifications.
      // return fetch(PUSH_ENDPOINT, {
      //   method: 'POST',
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     token: {
      //       value: token,
      //     }, 
      //     user: {
      //       username: this.props.userName,
      //     },
      //   }),
      // });
      console.log("token",token)

    };
    componentDidMount(){
      this._notificationSubscription = Notifications.addListener(this._handleNotification);
      
    }
    _handleNotification = (notification) => {
      this.setState({notification: notification});
    };
    sendMessage = async () => {
      // read message from component state
      const message = this.state.typing;
  
      // send message to our channel, with sender name
      await send({
        channel: CHANNEL,
        sender: this.props.userName,
        avatar: AVATAR,
        message,
      });
  
      // set the component state (clears text input)
      this.setState({
        typing: '',
      });

      // if(this.props.userName=='rishi')
      // let token="ExponentPushToken[DzXktGC92UX5bLHI3h_VYi]";
      // else
      // let token="ExponentPushToken[6lB3SgEv-mS0RJ7wwGPodh]";
      
      fetch(PUSH_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'accept-encoding':'gzip, deflate',
        },
        body: JSON.stringify(
          {  
            to: this.state.token,
            sound: "default",
            body: "You have a new message"
          
        }),
      });
    };
  
    renderItem({item}) {
      return (
        <View style={styles.row}>
          <Image style={styles.avatar} source={{uri: item.avatar}} />
          <View style={styles.rowText}>
            <Text style={styles.sender}>{item.sender}</Text>
            <Text style={styles.message}>{item.message}</Text>
          </View>
        </View>
      );
    }
  
    // });
    render() {
        
      // The screen's current route is passed in to `props.navigation.state`:
      const { params } = this.props.navigation.state;
      this.props.logout();
      return (
        // <View>
        //   {<Text>Chat with {params.user}</Text>}
        // </View>
      //   <Container>
      //   <Header />
      //   <Content>
      //     <H1>Hello </H1>
      //   </Content>
      // </Container>
      <View style={styles.container}>
      {/* <Header title={CHANNEL} /> */}
      <ReversedFlatList
        data={this.state.messages}
        renderItem={this.renderItem}
      />
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.footer}>
          <TextInput
            value={this.state.typing}
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Type something nice"
            onChangeText={text => this.setState({typing: text})}
          />
          <TouchableOpacity onPress={this.sendMessage}>
            <Text style={styles.send}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
      );
    }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    row: {
      flexDirection: 'row',
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    avatar: {
      borderRadius: 20,
      width: 40,
      height: 40,
      marginRight: 10,
    },
    rowText: {
      flex: 1,
    },
    message: {
      fontSize: 18,
    },
    sender: {
      fontWeight: 'bold',
      paddingRight: 10,
    },
    footer: {
      flexDirection: 'row',
      backgroundColor: '#eee',
    },
    input: {
      paddingHorizontal: 20,
      fontSize: 18,
      flex: 1,
    },
    send: {
      alignSelf: 'center',
      color: 'lightseagreen',
      fontSize: 16,
      fontWeight: 'bold',
      padding: 20,
    },
  });
  export default connect(mapStateToProps,mapDispatchToProps)(ProfileScreen);