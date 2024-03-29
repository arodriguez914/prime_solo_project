
import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

export function* getSessionSaga() {
  try {
    // Get the session:
    const sessionResponse = yield axios.get('/api/session');
    // Set the value of the session reducer:
    yield put({
      type: 'GET_SESSION',
      payload: sessionResponse.data,
    });
  } catch (error) {
    console.log('fetchAllSessions error:', error);
  }
}

//POST route 
function* postSessionSaga(action) {
    // try catch block
    try {
      // POST a new session
      yield axios({
        method: 'POST',
        url: '/api/session',
        data: { date, time, duration: action.payload },
      });
      // dispatch to refresh GET
      yield put({ type: 'GET_SESSION' });
    } catch (error) {
      // error surface to user
      console.log('ERROR:', error);
    }
  }

  function* putSessionSaga(action) {
    console.log('running SESSION SAGA:', action);
    // try catch block
    try {
      // code to try running HERE
      const sessionResponse = yield axios({
        method: 'PUT',
        url: `/api/session${action.payload.id}`,
        data: { id: action.payload },
      });
      yield put({ type: 'GET_SESSION', payload: sessionResponse.data });
    } catch (error) {
      console.log('ERROR:', error)    
    }
  }

//DELETE ROUTE
function* deleteSessionSaga(action) {
    // try catch block
    try {
      // DELETE a session
      yield axios({
        method: 'DELETE',
        url: `/api/session/${action.payload.id}`,
        data: { id: action.payload },
      });
      // dispatch to refresh GET
      yield put({ type: 'GET_SESSION' });
    } catch (error) {
      // error surface to user
      console.log('ERROR:', error);
    }
  }

function* sessionSaga() {
    yield takeLatest('GET_SESSION', getSessionSaga);
    yield takeEvery('POST_SESSION', postSessionSaga);
    yield takeEvery('PUT_SESSION', putSessionSaga);
    yield takeEvery('DELETE_SESSION', deleteSessionSaga);
  }

  export default sessionSaga;


  