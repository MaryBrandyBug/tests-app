import { call, put, takeLatest } from 'redux-saga/effects';
import { deleteUser } from '../store/slicer/userSlicer';

function destroySessionApi() {
  fetch('https://interns-test-fe.snp.agency/api/v1/logout', {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'scope-key': 'hJSv{7A8jcm4<U^}f)#E`e',
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      return res.json();
    });
}

function* destroySessionSaga() {
  try {
    yield call(destroySessionApi);
    yield put(deleteUser());
  } catch (e) {
    yield put({ type: 'SESSION_DESTROYING_FAILED', message: e.message });
  }
}

function* userSaga() {
  yield takeLatest('test/destroySession', destroySessionSaga);
}

export default userSaga;
