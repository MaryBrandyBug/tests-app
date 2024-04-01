import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import userReducer from './slicer/userSlicer';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: { user: userReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

export default store;
