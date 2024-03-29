const subjectReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_SUBJECT':
        return action.payload;
      case 'UNSET_SUBJECT':
        return {};
      default:
        return state;
    }
  };

  export default subjectReducer;