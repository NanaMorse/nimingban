import { connect } from 'react-redux';
import SideMenu from '../components/SideMenu';
import * as Actions from '../actions';

function mapStateToProps(state) {
  return state.sideMenu;
}

function mapDispatchToProps(dispatch) {
  return {
    
    checkoutForumList: function (forumInfo) {
      return dispatch(Actions.checkoutForum(forumInfo));
    },
    
    tryRequestForumList: function () {
      return dispatch(Actions.tryRequestForumList());
    }
  }
}

const SideMenuContainer = connect(mapStateToProps, mapDispatchToProps)(SideMenu);

export default SideMenuContainer;
