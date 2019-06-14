import { combineReducers } from 'redux';

// ## Generator Reducer Imports
import reviews from '../modules/reviews/ReviewsState';
import navigationType from '../modules/navigationType/NavigationTypeState';
import serviceType from '../modules/serviceType/ServiceTypeState';
import machineType from '../modules/machineType/MachineTypeState';
import staff from '../modules/staff/StaffState';
import customer from '../modules/customer/CustomerState';
import gallery from '../modules/gallery/GalleryState';
import app from '../modules/AppState';
import calendar from '../modules/calendar/CalendarState';
import charts from '../modules/charts/ChartsState';
import chat from '../modules/chat/ChatState';

export default combineReducers({
 // ## Generator Reducers
  reviews,
  navigationType,
  serviceType,
  machineType,
  staff,
  customer,
 gallery,
 app,
 calendar,
 charts,
 chat,
});
