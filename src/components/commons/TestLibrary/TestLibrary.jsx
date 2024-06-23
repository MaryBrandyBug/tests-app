'use client';

import { array, bool } from 'prop-types';

import TestCard from '../TestCard';

import s from './TestLibrary.module.scss';

export default function TestLibrary({ tests, is_admin }) {
  const testLibrary = tests.length && tests.map((test) => <TestCard key={test.id} title={test.title} is_admin={is_admin} questionNumber={test.questions.length} id={test.id} />);

  return (
    <div className={s.root}>
      <div className={s.content}>
        {testLibrary}
      </div>
    </div>
  );
}

TestLibrary.propTypes = {
  tests: array,
  is_admin: bool,
};
