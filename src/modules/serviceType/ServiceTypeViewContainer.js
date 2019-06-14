// @flow
import { compose, lifecycle, withState } from 'recompose';
import { connect } from 'react-redux';

import ServiceTypeView from './ServiceTypeView';
import { loadMessagesList } from './ServiceTypeState';

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
)(ServiceTypeView);
