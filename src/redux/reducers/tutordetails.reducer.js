export const tutorDetails = (state = null, action) => {
    switch (action.type) {
      case 'SET_TUTOR_DETAILS':
        return action.payload;
      default:
        return state;
    }
  };