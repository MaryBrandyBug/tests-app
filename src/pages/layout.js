import { node } from 'prop-types';

import ReduxProvider from '../redux/store/Provider';

export default function RootLayout({ children }) {
  return (
    <ReduxProvider>
      { children }
    </ReduxProvider>
  );
}

RootLayout.propTypes = {
  children: node.isRequired,
};
