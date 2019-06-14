import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import { fonts, colors } from './../../styles';
import { Button} from '../../common';

const allIcon = require('../../../assets/images/service/service-all.png');
const newIcon = require('../../../assets/images/service/service-new.png');
const urgentIcon = require('../../../assets/images/service/service-urgent.png');
const pendingIcon = require('../../../assets/images/service/service-pending.png');
const inprogressIcon = require('../../../assets/images/service/service-inprogress.png');
const completeIcon = require('../../../assets/images/service/service-complete.png');
const hotIcon = require('../../../assets/images/service/leads-hot.png');
const coldIcon = require('../../../assets/images/service/leads-cold.png');
const deadIcon = require('../../../assets/images/service/leads-dead.png');



export default function HomeScreen({ isExtended, setIsExtended, props }) {
 
  return (
    <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 20 }}
        >
      <View style={styles.componentsSection}>
        <Text style={styles.componentSectionHeader}>Services Jobs</Text>
        <View style={styles.row}>
          <TouchableOpacity
      onPress={() => this.props.navigation.navigate({ routeName: 'Service'})}
      style={styles.item}>
        <Image
        resizeMode="contain"
        source={allIcon}
        style={styles.itemImage}
        />
        <Text style={styles.itemText}>All</Text>
        <Text style={styles.itemCount}>170</Text>
      </TouchableOpacity>
          <TouchableOpacity
      onPress={() => props.navigation.navigate({ routeName: 'Gallery' })}
      style={styles.item}
      >
        <Image
        resizeMode="contain"
        source={newIcon}
        style={styles.itemImage}
        />
        <Text style={styles.itemText}>New</Text>
        <Text style={styles.itemCount}>12</Text>
      </TouchableOpacity>
          <TouchableOpacity
      onPress={() => props.navigation.navigate({ routeName: 'Profile' })}
      style={styles.item}
      >
      <Image
      resizeMode="contain"
      source={urgentIcon}
      style={styles.itemImage}
      />
      <Text style={styles.itemText}>Urgent</Text>
      <Text style={styles.itemCount}>5</Text>
      </TouchableOpacity>
      </View>
        <View style={styles.row}>
          <TouchableOpacity
      onPress={() => props.navigation.navigate({ routeName: 'Charts' })}
      style={styles.item}>
      <Image
      resizeMode="contain"
      source={pendingIcon}
      style={styles.itemImage}
      />
      <Text style={styles.itemText}>Pending</Text>
      <Text style={styles.itemCount}>70</Text>
      </TouchableOpacity>
          <TouchableOpacity
      onPress={() => props.navigation.navigate({ routeName: 'Gallery' })}
      style={styles.item}
      >
      <Image
      resizeMode="contain"
      source={inprogressIcon}
      style={styles.itemImage}
      />
      <Text style={styles.itemText}>In Progress</Text>
      <Text style={styles.itemCount}>10</Text>
      </TouchableOpacity>
          <TouchableOpacity
      onPress={() => props.navigation.navigate({ routeName: 'Profile' })}
      style={styles.item}
      >
      <Image
      resizeMode="contain"
      source={completeIcon}
      style={styles.itemImage}
      />
      <Text style={styles.itemText} style={{ fontSize: 10, color: 'green' }}>Complete</Text>
      <Text style={styles.itemCount}>55</Text>
      </TouchableOpacity>
      </View>
      </View>
      <View style={styles.componentsSection}>
        <Text style={styles.componentSectionHeader}>Sales Leads</Text>
        <View style={styles.row}>
          <TouchableOpacity
      onPress={() => props.navigation.navigate({ routeName: 'Charts' })}
      style={styles.item}>
        <Image
        resizeMode="contain"
        source={allIcon}
        style={styles.itemImage}
        />
        <Text style={styles.itemText}>All</Text>
        <Text style={styles.itemCount}>70</Text>
      </TouchableOpacity>
          <TouchableOpacity
      onPress={() => props.navigation.navigate({ routeName: 'Gallery' })}
      style={styles.item}
      >
        <Image
        resizeMode="contain"
        source={newIcon}
        style={styles.itemImage}
        />
        <Text style={styles.itemText}>New</Text>
        <Text style={styles.itemCount}>70</Text>
      </TouchableOpacity>
          <TouchableOpacity
      onPress={() => props.navigation.navigate({ routeName: 'Profile' })}
      style={styles.item}
      >
      <Image
      resizeMode="contain"
      source={hotIcon}
      style={styles.itemImage}
      />
      <Text style={styles.itemText}>Hot</Text>
      <Text style={styles.itemCount}>70</Text>
      </TouchableOpacity>
      </View>
        <View style={styles.row}>
          <TouchableOpacity
      onPress={() => props.navigation.navigate({ routeName: 'Charts' })}
      style={styles.item}>
      <Image
      resizeMode="contain"
      source={coldIcon}
      style={styles.itemImage}
      />
      <Text style={styles.itemText}>Cold</Text>
      <Text style={styles.itemCount}>70</Text>
      </TouchableOpacity>
          <TouchableOpacity
      onPress={() => props.navigation.navigate({ routeName: 'Gallery' })}
      style={styles.item}
      >
      <Image
      resizeMode="contain"
      source={deadIcon}
      style={styles.itemImage}
      />
      <Text style={styles.itemText}>Dead</Text>
      <Text style={styles.itemCount}>70</Text>
      </TouchableOpacity>
          <TouchableOpacity
      onPress={() => props.navigation.navigate({ routeName: 'Profile' })}
      style={styles.item}
      >
      <Image
      resizeMode="contain"
      source={completeIcon}
      style={styles.itemImage}
      />
      <Text style={styles.itemText}>Complete</Text>
      <Text style={styles.itemCount}>70</Text>
      </TouchableOpacity>
      </View>
      </View>      
    </ScrollView>
  );
}



const styles = StyleSheet.create({
  componentSectionHeader: {
    fontFamily: fonts.primaryRegular,
    color: '#686868',
    fontSize: 20,
    marginBottom: 10,
    paddingHorizontal: 15,
    
    
  },
  container: {
    flex: 1,
    backgroundColor: colors.bluish,
    paddingTop: 10,
    
  },
  componentsSection: {
    backgroundColor: colors.white,
    padding: 5,
    margin: 10,
    borderRadius: 5,
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  item: {
    flex: 1,
    height: 100,
    paddingVertical: 10,
    borderColor: colors.primaryLight,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 5,
  },
  itemText: {
    color: colors.primary,
    fontFamily: fonts.primary,
  },
  itemImage: {
    height: 35,
  },
  itemCount: {
    fontSize: 12,
    backgroundColor: colors.white,
    padding: 5,
    borderRadius: 5,
    color:'red',

  }
});