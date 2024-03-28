const profileReducer = (state = {}, action) => {
    if (action.type === 'SET_PROFILE_INFO') {
      return action.payload;
    }
  
    return state;
  };

  export default profileReducer;