
import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

export function* fetchUpcomingSessions() {
  try {
    // Get the session:
    const sessionResponse = yield axios.get('/api/session/upcoming');
    // Set the value of the session reducer:
    yield put({
      type: 'SET_SESSION',
      payload: sessionResponse.data,
    });
  } catch (error) {
    console.log('fetchAllSessions error:', error);
  }
}

function* fetchPastSessions() {
  try {
    const response = yield axios.get(`/api/session/past`);
    yield put({ type: 'SET_PAST_SESSION', payload: response.data });
  } catch (error) {
    console.error('Error fetching past sessions:', error);
  }
}

//POST route 
function* postSessionSaga(action) {
    // try catch block
    try {
      // POST a new session
      yield axios.post('/api/session/schedule', action.payload);

      // dispatch to refresh GET
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
        url: `/api/session/${action.payload.id}`,
        data: { id: action.payload },
      });
      yield put({ type: 'SET_SESSION', payload: sessionResponse.data });
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
      yield put({ type: 'SET_SESSION' });
    } catch (error) {
      // error surface to user
      console.log('ERROR:', error);
    }
  }

function* sessionSaga() {
    yield takeLatest('FETCH_UPCOMING_SESSION', fetchUpcomingSessions);
    yield takeLatest('FETCH_PAST_SESSION', fetchPastSessions);
    yield takeEvery('POST_SESSION', postSessionSaga);
    yield takeEvery('PUT_SESSION', putSessionSaga);
    yield takeEvery('DELETE_SESSION', deleteSessionSaga);
  }

  export default sessionSaga;


  