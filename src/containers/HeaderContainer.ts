import { connect } from 'react-redux';

import Header from '../components/Header';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header as any);

export default HeaderContainer;