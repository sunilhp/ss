// import React, { Component } from 'react';
// import { Text, View, } from "react-native";
// class TrackExecutive extends Component {

//   render() {
  

//     return (
//       <View >
//       <Text>hello ..</Text>
//       </View>
//     );
//   }
// }

// export default TrackExecutive;










import { NativeModules, DeviceEventEmitter, PermissionsAndroid } from 'react-native'  
import get from 'lodash/get'  
const { GeoLocation } = NativeModules
class BackgroundGeoLocation {  
  constructor(token, user_id) {
    this.state = null
  }
  start(dispatch, nextState) {
    this.dispatch = dispatch
    const token = get(nextState, 'session.data.token')
    const user_id = get(nextState, 'user.data.user_id')
    const id = get(nextState, 'user.data.id')
    this.state = {
      user_id,
      token,
    }
return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION)
      .then(is_granted => is_granted === PermissionsAndroid.RESULTS.GRANTED
        ? is_granted
        : PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ])
      )
      .then(_ => PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION))
      .then(is_granted => is_granted === PermissionsAndroid.RESULTS.GRANTED ? true : new Error())
      .then(_ => setTimeout(() => GeoLocation.startService(token, user_id, id, `139.59.1.66:3001/track/5d0332b8745d4b5a39e58f91`), 300))
      .catch(e => console.log(e))
  }
  stop() {
    return GeoLocation.stopService()
      .then(_ => console.log(_))
  }
handleLocationChange(geo) {
    console.log(geo)
  }
}
export default BackgroundGeoLocation
