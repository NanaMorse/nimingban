import { connect } from 'react-redux';
import SideMenu from '../components/SideMenu';

function mapStateToProps(state) {
  return state.sideMenu;
}

function mapDispatchToProps(dispatch) {
  return {
    
  }
}

const SideMenuContainer = connect(mapStateToProps, mapDispatchToProps)(SideMenu);

export default SideMenuContainer;
