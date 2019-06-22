import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import axios from 'axios'
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome';
import C from '../../../Constants';

import { colors, fonts } from '../../styles';
import { Dropdown, Button } from '../../common';
import { Text, Title, Caption } from '../../common/StyledText';

class ServiceHistory extends React.Component {

  state = { history: [] }


  async componentDidMount() {
    let historyres = [];
    try
    {
      let resp =  await axios.get(`${C.API}/service_details/history/${this.props.navigation.state.params.id}`);
      historyres = resp.data.data;
    }
    catch(error)
    {
      console.error("error : "+error);
    }
    this.setState({ history: historyres})
  }


  renderExecutiveInformation = () => {
    const history = this.state.history
    return history.map((it, i) => {
      console.warn(it)
      return (
        <View>
          <Text style={styles.itemTwoTitle}>Remark: {it.executive_remark}</Text>
          <Text style={styles.itemTwoSubTitle}>Executive Name : {it.assigned_to_name}</Text>
          <Text style={styles.itemTwoSubTitle}>Executive Email : {it.assigned_to_email}</Text>
          <Text style={styles.itemTwoSubTitle}>Executive Phone : {it.assigned_to_phone}</Text>
        </View>
      )
    })
  }


  
  render() {
    const itemParams = this.props.navigation.state.params;

    // images formatter
    const formattedimages = [];
    for(i=0;i<itemParams.images.length;i++)
    {
      itemParams.images[i] = itemParams.images[i].replace(/\\/g,"/");
      dd = {uri : itemParams.images[i] };
      formattedimages.push( dd);
    }
    console.warn(this.state.history)

    return (
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
          <TouchableOpacity
          key={itemParams.id}
          style={styles.itemTwoContainer}
          onPress={() => this._openArticle(item)}
        >
          <View style={styles.componentsSection}>
            <Text style={styles.componentSectionHeader}>Service Information</Text>
            <Text style={styles.itemTwoTitle}>message : {itemParams.message}</Text>
            <Text style={styles.itemTwoSubTitle}>priority : {itemParams.priority}</Text>
            <Text style={styles.itemTwoPrice}>Created On : {itemParams.createdOn}</Text>
            <Text style={styles.itemTwoPrice}>Type : {itemParams.serviceType}</Text>
          </View>
          <View style={styles.carouselContainer}>
            <Carousel
                autoplay
                sliderWidth={Dimensions.get('window').width}
                itemWidth={Dimensions.get('window').width}
                renderItem={({ item }) => (
                  <Image
                    resizeMode="contain"
                    style={{ height: 250, width: Dimensions.get('window').width }}
                    source={item}
                  />
                )}
                data={formattedimages}
              />
              {itemParams.badge && (
                <View style={styles.badge}>
                  <Caption white bold>
                    {itemParams.badge}
                  </Caption>
                </View>
              )}
            </View>      
          
          <View style={styles.componentsSection}>
            <Text style={styles.componentSectionHeader}>Product Information</Text>
            <Text style={styles.itemTwoTitle}>{itemParams.product}</Text>
            <Text style={styles.itemTwoSubTitle}>{itemParams.productType.name}</Text>
            <Text style={styles.itemTwoPrice}>{itemParams.price}</Text>
          </View>
      
      
          <View style={styles.componentsSection}>
            <Text style={styles.componentSectionHeader}>Customer Information</Text>
            <Text style={styles.itemTwoTitle}>{itemParams.customerName}</Text>
            <Text style={styles.itemTwoSubTitle}>{itemParams.customerCity}</Text>
            <Text style={styles.itemTwoPrice}>{itemParams.customerState}</Text>
            <Text style={styles.itemTwoSubTitle}>{itemParams.customerEmail}</Text>
            <Text style={styles.itemTwoPrice}>{itemParams.customerPhone}</Text>
          </View>

          <View style={styles.itemTwoContent}>
            <Text>History</Text>
            <View style={styles.itemTwoOverlay} />
            {this.renderExecutiveInformation()}
          </View>
          <View style={styles.carouselContainer}>
            <Carousel
                autoplay
                sliderWidth={Dimensions.get('window').width}
                itemWidth={Dimensions.get('window').width}
                renderItem={({ item }) => (
                  <Image
                    resizeMode="contain"
                    style={{ height: 250, width: Dimensions.get('window').width }}
                    source={item}
                  />
                )}
                data={formattedimages}
              />
              {itemParams.badge && (
                <View style={styles.badge}>
                  <Caption white bold>
                    {itemParams.badge}
                  </Caption>
                </View>
              )}
            </View>   



        </TouchableOpacity>
      
        </ScrollView>
        );
  }

}


