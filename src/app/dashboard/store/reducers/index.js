import {UPDATE_USERNAME} from '../action-types';

const initialState = {
    username: ''
};
  
function rootReducer(state = initialState, action) {
    if (action.type === UPDATE_USERNAME) {
        return Object.assign({}, state, {
            username: action.newName
        });
      }
      return state;
};

export default rootReducer;