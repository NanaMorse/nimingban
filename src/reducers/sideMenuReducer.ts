import * as Types from '../constants/actionTypes';

export default (state:any = {}, action: any) => {
  switch (action.type) {

    case Types.TOGGLE_SIDE_MENU : {

      return Object.assign({}, state, {
        show: !state.show
      });
    }

    default : {
      return state;
    }
  }
}