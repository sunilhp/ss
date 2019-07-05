import { compose, withState } from 'recompose';
import C from '../../../Constants';
import LeadsView from './LeadsView';

const unassigned_lead_data = [];
const new_lead_data = [];
const dealDone_lead_data =[];
const dead_lead_data = [];
const completed_lead_data = [];
const progress_lead_data = [];


function getLeads(){
fetch(`${C.API}/leads/get`, {
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
    for(let i=0;i<rs.length;i++)
    { 
      var tmp = {};
      tmp.id = rs[i].id; 
      tmp.status = rs[i].status;
      tmp.createdOn = rs[i].created_on;
      tmp.message = rs[i].message;
      tmp.name = rs[i].name;
      tmp.city = rs[i].city;
      tmp.state = rs[i].state;
      tmp.address = rs[i].address;
      tmp.email = rs[i].email;
      tmp.phone = rs[i].phone;
      
      if(rs[i].status == "Unassigned")
        unassigned_lead_data.push(tmp);
      if(rs[i].status == "New")
        new_lead_data.push(tmp);
      if(rs[i].status == "In-Progress")
        progress_lead_data.push(tmp);
      if(rs[i].status == "Deal-Done")
        dealDone_lead_data.push(tmp);
      if(rs[i].status == "Dead")
        dead_lead_data.push(tmp);
      if(rs[i].status == "Completed")
        completed_lead_data.push(tmp);
    }
  })
  .catch(err => {console.warn("error is "+err) })
  .done();
}
  

getLeads();

export default compose(
  withState('tabIndex', 'setTabIndex', 0),
  withState('tabs', 'setTabs', ['Unassigned','New', 'In Progress','Dead', 'Deal Done' ,'Completed' ]),
  withState('unassigned_leads', 'setData', unassigned_lead_data),
  withState('new_leads', 'setData', new_lead_data),
  withState('dealDone_leads', 'setData', dealDone_lead_data),
  withState('dead_leads', 'setData', dead_lead_data),
  withState('completed_leads', 'setData', completed_lead_data),
  withState('progress_leads', 'setData', progress_lead_data),
  withState('activeTab',this.props)
)(LeadsView);
