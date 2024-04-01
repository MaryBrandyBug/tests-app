'use client';

import { Provider } from 'react-redux';
import { node } from 'prop-types';

import store from './store';

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

ReduxProvider.propTypes = {
  children: node.isRequired,
};
