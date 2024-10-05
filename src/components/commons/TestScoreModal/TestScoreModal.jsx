'use client';

import { func, number } from 'prop-types';

import Modal from '../Modal';

import s from './TestScoreModal.module.scss';
import { bungee } from '@/styles/fonts';

export default function TestScoreModal({ handleClose, totalScore, userScore }) {
  return (
    <Modal onClick={handleClose}>
      <div className={s.scoreModalContent}>
        <div className={s.scoreModalHeader}>
          <h2>Your score:</h2>
        </div>
        <div className={s.scoreContainer}>
          <p className={bungee.className}>
            {userScore}
            {' '}
            /
            {' '}
            {totalScore}
          </p>
        </div>
      </div>
    </Modal>
  );
}

TestScoreModal.propTypes = {
  handleClose: func,
  totalScore: number,
  userScore: number,
};
