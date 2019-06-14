// @flow
import { compose, lifecycle, withState } from 'recompose';
import { connect } from 'react-redux';

import MachineTypeView from './MachineTypeView';
import { machineList } from './MachineTypeState';

export default compose(
  connect(
    state => ({
      messagesList: state.chat.messagesList,
      messagesListLoading: state.chat.messagesListLoading,
    }),
    {
      machineList,
    },
  ),
  lifecycle({
    componentDidMount() {
      this.props.machineList();
    },
  }),
  withState('searchText', 'setSearchText', ''),
)(MachineTypeView);
