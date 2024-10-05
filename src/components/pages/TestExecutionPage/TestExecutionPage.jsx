'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';

import TestQuestionsList from '@/components/commons/TestQuestionsList';
import TestScoreModal from '@/components/commons/TestScoreModal';

import s from './TestExecutionPage.module.scss';

export default function TestExecutionPage() {
  const [totalScoreModal, setTotalScoreModal] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [userScore, setUserScore] = useState(0);

  const router = useRouter();

  const manageTotalScoreModal = (totalPoints, userResult) => {
    setTotalScoreModal(!totalScoreModal);
    setTotalScore(totalPoints);
    setUserScore(userResult);
  };

  const onClose = () => {
    router.push('/');
  };

  return (
    <div className={s.root}>
      {totalScoreModal
        && (
          <TestScoreModal totalScore={totalScore} userScore={userScore} handleClose={onClose} />
        )}
      <TestQuestionsList manageTotalScoreModal={manageTotalScoreModal} />
    </div>
  );
}