// async function ServiceDetailScreen(props) {


//   const _renderRecommendationCard = ({ item }) => (
//     <TouchableOpacity style={styles.recommendationItem}>
//       <View style={styles.recommendationItemTopContainer}>
//         {item.badge && (
//           <View style={styles.recommendationItemBadge}>
//             <Caption white size={12}>
//               {item.badge}
//             </Caption>
//           </View>
//         )}
 
//          <View style={styles.recommendationItemRating}>
//            <Caption bold color={colors.yellow}>
//              {item.rating}
//            </Caption>
//          </View>
//       </View>
//       <Image
//         style={{ width: 150, height: 100 }}
//         source={require('../../../assets/images/nike1.png')}
//         resizeMode="contain"
//       />
//       <View style={styles.recommendationBody}>
//         <Text color={colors.gray} style={styles.recommendationTitle}>
//           {item.title}
//         </Text>
//         <Text color={colors.primaryLight}>{item.brand}</Text>
//         <View style={{ marginTop: 5, flexDirection: 'row' }}>
//           {item.oldPrice && (
//             <Text lineThrough color={colors.gray} style={{ marginRight: 10 }}>
//               {item.oldPrice}
//             </Text>
//           )}
//           <Text color={item.oldPrice ? colors.secondary : colors.gray}>
//             {item.price}
//           </Text>
//         </View>
//       </View>
//     </TouchableOpacity>
  
//   );
 
//   const itemParams = props.navigation.state.params;
  
// let historyres = [];
//   try
//   {
//    console.warn(`${C.API}/service_details/history/${itemParams.id}`)
//  let resp =  await fetch(`${C.API}/service_details/history/${itemParams.id}`//, {
//     method: 'GET',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     }//,
//     //body: JSON.stringify(""),
//     }
// )


    // .then((response) => response.json())
    // .then((responseJson) => { 
    //   tmpres = responseJson;
  
    //   historyres = tmpres.data;
      
      // for(i=0;i<rs.length;i++)
      // {
        
      //    var tmp = {};
      //    tmp.id = rs[i].id; 
      //    tmp.priority = rs[i].priority;
      //    tmp.images = rs[i].service_images;
      //    tmp.createdOn =rs[i].created_on;
      //    tmp.message = rs[i].message;
      //    tmp.serviceType = rs[i].service_type.name;
      //    tmp.product = rs[i].product.name;
      //    tmp.productType = rs[i].product_type;
      //    tmp.customerName = rs[i].customer.name;
      //    tmp.customerCity = rs[i].customer.city;
      //    tmp.customerState = rs[i].customer.state;
      //    tmp.customerEmail = rs[i].customer.email;
      //    tmp.customerPhone = rs[i].customer.phone;
      //    if(rs[i].state == "New")
      //     new_service_data.push(tmp);
      //    if(rs[i].state == "In Progress")
      //     progress_service_data.push(tmp);
      //    if(rs[i].state == "Pending")
      //     pending_service_data.push(tmp);
      //    if(rs[i].state == "Completed")
      //     completed_service_data.push(tmp);
      // }
    // })
    // .catch(err => {console.warn(err) })
    // .done();
  // }
  // catch(error)
  // {
  //   console.warn(error)
  // }
  


// images formatter
// const formattedimages = [];
//   for(i=0;i<itemParams.images.length;i++)
//   {
//     itemParams.images[i] = itemParams.images[i].replace(/\\/g,"/");
//     dd = {uri : itemParams.images[i] };
//     formattedimages.push( dd);
//   }

