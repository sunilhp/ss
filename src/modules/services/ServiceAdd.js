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
import c from '../../../Constants';
import { TextInput, Button } from '../../common';
import {RadioGroup,RadioButton} from 'react-native-flexi-radio-button'
import Toast from 'react-native-simple-toast'
import { StackNavigator } from 'react-navigation';
import axios from 'axios';
import SyncStorage from 'sync-storage';
import { CustomPicker } from 'react-native-custom-picker';
import FormData from "form-data";

export default class serviceAddScreen extends React.Component {
 
  constructor(props) {

      super(props);
      let serviceIndex=0, message = "", ProductName="",ProductId="", ProductInfo = [],CustomerName="",CustomerId="", CustomerInfo = [],PriorityName="",PriorityId="", Priority =[], ServiceTypeId="", ServiceTypeName = "", ServiceType =[],ProductTypeName="", ProductTypeId="",ProductType=[];
      
      this.getPriority();
      this.getProductInfo();
      this.getProductType();
      this.getCustomerInfo();
      this.getServiceType();
 
    }
   
  state = {
    anim: new Animated.Value(0),
    // Current visible form
    isKeyboardVisible: false,
    serviceIndex:0,
    message:"",
    ProductName:"",
    ProductId:"",
    ProductInfo:[],
    CustomerName:"",
    CustomerId:"5cf74177688a6c4ee851f52a",
    CustomerInfo: [],
    PriorityName:"",
    PriorityId:"",
    Priority :[],
    ProductTypeName:"",
    ProductTypeId:"",
    ProductType :[],
    ServiceTypeName:"",
    ServiceTypeId:"",
    ServiceType :[]
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

// navtitle =()=>{
//   this.props.navigation.setParams({
//         title:"Update Service"

//      })
// }

//fetching product info from Network
getProductInfo = async () => {
  try {
      const res =  await axios.post(`${c.API}/products/get`,{headers:{ Authorization: 'Bearer '+SyncStorage.get('LOGIN_DETAILS')}});
      if (res.data.success) { this.setState({ ProductInfo:res.data.data })}
      console.warn(this.state.ProductInfo)
  } catch (e) {console.warn("Product fetching error",e.message)}
}
//fetching customer info from Network
getCustomerInfo = async () => {
  try {
      const res =  await axios.post(`${c.API}/customers/get`,{headers:{ Authorization: 'Bearer '+SyncStorage.get('LOGIN_DETAILS')}});
      if (res.data.success) { this.setState({ CustomerInfo:res.data.data })}
      console.warn( "Customer Info  : ",this.state.CustomerInfo);
  } catch (e) {
    console.warn("customer fetching error",e.message);
  }
}
//fetching priority info from Network
getPriority = async () => {
  try {
      const res =  await axios.post(`${c.API}/service_priority/get`,{headers:{ Authorization: 'Bearer '+SyncStorage.get('LOGIN_DETAILS')}});
      if (res.data.success) { this.setState({ Priority:res.data.data })}
  } catch (e) {console.warn("Priority fetching error",e.message)}
}
//fetching ProductType info from Network
getProductType = async () => {
  try {
      const res =  await axios.post(`${c.API}/product_type/get`,{headers:{ Authorization: 'Bearer '+SyncStorage.get('LOGIN_DETAILS')}});
      if (res.data.success) { this.setState({ ProductType:res.data.data })}
  } catch (e) {console.warn("ProductType fetching error",e.message)}
}
//fetching ServiceType info from Network
getServiceType = async () => {
  try {
      const res =  await axios.post(`${c.API}/service_type/get`,{headers:{ Authorization: 'Bearer '+SyncStorage.get('LOGIN_DETAILS')}});
      if (res.data.success) { this.setState({ ServiceType:res.data.data })}
  } catch (e) {console.warn("ServiceType fetching error",e.message)}
}


  submitForm(){ 
    if(this.props.navigation.state.params)
    {
      console.warn(this.props.navigation.state.params);
        // var pwd = "";
        // if(this.state.password == "")
        //     pwd = this.props.navigation.state.params.password;
        // else
        //     pwd = this.state.password;
        // let user = {
        //     id: this.props.navigation.state.params.id,
        //     name:  this.state.name,
        //     email:  this.state.email,
        //     phone:  this.state.phone,
        //     address:  this.state.address,
        //     password:  pwd,
        //     city:  this.state.city,
        //     state:  this.state.ustate,
        //     zipcode:  this.state.zipcode,
        //     status: this.state.cstate
        // };
    
        // fetch(`${c.API}/customers/update`, {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(user),
        //     })
        //     .then((response) => response.json())
        //     .then((responseJson) => {
        
        //         if(!responseJson.status){

        //         }
        //             Toast.show("Customer Updated")
        //             this.setState({email : ''});
        //             this.setState({name  : ''});
        //             this.setState({phone : ''});
        //             this.setState({password   : ''});
        //             this.setState({address :''});
        //             this.setState({city :''});
        //             this.setState({ustate:''});
        //             this.setState({zipcode:''});
        //     })
        //     .catch(err => {console.warn(err) })
        //     .done();
        //     // this.props.navigation.navigate({
        //     //     routeName: 'Customer',
               
        //     //   })
        //     this.props.navigation.goBack();
    }
    else
    {
      if(this.state.ProductId == "") Toast.show("Please Choose Product Name!!");
      else if(this.state.CustomerId == "") Toast.show("Please Choose Customer Name!!");
      else if(this.state.ProductTypeId == "") Toast.show("Please Choose Product Type!!");
      else if(this.state.ServiceTypeId == "") Toast.show("Please Choose Service Type!!");
      else if(this.state.message == "") Toast.show("Please Fill Message!!");
      else{
        service = new FormData();
        service.append("product_id",this.state.ProductId);
        service.append("customer_id",this.state.CustomerId);
        service.append("product_type",this.state.ProductTypeId);
        service.append("service_type",this.state.ServiceTypeId);
        service.append("message",this.state.message);

      fetch(`${c.API}/services`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
          },
          body:service,
          })
          .then((response) => response.json())
          .then((responseJson) => {
            if(responseJson.success)
            {
                Toast.show("Customer added")
                this.props.navigation.goBack();
            }
            else
            {
              Toast.show(responseJson)
            }
          })
          .catch(err => {console.warn(err) })
          .done();
      }
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
              onChangeText={(message) => this.setState({ message})}
             // onSubmitEditing={() => this.message.focus()}
              placeholder="Message"
              returnKeyType="next"
             // style={[styles.textInput, this.state.messageError? styles.error:null]}
              autoCorrect={false}
              value={this.state.message}
            />
            <Text>Product Name </Text>
            <CustomPicker 
              options={renderProductInfo(this.state.ProductInfo)}
              value={(this.state.ProductInfo)?{label: this.state.ProductName ,value: this.state.ProductId }:{}}
              getLabel={(item) => item.label}
              onValueChange={(value, i) => {
                this.state.ProductId = value.value;
                this.state.ProductName = value.label;
              }}
            />

            {/* <Text>product Info  </Text>
            <CustomPicker 
              options={renderProductInfo(this.state.ProductInfo)}
              value={(this.state.ProductInfo)?{label: this.state.ProductName ,value: this.state.ProductId }:{}}
              getLabel={(item) => item.label}
              onValueChange={(value, i) => {
                this.state.ProductId = value.value;
                this.state.ProductName = value.label;
              }}
            /> */}

            <Text>Priority  </Text>
            <CustomPicker 
              options={renderPriority(this.state.Priority)}
              value={(this.state.Priority)?{label: this.state.PriorityName ,value: this.state.PriorityId }:{}}
              getLabel={(item) => item.label}
              onValueChange={(value, i) => {
                this.state.PriorityId = value.value;
                this.state.PriorityName = value.label;
              }}
            />

            <Text>Product Type  </Text>
            <CustomPicker 
              options={renderProductType(this.state.ProductType)}
              value={(this.state.ProductType)?{label: this.state.ProductTypeName ,value: this.state.ProductTypeId }:{}}
              getLabel={(item) => item.label}
              onValueChange={(value, i) => {
                this.state.ProductTypeId = value.value;
                this.state.ProductTypeName = value.label;
              }}
            />

            <Text>Service Type  </Text>
            <CustomPicker 
              options={renderServiceType(this.state.ServiceType)}
              value={(this.state.ServiceType)?{label: this.state.ServiceTypeName ,value: this.state.ServiceTypeId }:{}}
              getLabel={(item) => item.label}
              onValueChange={(value, i) => {
                this.state.ServiceTypeId = value.value;
                this.state.ServiceTypeName = value.label;
              }}
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

const renderProductInfo = (ProductInfo) => {
  return ProductInfo.map(it => {
      return {value: it.id,label :it.name}
  }) 
}
const renderPriority = (Priority) => {
  return Priority.map(it => {
      return {value: it.id,label :it.name}
  }) 
}
const renderProductType = (ProductType) => {
  return ProductType.map(it => {
      return {value: it.id,label :it.name}
  }) 
}
const renderServiceType = (ServiceType) => {
  return ServiceType.map(it => {
      return {value: it.id,label :it.name}
  }) 
}
const renderCustomer = (Priority) => {
  return Priority.map(it => {
      return {value: it.id,label :it.name}
  }) 
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
