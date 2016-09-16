import { connect } from 'react-redux';
import * as Actions from '../actions/index';

import Header from '../components/Header';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    onSideMenuToggled: () => {
      dispatch(Actions.toggleSideMenu());
    }
  }
}

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header as any);

export default HeaderContainer;