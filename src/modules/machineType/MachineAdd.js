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
import Toast from 'react-native-simple-toast'

export default class machineAddScreen extends React.Component {

    constructor(props) {

        super(props);
    }
  state = {
    anim: new Animated.Value(0),
    // Current visible form
    isKeyboardVisible: false,
   
    name  : '',
   
    nameError : false,
   
  };

  onSelect(index, value){
    this.setState({
        cstate : value
    })
}
  componentWillMount() {

    if(this.props.navigation.state.params)
    {
        if(this.props.navigation.state.params.status == true)
        {
            this.setState({ customersIndex :0});
        }
        else
        {
            this.setState({ customersIndex : 1});
        }
        this.setState({
            name : this.props.navigation.state.params.name,
        });
    }
    else
        this.setState({ customersIndex :0});
    
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
    Animated.timing(this.state.anim, { toValue: 3000, duration: 3000 }).start();
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
        var pwd = "";
        if(this.state.password == "")
            pwd = this.props.navigation.state.params.password;
        else
            pwd = this.state.password;
        let user = {
            id: this.props.navigation.state.params.id,
            name:  this.state.name,
        };
    
        fetch(`${C.API}/product_type/update`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
            })
            .then((response) => response.json())
            .then((responseJson) => {
        
                if(!responseJson.status){

                    if(responseJson.message.name){
                        this.setState({ nameError: true });
                    }
                }
                    Toast.show("Customer Updated")
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
        let user = {
            name:  this.state.name
            
        };
    
        fetch(`${C.API}/customers`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
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
                    Toast.show("Machine Type added")
                    
                    this.setState({name  : ''});
                    
                }
                else
                {
                    Toast.show("Machine Type Exists")
                }
            })
            .catch(err => {console.warn(err) })
            .done();
            // this.props.navigation.navigate({
            //     routeName: 'Customer',
               
            //   })
            this.props.navigation.goBack();
        }
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
              autoCapitalize="none"
              keyboardType="email-address"
              maxLength={144}
              onChangeText={(email) => this.setState({ email , emailError:false})}
              onSubmitEditing={() => this.email.focus()}
              placeholder="Email address"
              returnKeyType="next"
              style={[styles.textInput, this.state.emailError? styles.error:null]}
              value={this.state.email}
              autoCorrect={false}
              
            />
            <TextInput
              autoCapitalize="none"
              maxLength={20}
              onChangeText={(password) => this.setState({ password , passwordError:false})}
              onSubmitEditing={() => this.password.focus()}
              placeholder="Password"
              ref={(el) => this.password = el }
              returnKeyType="next"
              secureTextEntry={true}
              style={[styles.textInput, this.state.passwordError? styles.error:null]}
              autoCorrect={false}
              value={this.state.password}
            />
            <TextInput
              maxLength={20}
              onChangeText={(name) => this.setState({ name , nameError:false})}
              onSubmitEditing={() => this.name.focus()}
              placeholder="Name"
              ref={(el) => this.name = el }
              returnKeyType="next"
              style={[styles.textInput, this.state.nameError? styles.error:null]}
              autoCorrect={false}
              value={this.state.name}
            />
            <TextInput
              maxLength={20}
              onChangeText={(phone) => this.setState({ phone , phoneError:false})}
              placeholder="Phone"
              ref={(el) => this.phone = el }
              returnKeyType="next"
              style={[styles.textInput, this.state.phoneError? styles.error:null]}
              autoCorrect={false}
              value={this.state.phone}
            />
            <TextInput
              maxLength={20}
              onChangeText={(city) => this.setState({ city , cityError:false})}
              placeholder="City"
              ref={(el) => this.city = el }
              returnKeyType="next"
              style={[styles.textInput, this.state.cityError? styles.error:null]}
              autoCorrect={false}
              value={this.state.city}
            />
            <TextInput
              maxLength={20}
              onChangeText={(ustate) => this.setState({ ustate, stateError:false })}
              placeholder="State"
              ref={(el) => this.ustate = el }
              returnKeyType="next"
              style={[styles.textInput, this.state.stateError? styles.error:null]}
              autoCorrect={false}
              value={this.state.ustate}
            />
            <TextInput
              maxLength={20}
              onChangeText={(address) => this.setState({ address , addressError:false})}
              placeholder="Address"
              ref={(el) => this.address = el }
              returnKeyType="next"
              style={[styles.textInput, this.state.addressError? styles.error:null]}
              autoCorrect={false}
              value={this.state.address}
            />


            <TextInput
              maxLength={20}
              onChangeText={(zipcode) => this.setState({ zipcode , zipcodeError:false})}
              placeholder="zipcode"
              ref={(el) => this.zipcode = el }
              returnKeyType="next"
              style={[styles.textInput, this.state.zipcodeError? styles.error:null]}
              autoCorrect={false}
              value={this.state.zipcode}
            />
            <RadioGroup
                size={24}
                thickness={2}
                color='#9575b2'
                highlightColor='#ccc8b9'
                selectedIndex={this.state.customersIndex}
                onSelect = {(index, value) => this.onSelect(index, value)}
            >
                <RadioButton value='true'> 
                    <Text>Active</Text>
                </RadioButton>
                <RadioButton value='false' color='red'>
                    <Text>Inactive</Text>
                </RadioButton>
            </RadioGroup>
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
