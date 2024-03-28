import { put } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga/effects';
import axios from 'axios';

export function* fetchAllTutors() {
  try {
    // Get the tutors:
    const tutorResponse = yield axios.get('/api/tutor');
    // Set the value of the tutor reducer:
    yield put({
      type: 'SET_TUTORS',
      payload: tutorResponse.data,
    });
  } catch (error) {
    console.log('fetchAllTutors error:', error);
  }
}

export function* fetchTutorDetails(action) {
  try {
    // Get the tutors details:
    const tutorResponse = yield axios.get(`/api/tutor/${action.payload.id}`);
    // Set the value of the tutor reducer:
    yield put({
      type: 'SET_TUTOR_DETAILS',
      payload: tutorResponse.data,
    });
  } catch (error) {
    console.log('fetchTutorDetails error:', error);
  }
}

function* tutorSaga() {
    // yield
    yield takeEvery('FETCH_TUTORS', fetchAllTutors);
    yield takeEvery('FETCH_TUTOR_DETAILS', fetchTutorDetails);
  }

  export default tutorSaga;