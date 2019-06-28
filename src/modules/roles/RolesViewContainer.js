// @flow
import { compose, lifecycle, withState } from 'recompose';
import { connect } from 'react-redux';

import RolesView from './RolesView';
import { rolesList } from './RolesState';

export default compose(
  connect(
    state => ({
      messagesList: state.chat.messagesList,
      messagesListLoading: state.chat.messagesListLoading,
    }),
    {
      rolesList,
    },
  ),
  lifecycle({
    componentDidMount() {
      this.props.rolesList();
    },
  }),
  withState('searchText', 'setSearchText', ''),
)(RolesView);
