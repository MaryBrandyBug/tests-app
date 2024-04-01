import Head from 'next/head';
import { func } from 'prop-types';

import RootLayout from './layout';

import '../styles/reset.scss';
import '../styles/globals.scss';

export default function MyApp({ Component }) {
  return (
    <RootLayout>
      <Head>
        <title>My tests</title>
        <meta name="description" content="Create your own tests" />
      </Head>
      <main>
        <Component />
      </main>
    </RootLayout>
  );
}

MyApp.propTypes = {
  Component: func,
};
