import { compose, withState } from 'recompose';
import C from '../../../Constants';
import ServicesView from './ServicesView';

const unassigned_service_data = [];
const new_service_data = [];
const progress_service_data =[];
const pending_service_data = [];
const completed_service_data = [];

fetch(`${C.API}/services/get`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }//,
  //body: JSON.stringify(""),
  })
  .then((response) => response.json())
  .then((responseJson) => { 
    tmpres = responseJson;

    rs = tmpres.data;
    for(i=0;i<rs.length;i++)
    { 
       var tmp = {};
       tmp.id = rs[i].id; 
       tmp.priority = rs[i].priority;
       tmp.images = rs[i].service_images;
       tmp.createdOn =rs[i].created_on;
       tmp.message = rs[i].message;
       tmp.serviceType = rs[i].service_type.name;
       tmp.serviceTypeId = rs[i].service_type.id;
       tmp.productId = rs[i].product.id;
       tmp.product = rs[i].product.name;
       tmp.productTypeId = rs[i].product_type.id;
       tmp.productType = rs[i].product_type.name;
       tmp.productDescription = rs[i].description;
       tmp.customerId = rs[i].customer.id;
       tmp.customerName = rs[i].customer.name;
       tmp.customerCity = rs[i].customer.city;
       tmp.customerState = rs[i].customer.state;
       tmp.customerEmail = rs[i].customer.email;
       tmp.customerPhone = rs[i].customer.phone;
       tmp.customerAddress = rs[i].customer.address;
       tmp.customerZipcode = rs[i].customer.zipcode;
       
       if(rs[i].state == "Unassigned")
       unassigned_service_data.push(tmp);
       if(rs[i].state == "New")
        new_service_data.push(tmp);
       if(rs[i].state == "In Progress")
        progress_service_data.push(tmp);
       if(rs[i].state == "Pending")
        pending_service_data.push(tmp);
       if(rs[i].state == "Completed")
        completed_service_data.push(tmp);
    }
  })
  .catch(err => {console.warn(err) })
  .done();
  
export default compose(
  withState('tabIndex', 'setTabIndex', 0),
  withState('tabs', 'setTabs', ['Unassigned','New', 'In Progress','Pending', 'Completed' ]),
  withState('unassigned_services', 'setData', unassigned_service_data),
  withState('new_services', 'setData', new_service_data),
  withState('progress_services', 'setData', progress_service_data),
  withState('pending_services', 'setData', pending_service_data),
  withState('completed_services', 'setData', completed_service_data),
)(ServicesView);
