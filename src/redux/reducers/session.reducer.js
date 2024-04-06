const sessionReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_SESSION':
        return action.payload;
      case 'UNSET_SESSION':
        return {};
      default:
        return state;
    }
  };
  
  export default sessionReducer;