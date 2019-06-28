import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Keyboard,
  Platform,
  LayoutAnimation,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import C from '../../../Constants';
import { TextInput, Button } from '../../common';
import {RadioGroup,RadioButton} from 'react-native-flexi-radio-button'
import Toast from 'react-native-simple-toast';
import SyncStorage from 'sync-storage';


export default class serviceTypeAddScreen extends React.Component {
 
  constructor(props) {

      super(props);
  }
   
  state = {
    anim: new Animated.Value(0),
    // Current visible form
    isKeyboardVisible: false,
    name  : '',
    rolesIndex:0,
    
  };

static navigatioOptions = ({navigation}) => {
  return{ title: "Edit Service Type" }
}

  onSelect(index, value){
    this.setState({
        cstate : value
    })
}

navtitle =()=>{
  this.props.navigation.setParams({
        title:"Update Type"

     })
}
  componentWillMount() {
this.navtitle();
    if(this.props.navigation.state.params)
    {
        if(this.props.navigation.state.params.status == true)
        {
            this.setState({ rolesIndex :0});
        }
        else
        {
            this.setState({ rolesIndex : 1});
        }
        this.setState({
            name : this.props.navigation.state.params.name
        });
    }
    else
        this.setState({ rolesIndex :0});
    
    this.keyboardDidShowListener = Keyboard.addListener(
      Platform.select({ android: 'keyboardDidShow', ios: 'keyboardWillShow' }),
      this._keyboardDidShow.bind(this),
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      Platform.select({ android: 'keyboardDidHide', ios: 'keyboardWillHide' }),
      this._keyboardDidHide.bind(this),
    );
  }

  componentDidMount() {
   // Animated.timing(this.state.anim, { toValue: 3000, duration: 3000 }).start();
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow() {
    LayoutAnimation.easeInEaseOut();
    this.setState({ isKeyboardVisible: true });
  }

  _keyboardDidHide() {
    LayoutAnimation.easeInEaseOut();
    this.setState({ isKeyboardVisible: false });
  }

  submitForm(){ 
    if(this.props.navigation.state.params)
    {
        
        let role = {
            id: this.props.navigation.state.params.id,
            name:  this.state.name
        };
    
        fetch(`${C.API}/service_type/update`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer '+SyncStorage.set('LOGIN_DETAILS'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(role),
            })
            .then((response) => response.json())
            .then((responseJson) => {
        
                if(!responseJson.status){

                    if(responseJson.message.name){
                        this.setState({ nameError: true });
                    }
                    
                 }
                    Toast.show("Service Type Updated")
                    this.setState({name  : ''});
                    
            })
            .catch(err => {console.warn(err) })
            .done();
            // this.props.navigation.navigate({
            //     routeName: 'Customer',
               
            //   })
            this.props.navigation.goBack();
    }
    else
    {
        let role = {
            name:  this.state.name
           
        };
    
        fetch(`${C.API}/service_type`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer '+SyncStorage.set('LOGIN_DETAILS'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(role),
            })
            .then((response) => response.json())
            .then((responseJson) => {
        
                if(!responseJson.status){
                    if(responseJson.message.name){
                        this.setState({ nameError: true });
                    }
                }
                if(responseJson.success)
                {
                    Toast.show("Service Type added")
                    this.setState({name  : ''});
                    this.props.navigation.goBack();
                }
                else
                {
                    console.warn(responseJson)
                    //Toast.show("Email already Exists")
                }
            })
            .catch(err => {console.warn(err) })
            .done();
            // this.props.navigation.navigate({
            //     routeName: 'Customer',
               
            //   })
           
        }
  }

  loginUser(email, password){ /* email and password based authentication with Deployd */
    fetch(`${API}/users/login`, {
      method: 'POST',
      headers: Headers,
      body: JSON.stringify({username: email, password: password})
    })
    .then(response => response.json())
    .then(data => this.getUserInfo(data.id))
    .catch(err => {})
    .done();
  }
   

  render() {
    
    return (
      <ImageBackground
        source={require('../../../assets/images/background.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
      <ScrollView style={styles.container} bounces={false}>
         <Animated.View
            // style={[styles.section, styles.middle, this.fadeIn(700, -20)]}
          >
            <TextInput
              maxLength={50}
              onChangeText={(name) => this.setState({ name , nameError:false})}
              onSubmitEditing={() => this.name.focus()}
              placeholder="Name"
              returnKeyType="next"
              style={[styles.textInput, this.state.nameError? styles.error:null]}
              autoCorrect={false}
              value={this.state.name}
            />
            <Button
              secondary
              rounded
              style={{ alignSelf: 'stretch', marginBottom: 10, marginTop: 40 }}
              caption={ 'Save'}
              onPress={() => this.submitForm()}
            />
            <Text>
              {this.state.result}
            </Text>
          </Animated.View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'space-around',
    // paddingHorizontal: 30,
    flex: 1,
    padding: 20,
   
  },
  backgroundImage: {
    flex: 1,
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middle: {
    flex: 2,
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  bottom: {
    flex: 1,
    alignSelf: 'stretch',
    paddingBottom: Platform.OS === 'android' ? 30 : 0,
  },
  last: {
    justifyContent: 'flex-end',
  },
  textInput: {
    alignSelf: 'stretch',
    marginTop: 20,
  },
  logo: {
    height: 150,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginTop: 15,
    justifyContent: 'space-between',
  },
  socialButton: {
    flex: 1,
  },
  socialButtonCenter: {
    marginLeft: 10,
    marginRight: 10,
  },
  error:{
      borderBottomColor: 'red',
      borderBottomWidth: 1,
  }
});
