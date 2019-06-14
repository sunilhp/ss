// @flow
import { compose, lifecycle, withState } from 'recompose';
import { connect } from 'react-redux';

import StaffView from './StaffView';
import { loadMessagesList } from './StaffState';
export default compose(
  connect(
    state => ({
      messagesList: state.chat.messagesList,
      messagesListLoading: state.chat.messagesListLoading,
    }),
    {
      loadMessagesList,
    },
  ),
  lifecycle({
    componentDidMount() {
      this.props.loadMessagesList();
    },
  }),
  withState('searchText', 'setSearchText', ''),
)(StaffView);