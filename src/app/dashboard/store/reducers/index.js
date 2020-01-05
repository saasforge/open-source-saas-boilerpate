const initialState = {
    username: ''
};
  
function rootReducer(state = initialState, action) {
    // More generic approach
    // You can specify any type for action, but more important name of field and value.
    // If needed handle a specific type of action separately.
    const newState = {};
    if (action.name){
        newState[action.name] = action.value;
        return Object.assign({}, state, newState);
    }
    return state;
};

export default rootReducer;