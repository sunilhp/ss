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
    myres = responseJson;
    let serviceresp = myres.data;
    for(let i=0;i<serviceresp.length;i++)
    { 
       var tmp = {};
       tmp.id = serviceresp[i].id; 
       tmp.priority = serviceresp[i].priority;
       tmp.images = serviceresp[i].service_images;
       tmp.createdOn =serviceresp[i].created_on;
       tmp.message = serviceresp[i].message;
       tmp.serviceType = serviceresp[i].service_type.name;
       tmp.serviceTypeId = serviceresp[i].service_type.id;
       tmp.productId = serviceresp[i].product.id;
       tmp.product = serviceresp[i].product.name;
       tmp.productTypeId = serviceresp[i].product_type.id;
       tmp.productType = serviceresp[i].product_type.name;
       tmp.productDescription = serviceresp[i].description;
       tmp.customerId = serviceresp[i].customer.id;
       tmp.customerName = serviceresp[i].customer.name;
       tmp.customerCity = serviceresp[i].customer.city;
       tmp.customeservicereSptate = serviceresp[i].customer.state;
       tmp.customerEmail = serviceresp[i].customer.email;
       tmp.customerPhone = serviceresp[i].customer.phone;
       tmp.customerAddress = serviceresp[i].customer.address;
       tmp.customerZipcode = serviceresp[i].customer.zipcode;
       
       if(serviceresp[i].state == "Unassigned")
       unassigned_service_data.push(tmp);
       if(serviceresp[i].state == "New")
        new_service_data.push(tmp);
       if(serviceresp[i].state == "In Progress")
        progress_service_data.push(tmp);
       if(serviceresp[i].state == "Pending")
        pending_service_data.push(tmp);
       if(serviceresp[i].state == "Completed")
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
