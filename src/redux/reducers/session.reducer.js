const session = (state = [], action) => {
    switch (action.type) {
      case 'SET_SESSION':
        return action.payload;
      case 'UNSET_SESSION':
        return {};
      default:
        return state;
    }
  };

  export const pastSession = (state = [], action) => {
    switch (action.type) {
      case 'SET_PAST_SESSION':
        return action.payload;
      default:
        return state;
    }
  };
  
  
  export default session;