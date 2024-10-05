'use client';

import {
  any, bool, func, string,
} from 'prop-types';
import cx from 'classnames';
import Image from 'next/image';

import Button from '../Button';

import s from './Modal.module.scss';

export default function Modal({
  header, children, cancelation = false, onClick,
}) {
  return (
    <div className={s.root}>
      <div className={cx([s.content])}>
        <div className={s.closeBtnContainer}>
          <Button className={s.closeBtn} onClick={onClick}><Image src="/close.svg" alt="close button" width={50} height={50} /></Button>
        </div>
        <div className={s.headerContainer}>
          <header className={s.header}>{header}</header>
        </div>
        <div className={s.contentContainer}>
          {children}
        </div>
        {cancelation
      && (
      <div className={s.cancelationBtnContainer}>
        <Button className={s.cancelationBtn} onClick={onClick}>Cancel</Button>
      </div>
      )}
      </div>
    </div>
  );
}

Modal.propTypes = {
  header: string,
  children: any,
  cancelation: bool,
  onClick: func,
};
