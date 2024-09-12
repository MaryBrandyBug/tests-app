import { call, put, takeLatest } from 'redux-saga/effects';
import { getTest, deleteQuestion } from '../store/slicer/testSlicer';

function statusHelper(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  }
  return Promise.reject(new Error(response.statusText));
}

function fetchTestApi(id) {
  return fetch(`https://interns-test-fe.snp.agency/api/v1/tests/${id}`, {
    method: 'GET',
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

function deleteQuestionApi(questionId) {
  return fetch(`https://interns-test-fe.snp.agency/api/v1/questions/${questionId}`, {
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

function* fetchTestSaga({ id }) {
  try {
    const test = yield call(fetchTestApi, id);
    yield put(getTest(test));
  } catch (e) {
    yield put({ type: 'FETCH_TEST_FAILED', message: e.message });
  }
}

function* deleteQuestionSaga({ id, questionId }) {
  try {
    yield call(deleteQuestionApi, questionId);
    const questions = yield call(fetchTestApi, id);
    yield put(getTest(questions));
  } catch (e) {
    yield put({ type: 'DELETE_QUESTION_FAILED', message: e.message });
  }
}

function* testSaga() {
  yield takeLatest('test/fetchTest', fetchTestSaga);
  yield takeLatest('test/deleteQuestion', deleteQuestionSaga);
}

export default testSaga;