//   return (
// <ScrollView style={styles.container}>
//     <TouchableOpacity
//     key={itemParams.id}
//     style={styles.itemTwoContainer}
//     onPress={() => this._openArticle(item)}
//   >
//     <View style={styles.itemTwoContent}>
//       <Text>Service Information</Text>
//       <View style={styles.itemTwoOverlay} />
//       <Text style={styles.itemTwoTitle}>message : {itemParams.message}</Text>
//       <Text style={styles.itemTwoSubTitle}>priority : {itemParams.priority}</Text>
//       <Text style={styles.itemTwoPrice}>Created On : {itemParams.createdOn}</Text>
//       <Text style={styles.itemTwoPrice}>Type : {itemParams.serviceType}</Text>
//     </View>
//     <View style={styles.carouselContainer}>
//       <Carousel
//           autoplay
//           sliderWidth={Dimensions.get('window').width}
//           itemWidth={Dimensions.get('window').width}
//           renderItem={({ item }) => (
//             <Image
//               resizeMode="contain"
//               style={{ height: 250, width: Dimensions.get('window').width }}
//               source={item}
//             />
//           )}
//           data={formattedimages}
//         />
//         {itemParams.badge && (
//           <View style={styles.badge}>
//             <Caption white bold>
//               {itemParams.badge}
//             </Caption>
//           </View>
//         )}
//       </View>      
    

//     <View style={styles.itemOneContent}>
//       <Text>Product Information</Text>
//       <View style={styles.itemTwoOverlay} />
//       <Text style={styles.itemTwoTitle}>{itemParams.product}</Text>
//       <Text style={styles.itemTwoSubTitle}>{itemParams.productType.name}</Text>
//       <Text style={styles.itemTwoPrice}>{itemParams.price}</Text>
//     </View>


//     <View style={styles.itemOneContent}>
//       <Text>Customer Information</Text>
//       <View style={styles.itemTwoOverlay} />
//       <Text style={styles.itemTwoTitle}>{itemParams.customerName}</Text>
//       <Text style={styles.itemTwoSubTitle}>{itemParams.customerCity}</Text>
//       <Text style={styles.itemTwoPrice}>{itemParams.customerState}</Text>
//       <Text style={styles.itemTwoSubTitle}>{itemParams.customerEmail}</Text>
//       <Text style={styles.itemTwoPrice}>{itemParams.customerPhone}</Text>
//     </View>
//   </TouchableOpacity>

