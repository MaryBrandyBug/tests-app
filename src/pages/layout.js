import { node } from 'prop-types';
import { PersistGate } from 'redux-persist/integration/react';

import ReduxProvider from '../redux/store/Provider';
import { persistor } from '../redux/store/store';

export default function RootLayout({ children }) {
  return (
    <ReduxProvider>
      <PersistGate loading={null} persistor={persistor}>
        { children }
      </PersistGate>
    </ReduxProvider>
  );
}

RootLayout.propTypes = {
  children: node.isRequired,
};
