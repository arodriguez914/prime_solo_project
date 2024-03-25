import { put } from 'redux-saga/effects';
import axios from 'axios';

export function* fetchAllSessions() {
  try {
    // Get the session:
    const sessionResponse = yield axios.get('/api/session');
    // Set the value of the session reducer:
    yield put({
      type: 'SET_SESSION',
      payload: sessionResponse.data,
    });
  } catch (error) {
    console.log('fetchAllSessions error:', error);
  }
}

function* sessionSaga() {
    yield takeLatest('FETCH_SESSION', fetchAllSessions);
  }

  export default sessionSaga;
