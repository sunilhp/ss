import { compose, withState } from 'recompose';
import C from '../../../Constants';
import ServicesView from './ServicesView';

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
       tmp.id = rs[i].id; //status also
       tmp.priority = rs[i].priority;
       tmp.product = rs[i].product.name;
       tmp.customerName = rs[i].customer.name;
       tmp.customerCity = rs[i].customer.city;
       tmp.customerState = rs[i].customer.state;
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
  withState('tabs', 'setTabs', ['New', 'In Progress','Pending', 'Completed' ]),
  withState('new_services', 'setData', new_service_data),
  withState('progress_services', 'setData', progress_service_data),
  withState('pending_services', 'setData', pending_service_data),
  withState('completed_services', 'setData', completed_service_data),
)(ServicesView);
