'use client';

import { Provider } from 'react-redux';
import { node } from 'prop-types';

export default function ReduxProvider({ children }) {
  return (
    <Provider>
      {children}
    </Provider>
  );
}

ReduxProvider.propTypes = {
  children: node.isRequired,
};
