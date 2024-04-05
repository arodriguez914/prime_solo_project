import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

export function* fetchAllSubjects() {
    try {
      // Get the subjects:
      const subjectResponse = yield axios.get('/api/subject');
      // Set the value of the subject reducer:
      yield put({
        type: 'SET_SUBJECT',
        payload: subjectResponse.data,
      });
    } catch (error) {
      console.log('fetchAllSubjects error:', error);
    }
  }

  function* subjectSaga() {
    // yield
    yield takeEvery('FETCH_SUBJECTS', fetchAllSubjects);
  }

  export default subjectSaga;