import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

export function* fetchAllStudents() {
    try {
      // Get the students:
      const studentResponse = yield axios.get('/api/student');
      // Set the value of the students reducer:
      yield put({
        type: 'SET_STUDENTS',
        payload: studentResponse.data,
      });
    } catch (error) {
      console.log('fetchAllStudents error:', error);
    }
  }

  function* studentSaga() {
    yield takeLatest('FETCH_STUDENTS', fetchAllStudents);
  }
  
  export default studentSaga;