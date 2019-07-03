import React from 'react';
import { Image, TouchableOpacity, Button,View } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

import GalleryScreen from '../gallery/GalleryViewContainer';

// To use this screens please see the full version at https://reactnativestarter.com
// import ProfileScreen from '../containers/ProfileScreen';
// import ArticleScreen from '../containers/ArticleScreen';
// import ChatScreen from '../containers/chat/ChatScreen';
// import MessagesScreen from '../containers/chat/MessagesScreen';
// import ChartsScreen from '../containers/ChartsScreen';

import ProfileScreen from '../profile/ProfileViewContainer';
import ArticleScreen from '../article/ArticleViewContainer';
import ServiceDetailScreen from '../services/ServiceDetailViewContainer';
import LeadDetailScreen from '../Leads/LeadDetailViewContainer';
import ChatScreen from '../chat/ChatViewContainer';
import MessagesScreen from '../chat/MessagesViewContainer';
import ChartsScreen from '../charts/ChartsViewContainer';
import AuthScreen from '../auth/AuthViewContainer';
import UsersScreen from '../users/UsersViewContainer';
import UsersAddScreen from '../users/UsersAdd';
import CustomerScreen from '../customer/CustomerViewContainer';
import CustomerAddScreen from '../customer/CustomerAdd';
import ServiceTypeScreen from '../serviceType/ServiceTypeViewContainer';
import ServiceTypeAddScreen from '../serviceType/ServiceTypeAdd';
import ServicesScreen from '../services/ServicesViewContainer';
import ProductTypeScreen from '../productType/ProductTypeViewContainer';
import ProductTypeAddScreen from '../productType/ProductTypeAdd';
import RolesScreen from '../roles/RolesViewContainer';
import RolesAddScreen from '../roles/RolesAdd';
import ProductAddScreen from '../product/ProductAdd';
import ProductScreen from '../product/ProductViewContainer';
import TrackDetailScreen from '../track/TrackDetailViewContainer'

import { colors, fonts } from '../../styles';

const headerBackground = require('../../../assets/images/topBarBg.png');

