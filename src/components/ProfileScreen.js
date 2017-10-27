import React from 'react';
import { Container,Item,H1,Input,Subtitle, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../actions';


function mapStateToProps(state, props) {
  return {
    user:state.userReducers.userLoggedIn
    };
}
function mapDispatchToProps(dispatch){return bindActionCreators(Actions,dispatch);}

class ProfileScreen extends React.Component {
    // Nav options can be defined as a function of the screen's props:
    // static navigationOptions = ({ navigation }) => ({
    //   title: `Chat with ${navigation.state.params.user}`,
    // });
    render() {
        
      // The screen's current route is passed in to `props.navigation.state`:
      const { params } = this.props.navigation.state;
      this.props.logout();
      return (
        // <View>
        //   {<Text>Chat with {params.user}</Text>}
        // </View>
        <Container>
        <Header />
        <Content>
          <H1>Hello </H1>
        </Content>
      </Container>
      );
    }
  }

  export default connect(mapStateToProps,mapDispatchToProps)(ProfileScreen);