//   </ScrollView>



    // 
    //   <View style={styles.header}>
    //     <View
    //       style={{
    //         flexDirection: 'column',
    //         flex: 1,
    //       }}
    //     >
    //       <View>
    //         <Title bold color={colors.gray}>
    //           {itemParams.title}
    //         </Title>
    //         <Text>
    //           {itemParams.serviceType}, {itemParams.createdOn}
    //         </Text>
           
    //       </View>
    //       <View style={{ paddingTop: 20 }}>
    //       {/* <Text color={colors.primaryLight}>Size Guide</Text> */}
    //       <Text style={{ color: colors.primaryLight }}>{itemParams.name},{itemParams.city}</Text>
    //       <Text>{itemParams.message}</Text>
    //       <View style={styles.row}>
    //         <View style={styles.sizeDropdownContainer}>
    //           <Dropdown
    //             borderColor={colors.grey}
    //             color={colors.gray}
    //             placeholder="Select Status"
    //             items={[
    //               'New',
    //               'In Progress',
    //               'Pending',
    //               'Completed'
                 
    //             ]}
    //             onSelect={index =>
    //               props.setSelectedSizeIndex(parseInt(index, 10))
    //             }
    //             selectedIndex={props.selectedSizeIndex}
    //           />
    //         </View>
    //         <View style={styles.quantityDropdownContainer}>
    //           <Dropdown
    //             borderColor={colors.grey}
    //             color={colors.gray}
    //             placeholder="Priority"
    //             items={[
    //               'Normal',
    //               'Low',
    //               'High',
    //             ]}
    //             onSelect={index =>
    //               props.setSelectedQuantityIndex(parseInt(index, 10))
    //             }
    //             selectedIndex={props.selectedQuantityIndex}
    //           />
    //         </View>
    //       </View>

    //     </View>
    //     </View>
        
    //   </View>
    //   <View style={styles.carouselContainer}>
    //     <Carousel
    //       autoplay
    //       sliderWidth={Dimensions.get('window').width - 30}
    //       itemWidth={Dimensions.get('window').width}
    //       renderItem={({ item }) => (
    //         <Image
    //           resizeMode="contain"
    //           style={{ height: 250, width: Dimensions.get('window').width }}
    //           source={item}
    //         />
    //       )}
    //       data={formattedimages}
    //     />
    //     {itemParams.badge && (
    //       <View style={styles.badge}>
    //         <Caption white bold>
    //           {itemParams.badge}
    //         </Caption>
    //       </View>
    //     )}
    //   </View>
    //   <View style={styles.bodyContainer}>
    //     <View style={styles.bodyHeading}>
    //       <Title color={colors.gray} size={23}>
    //         {itemParams.price}
    //       </Title>
    //       <Caption underline size={15} color={colors.lightGray}>
           
    //       </Caption>
    //     </View>

    //     <View style={styles.buttonsSection}>
    //       <View style={{ flex: 3 }}>
    //         <Button secondary caption="Add To Bag" rounded />
    //       </View>
    //       <View style={styles.actionButtonContainer}>
    //         <Button action bgColor="#E6E6E6">
    //           <Text>
    //             <Icon name="heart" size={20} color="white" />
    //           </Text>
    //         </Button>
    //       </View>
    //     </View>
    //     <View style={styles.description}>
    //       <Title bold color={colors.lightGray} size={17}>
    //         Service Details
    //       </Title>

    //       <Text style={styles.p}>
    //        ........
    //       </Text>
    //     </View>

    //     {/* <View style={{ alignItems: 'center', paddingVertical: 15 }}>
    //       <Button
    //         bordered
    //         bgColor={colors.grey}
    //         textColor={colors.gray}
    //         caption="Write a review"
    //         style={{
    //           width: 200,
    //         }}
    //       />
    //     </View> */}
    //   </View>
    //   {/*
    //   <View style={styles.recommendationsContainer}>
    //     <Title color={colors.lightGray} style={{ marginVertical: 10 }}>
    //       YOU MIGHT ALSO LIKE
    //     </Title>
    //     <FlatList
    //       showsHorizontalScrollIndicator={false}
    //       horizontal
    //       data={recommendations}
    //       keyExtractor={item => `${item.id}`}
    //       renderItem={_renderRecommendationCard}
    //     />
    //   </View>

    //   <View style={{ paddingBottom: 50, paddingHorizontal: 15 }}>
    //     <Title color={colors.lightGray} style={{ marginVertical: 10 }}>
    //       Share
    //     </Title>
    //     <View style={{ flexDirection: 'row' }}>
    //       <Text color={colors.gray}>Share with a tag</Text>
    //       <Text color={colors.blue} style={{ marginLeft: 5 }}>
    //         #whitetrainers
    //       </Text>
    //     </View>

    //     <View style={{ flexDirection: 'row', marginTop: 15 }}>
    //       <Button action bgColor="#4867AD" onPress={() => {}}>
    //         <Icon name="facebook" size={25} color="white" />
    //       </Button>
    //       <Button
    //         action
    //         bgColor="#7A3EB1"
    //         onPress={() => {}}
    //         style={{ marginHorizontal: 15 }}
    //       >
    //         <Icon name="instagram" size={25} color="white" />
    //       </Button>
    //       <Button action bgColor={colors.yellow} onPress={() => {}}>
    //         <Icon name="snapchat" size={25} color="white" />
    //       </Button>
    //     </View>
        
    //   </View>
    //   */}
    // </ScrollView>
  
  
//   );
// }


