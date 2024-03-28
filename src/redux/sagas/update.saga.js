import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "UPDATE" actions
function* updateUser(action) {
  console.log('In update user', action.payload.id);
  try {
    yield axios.put(`/api/user/update/${action.payload.id}`, action.payload);
  } catch (error) {
    console.log('Error with user update:', error);
    yield put({ type: 'UPDATE_FAILED' });
  }
}

function* updateSaga() {
        yield takeLatest('UPDATE', updateUser);
  };

  export default updateSaga;