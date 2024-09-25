'use client';

import TestQuestionsList from '@/components/commons/TestQuestionsList';

import s from './TestExecutionPage.module.scss';

export default function TestExecutionPage() {
  return (
    <div className={s.root}>
      <TestQuestionsList />
    </div>
  );
}