export default ServiceHistory;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bluish,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  componentSectionHeader: {
    fontFamily: fonts.primaryRegular,
    color: '#686868',
    fontSize: 20,
    marginBottom: 20,
  },
  tabsContainer: {
    alignSelf: 'stretch',
    marginTop: 30,
  },
  itemOneContainer: {
    flex: 1,
    width: Dimensions.get('window').width / 2 - 40,
  },
  itemOneImageContainer: {
    borderRadius: 3,
    overflow: 'hidden',
  },
  itemOneImage: {
    height: 200,
    width: Dimensions.get('window').width / 2 - 40,
  },
  itemOneTitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  itemOneSubTitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 13,
    color: '#B2B2B2',
    marginVertical: 3,
  },
  itemOnePrice: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  itemOneRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  itemOneContent: {
    marginTop: 5,
    marginBottom: 10,
  },
  itemTwoContainer: {
    paddingBottom: 10,
    backgroundColor: 'white',
    marginVertical: 5,
  },
  itemTwoContent: {
    padding: 20,
    position: 'relative',
    marginHorizontal: Platform.OS === 'ios' ? -15 : 0,
    height: 150,
  },
  itemTwoTitle: {
    color: colors.black,
    fontFamily: fonts.primaryBold,
    fontSize: 20,
  },
  itemTwoSubTitle: {
    color: colors.black,
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
    marginVertical: 5,
  },
  itemTwoPrice: {
    color: colors.black,
    fontFamily: fonts.primaryBold,
    fontSize: 20,
  },
  itemTwoImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  itemTwoOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#6271da',
    opacity: 0.5,
  },
  itemThreeContainer: {
    backgroundColor: 'white',
  },
  itemThreeSubContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  itemThreeImage: {
    height: 100,
    width: 100,
  },
  itemThreeContent: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: 'space-between',
  },
  itemThreeBrand: {
    fontFamily: fonts.primaryRegular,
    fontSize: 14,
    color: '#617ae1',
  },
  itemThreeTitle: {
    fontFamily: fonts.primaryBold,
    fontSize: 16,
    color: '#5F5F5F',
  },
  itemThreeSubtitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 12,
    color: '#a4a4a4',
  },
  itemThreeMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemThreePrice: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
    color: '#5f5f5f',
    textAlign: 'right',
  },
  itemThreeHr: {
    flex: 1,
    height: 1,
    backgroundColor: '#e3e3e3',
    marginRight: -15,
  },
  badge: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },


  
  componentsSection: {
    backgroundColor: colors.white,
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
  
  carouselContainer: {
        marginVertical:0,
        paddingHorizontal: 0,
      },
});


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 20,
//     backgroundColor: 'white',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 15,
//   },
//   carouselContainer: {
//     marginVertical: 10,
//     paddingHorizontal: 15,
//   },
//   bodyContainer: {
//     paddingHorizontal: 15,
//   },
//   bodyHeading: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-end',
//   },
//   row: {
//     flexDirection: 'row',
//   },
//   sizeDropdownContainer: {
//     flex: 2,
//     paddingVertical: 10,
//     paddingRight: 5,
//   },
//   quantityDropdownContainer: {
//     flex: 1,
//     paddingVertical: 10,
//     paddingLeft: 5,
//   },
//   buttonsSection: {
//     flexDirection: 'row',
//     marginVertical: 10,
//   },
//   actionButtonContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   p: {
//     marginVertical: 5,
//     lineHeight: 20,
//     letterSpacing: 0,
//     color: colors.gray,
//   },
//   description: {
//     paddingTop: 10,
//     marginVertical: 10,
//   },
//   recommendationsContainer: {
//     backgroundColor: colors.white,
//     marginTop: 10,
//     paddingHorizontal: 15,
//   },
//   recommendationItem: {
//     marginVertical: 10,
//     paddingBottom: 10,
//     marginRight: 15,
//     borderWidth: 0.7,
//     borderColor: colors.lightGray,
//   },
//   recommendationBody: {
//     backgroundColor: 'white',
//     padding: 8,
//   },
//   recommendationTitle: {
//     marginVertical: 5,
//   },
//   badge: {
//     paddingHorizontal: 10,
//     paddingVertical: 3,
//     backgroundColor: colors.green,
//     position: 'absolute',
//     left: 15,
//     top: 0,
//   },
//   recommendationItemTopContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//     paddingRight: 5,
//   },
//   recommendationItemBadge: {
//     backgroundColor: colors.secondary,
//     paddingVertical: 3,
//     paddingHorizontal: 10,
//   },
//   recommendationItemRating: {
//     flex: 1,
//     alignItems: 'flex-end',
//     justifyContent: 'center',
//     paddingVertical: 3,
//   },
// });
