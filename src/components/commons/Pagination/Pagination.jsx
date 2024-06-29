'use client';

import cx from 'classnames';

import Button from '../Button';

import s from './Pagination.module.scss';

export default function Pagination({ currentPage, totalPages, onClick }) {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      i,
    );
  }

  const isActive = (number, page) => { 
    if (number === page) {
      return [s.activeBtn];
    }
    return '';
  }

  return (
    <div className={s.root}>
      {pages.map((i, index) => (
        <div className={cx([s.btnContainer], isActive(i, currentPage))} key={index}>
          <Button key={i} onClick={() => onClick(i)} disabled={i === currentPage} className={s.paginationBtn}>
            {i}
          </Button>
        </div>
      ))}
    </div>
  );
}
