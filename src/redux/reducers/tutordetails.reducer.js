export const tutorDetails = (state = {}, action) => {
    switch (action.type) {
      case 'SET_TUTOR_DETAILS':
        return action.payload;
      default:
        return state;
    }
  };