const stackNavigator = createStackNavigator(
  {
    Main: {
      screen: MainTabNavigator,
      navigationOptions: () => ({
        title: 'Guru Amar Industries',
        headerLeft: null,
        headerBackground: (
          <Image
            style={{ flex: 1 }}
            source={headerBackground}
            resizeMode="cover"
          />
        ),
      }),
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        title: 'Profile',
      },
    },
    Roles: {
      screen: RolesScreen,
      navigationOptions: {
        title: 'Roles',
      },
    },
    TrackDetail: {
      screen: TrackDetailScreen,
      navigationOptions: {
        title: 'Track Detail',
      },
    },
    Gallery: {
      screen: GalleryScreen,
      navigationOptions: {
        title: 'Gallery',
      },
    },
    Article: {
      screen: ArticleScreen,
      navigationOptions: {
        title: 'Article',
      },
    },
    Track: {
      screen: TrackDetailScreen,
      navigationOptions: {
        title: 'Track',
      },
    },
    Chat: {
      screen: ChatScreen,
      navigationOptions: {
        title: 'Customers',
      },
    },
    Messages: {
      screen: MessagesScreen,
      navigationOptions: {
        title: 'Messages',
      },
    },
    Charts: {
      screen: ChartsScreen,
      navigationOptions: {
        title: 'Charts',
      },
    },
    Auth: {
      screen: AuthScreen,
      navigationOptions: {
        header: null,
      },
    },
    UsersAdd: {
      screen: UsersAddScreen,
      navigationOptions: {
      title: 'Users',
      },
    },
    CustomerAdd: {
      screen: CustomerAddScreen,
      navigationOptions: {
      title: 'Customer Information',
      },
    },
    ProductAdd: {
      screen: ProductAddScreen,
      navigationOptions: {
      title: 'Product Information',
      },
    },
    ServiceTypeAdd: {
      screen: ServiceTypeAddScreen,
      navigationOptions: {
      title: 'Service Type',
      },
    },
   ProductTypeAdd: {
      screen: ProductTypeAddScreen,
      navigationOptions: {
      title: 'Product Type',
      },
    },
    RolesAdd: {
      screen: RolesAddScreen,
      navigationOptions: {
      title: 'Roles',
      },
    },
    Customer: {
      screen: CustomerScreen,
      navigationOptions: ({navigation}) => ({
        title: 'Customers',
        headerRight: (
          <View style={{ flexDirection: 'row' }}>
             <TouchableOpacity
               onPress={() => navigation.navigate('CustomerAdd')}
               style={{
                 paddingRight: 10,
               }}
             >
               <Image
                 source={require('../../../assets/images/icons/plus.png')}
                 resizeMode="contain"
                 style={{
                   width: 30,
                   height: 20,
                 }}
               />
             </TouchableOpacity>
           </View>
        ),
        headerBackground: (
          <Image
            style={{ flex: 1 }}
            source={headerBackground}
            resizeMode="cover"
          />
        ),
      }),
     
    },
    Products: {
      screen: ProductScreen,
      navigationOptions: ({navigation}) => ({
        title: 'Products',
        headerRight: (
          <View style={{ flexDirection: 'row' }}>
             <TouchableOpacity
               onPress={() => navigation.navigate('ProductAdd')}
               style={{
                 paddingRight: 10,
               }}
             >
               <Image
                 source={require('../../../assets/images/icons/plus.png')}
                 resizeMode="contain"
                 style={{
                   width: 30,
                   height: 20,
                 }}
               />
             </TouchableOpacity>
           </View>
        ),
        headerBackground: (
          <Image
            style={{ flex: 1 }}
            source={headerBackground}
            resizeMode="cover"
          />
        ),
      }),
     
    },
    Users: {
      screen: UsersScreen,
      navigationOptions: ({navigation}) => ({
        title: 'Users',
        headerRight: (
          <View style={{ flexDirection: 'row' }}>
             <TouchableOpacity
               onPress={() => navigation.navigate('UsersAdd')}
               style={{
                 paddingRight: 10,
               }}
             >
               <Image
                 source={require('../../../assets/images/icons/plus.png')}
                 resizeMode="contain"
                 style={{
                   width: 30,
                   height: 20,
                 }}
               />
             </TouchableOpacity>
           </View>
        ),
        headerBackground: (
          <Image
            style={{ flex: 1 }}
            source={headerBackground}
            resizeMode="cover"
          />
        ),
      }),
    },
    ServiceDetail: {
      screen: ServiceDetailScreen,
      navigationOptions: {
        title: 'Service Detail',
      },
    },
    LeadDetail: {
      screen: LeadDetailScreen,
      navigationOptions: {
        title: 'Lead Detail',
      },
    },    
    Services: {
      screen: ServicesScreen,
      navigationOptions: {
        title: 'Services',
      },
    },
    ServiceType: {
      screen: ServiceTypeScreen,
      navigationOptions: ({navigation}) => ({
        title: 'Service Type',
        headerRight: (
          <View style={{ flexDirection: 'row' }}>
             <TouchableOpacity
               onPress={() => navigation.navigate('ServiceTypeAdd')}
               style={{
                 paddingRight: 10,
               }}
             >
               <Image
                 source={require('../../../assets/images/icons/plus.png')}
                 resizeMode="contain"
                 style={{
                   width: 30,
                   height: 20,
                 }}
               />
             </TouchableOpacity>
           </View>
        ),
        headerBackground: (
          <Image
            style={{ flex: 1 }}
            source={headerBackground}
            resizeMode="cover"
          />
        ),
      }),
    },
    ProductType: {
      screen: ProductTypeScreen,
      navigationOptions: ({navigation}) => ({
        title: 'Product Type',
        headerRight: (
          <View style={{ flexDirection: 'row' }}>
             <TouchableOpacity
               onPress={() => navigation.navigate('ProductTypeAdd')}
               style={{
                 paddingRight: 10,
               }}
             >
               <Image
                 source={require('../../../assets/images/icons/plus.png')}
                 resizeMode="contain"
                 style={{
                   width: 30,
                   height: 20,
                 }}
               />
             </TouchableOpacity>
           </View>
        ),
        headerBackground: (
          <Image
            style={{ flex: 1 }}
            source={headerBackground}
            resizeMode="cover"
          />
        ),
      }),
    },
  },
  {
    defaultNavigationOptions: () => ({
      titleStyle: {
        fontFamily: fonts.primaryLight,
      },
      headerStyle: {
        backgroundColor: colors.primary,
        borderBottomWidth: 0,
      },
      headerBackground: (
        <Image
          style={{ flex: 1 }}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTitleStyle: {
        color: colors.white,
        fontFamily: fonts.primaryRegular,
      },
      headerTintColor: '#222222',
      headerLeft: props => (
        <TouchableOpacity
          onPress={props.onPress}
          style={{
            paddingLeft: 25,
          }}
        >
          <Image
            source={require('../../../assets/images/icons/arrow-back.png')}
            resizeMode="contain"
            style={{
              height: 20,
            }}
          />
        </TouchableOpacity>
      ),
    }),
  },
);



export default createAppContainer(stackNavigator);
