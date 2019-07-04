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
import { StackNavigator } from 'react-navigation';
import axios from 'axios'

export default class serviceAddScreen extends React.Component {
 
  constructor(props) {

      super(props);
      let serviceIndex=0, message = "",ProductInfo = [], CustomerInfo = [], Priority =[], ProductType = [], ServiceType =[];
      this.getCustomerInfo();
      this.getPriority();
      this.getProductInfo();
      this.getProductType();
      this.getServiceType();
 
    }
   
  state = {
    anim: new Animated.Value(0),
    // Current visible form
    isKeyboardVisible: false,
    serviceIndex:0,
    ProductInfo,
    CustomerInfo,
    Priority,
    ProductType,
    ServiceType
  };

static navigatioOptions = ({navigation}) => {
  return{ title: "Edit Service" }
}
//may be used
// onSelect(index, value){
//   this.setState({
//       cstate : value
//   })
// }

navtitle =()=>{
  this.props.navigation.setParams({
        title:"Update Service"

     })
}
  componentWillMount() {
this.navtitle();
    if(this.props.navigation.state.params)
    {
        if(this.props.navigation.state.params.status == true)
        {
            this.setState({ serviceIndex :0});
        }
        else
        {
            this.setState({ serviceIndex : 1});
        }
        this.setState({
            //email : this.props.navigation.state.params.email,
           
        });
    }
    else
        this.setState({ serviceIndex :0});
    
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
//fetching product info from Network
getProductInfo = async () => {
    try {
        const res =  await axios.post(`${c.API}/products/get`,{headers:{ Authorization: 'Bearer '+SyncStorage.get('LOGIN_DETAILS')}});
        if (res.data.success) { this.setState({ ProductInfo: res.data.data })}
        console.warn( "product Info  : ",this.state. ProductInfo);
    } catch (e) {console.warn("Product fetching error",e.message)}
}
//fetching customer info from Network
getCustomerInfo = async () => {
  try {
      const res =  await axios.post(`${c.API}/customers/get`,{headers:{ Authorization: 'Bearer '+SyncStorage.get('LOGIN_DETAILS')}});
      if (res.data.success) { this.setState({ CustomerInfo: res.data.data })}
      console.warn( "Customer Info  : ",this.state. CustomerInfo);
  } catch (e) {console.warn("customer fetching error",e.message)}
}
//fetching priority info from Network
getPriority = async () => {
  try {
      const res =  await axios.post(`${c.API}/service_priority/get`,{headers:{ Authorization: 'Bearer '+SyncStorage.get('LOGIN_DETAILS')}});
      if (res.data.success) { this.setState({ Priority: res.data.data })}
      console.warn( "Priority  : ",this.state.Priority);
  } catch (e) {console.warn("Priority fetching error",e.message)}
}
//fetching ProductType info from Network
getProductType = async () => {
  try {
      const res =  await axios.post(`${c.API}/product_type/get`,{headers:{ Authorization: 'Bearer '+SyncStorage.get('LOGIN_DETAILS')}});
      if (res.data.success) { this.setState({ ProductInfo: res.data.data })}
      console.warn( "productType Info  : ",this.state.ProductType);
  } catch (e) {console.warn("ProductType fetching error",e.message)}
}
//fetching ServiceType info from Network
getServiceType = async () => {
  try {
      const res =  await axios.post(`${c.API}/service_type/get`,{headers:{ Authorization: 'Bearer '+SyncStorage.get('LOGIN_DETAILS')}});
      if (res.data.success) { this.setState({ ServiceType: res.data.data })}
      console.warn( "ServiceType Info  : ",this.state.Ser 
      );
  } catch (e) {console.warn("ServiceType fetching error",e.message)}
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
            email:  this.state.email,
            phone:  this.state.phone,
            address:  this.state.address,
            password:  pwd,
            city:  this.state.city,
            state:  this.state.ustate,
            zipcode:  this.state.zipcode,
            status: this.state.cstate
        };
    
        fetch(`${C.API}/customers/update`, {
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
                    if(responseJson.message.city){
                        this.setState({ cityError: true });
                    }
                    if(responseJson.message.state){
                        this.setState({ stateError: true });
                    }
                    if(responseJson.message.email){
                        this.setState({ emailError: true });
                    }
                    if(responseJson.message.password){
                        this.setState({ passwordError: true });
                    }
                    if(responseJson.message.phone){
                        this.setState({ phoneError: true });
                    }
                    if(responseJson.message.address){
                        this.setState({ addressError: true });
                    }
                    if(responseJson.message.zipcode){
                        this.setState({ zipcodeError: true });
                    }
                }
                    Toast.show("Customer Updated")
                    this.setState({email : ''});
                    this.setState({name  : ''});
                    this.setState({phone : ''});
                    this.setState({password   : ''});
                    this.setState({address :''});
                    this.setState({city :''});
                    this.setState({ustate:''});
                    this.setState({zipcode:''});
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
            name:  this.state.name,
            email:  this.state.email,
            phone:  this.state.phone,
            address:  this.state.address,
            password:  this.state.password,
            city:  this.state.city,
            state:  this.state.ustate,
            zipcode:  this.state.zipcode,
            status: this.state.cstate
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
                    if(responseJson.message.city){
                        this.setState({ cityError: true });
                    }
                    if(responseJson.message.state){
                        this.setState({ stateError: true });
                    }
                    if(responseJson.message.email){
                        this.setState({ emailError: true });
                    }
                    if(responseJson.message.password){
                        this.setState({ passwordError: true });
                    }
                    if(responseJson.message.phone){
                        this.setState({ phoneError: true });
                    }
                    if(responseJson.message.address){
                        this.setState({ addressError: true });
                    }
                    if(responseJson.message.zipcode){
                        this.setState({ zipcodeError: true });
                    }
                }
                if(responseJson.success)
                {
                    Toast.show("Customer added")
                    this.setState({email : ''});
                    this.setState({name  : ''});
                    this.setState({phone : ''});
                    this.setState({password   : ''});
                    this.setState({address :''});
                    this.setState({city :''});
                    this.setState({ustate:''});
                    this.setState({zipcode:''});
                    this.props.navigation.goBack();
                }
                else
                {
                    console.warn(responseJson)
                    if(responseJson.message == "E-mail already exists")
                    {
                      Toast.show(responseJson.message);
                    }
                    else if(responseJson.message.email != "required")
                    {
                      Toast.show(responseJson.message.email.message)
                    }
                  
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
              //onChangeText={(message) => this.setState({ message})}
             // onSubmitEditing={() => this.message.focus()}
              placeholder="Message"
              returnKeyType="next"
             // style={[styles.textInput, this.state.messageError? styles.error:null]}
              autoCorrect={false}
           //   value={this.state.message}
            />
            {/* <Text>User Role</Text>
            <CustomPicker 
              options={renderUserRoles(this.state.userRoles)}
             
              value={(this.state.parameters)?{label: this.state.userRoleName ,value: this.state.userRoleId }:{}}
              
              getLabel={(item) => item.label}
              onValueChange={(value, i) => {
                this.state.userRoleId = value.value;
                this.state.userRoleName = value.label;
                 // props.onChange('selectedServiceStatus', { id: value.value, name: value.label })
              }}
            />
            <Text>User Role</Text>
            <CustomPicker 
              options={renderUserRoles(this.state.userRoles)}
             
              value={(this.state.parameters)?{label: this.state.userRoleName ,value: this.state.userRoleId }:{}}
              
              getLabel={(item) => item.label}
              onValueChange={(value, i) => {
                this.state.userRoleId = value.value;
                this.state.userRoleName = value.label;
                 // props.onChange('selectedServiceStatus', { id: value.value, name: value.label })
              }}
            />
            <Text>User Role</Text>
            <CustomPicker 
              options={renderUserRoles(this.state.userRoles)}
             
              value={(this.state.parameters)?{label: this.state.userRoleName ,value: this.state.userRoleId }:{}}
              
              getLabel={(item) => item.label}
              onValueChange={(value, i) => {
                this.state.userRoleId = value.value;
                this.state.userRoleName = value.label;
                 // props.onChange('selectedServiceStatus', { id: value.value, name: value.label })
              }}
            />
            <Text>User Role</Text>
            <CustomPicker 
              options={renderUserRoles(this.state.userRoles)}
             
              value={(this.state.parameters)?{label: this.state.userRoleName ,value: this.state.userRoleId }:{}}
              
              getLabel={(item) => item.label}
              onValueChange={(value, i) => {
                this.state.userRoleId = value.value;
                this.state.userRoleName = value.label;
                 // props.onChange('selectedServiceStatus', { id: value.value, name: value.label })
              }}
            /> */}



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
