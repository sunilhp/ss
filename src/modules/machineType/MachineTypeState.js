import C from '../../../Constants';


// Initial state
const initialState = {
  messagesList: [],
  messages: {},
  messagesListLoading: false,
};

// Actions
const MESSAGES_LIST_START_LOADING = 'ChatState/MESSAGES_LIST_START_LOADING';
const MESSAGES_LIST_LOADED = 'ChatState/MESSAGES_LIST_LOADED';
const MESSAGES_LOADED = 'ChatState/MESSAGES_LOADED';
const MESSAGE_SENT = 'ChatState/MESSAGE_SENT';

// Action creators
function startMessagesListLoading() {
  return {
    type: MESSAGES_LIST_START_LOADING,
  };
}

function loadedMessagesList(messagesList) {
  return {
    type: MESSAGES_LIST_LOADED,
    messagesList,
  };
}

 export function  machineList() {
  return dispatch => {
    dispatch(startMessagesListLoading());
    // TODO: Load messages list here

    let messagesList = [];
    let tmpres;
   fetch(`${C.API}/product_type/get`, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(),
      })
      .then((response) => response.json())
      .then((responseJson) => { 
        tmpres = responseJson;

        rs = tmpres.data;
        for(i=0;i<rs.length;i++)
        {
           var tmp = {};
           tmp.id = rs[i].id;
           tmp.time = rs[i].created_on;
           tmp.name = rs[i].name;
          
           messagesList.push(tmp);
        }

      })
      .catch(err => {console.warn(err) })
      .done();

      setTimeout(() => {
        dispatch(loadedMessagesList(messagesList));
      }, 1000);
  };
}

function loadedMessages(userId, messages) {
  return {
    type: MESSAGES_LOADED,
    userId,
    messages,
  };
}

function newMessageSent(userId, message) {
  return {
    type: MESSAGE_SENT,
    userId,
    message,
  };
}

export function loadMessages(userId) {
  return dispatch => {
    dispatch(loadedMessages(userId, messagesBackend[userId]));
  };
}

export function sendMessage(userId, message) {
  return dispatch => {
    // Send message here
    dispatch(newMessageSent(userId, message));
  };
}

// Reducer
export default function MachineStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case MESSAGES_LIST_START_LOADING:
      return Object.assign({}, state, {
        messagesListLoading: true,
      });
    case MESSAGES_LIST_LOADED:
      return Object.assign({}, state, {
        messagesListLoading: false,
        messagesList: action.messagesList,
      });
    case MESSAGES_LOADED:
      return Object.assign({}, state, {
        messages: {
          ...state.messages,
          [action.userId]: action.messages,
        },
      });
    case MESSAGE_SENT:
      return Object.assign({}, state, {
        messages: {
          ...state.messages,
          [action.userId]: [
            ...state.messages[action.userId],
            {
              _id: Math.round(Math.random() * 1000000),
              text: action.message,
              createdAt: new Date(),
              user: {
                _id: 1,
                name: 'Developer',
              },
              sent: true,
              received: true,
            },
          ],
        },
      });
    default:
      return state;
  }
}
