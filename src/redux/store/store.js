import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {
  persistStore, persistReducer, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './slicer/userSlicer';
import testSlicer from './slicer/testSlicer';
import librarySlicer from './slicer/librarySlicer';
import questionsCreationSlicer from './slicer/unsavedQuestionsSlicer';
import testSaga from '../sagas/testSaga';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'newQuestions'],
};

const rootReducer = combineReducers({
  user: userReducer, test: testSlicer, library: librarySlicer, newQuestions: questionsCreationSlicer,
});

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  })
    .concat(sagaMiddleware),
});

sagaMiddleware.run(testSaga);

export const persistor = persistStore(store);
export default store;
