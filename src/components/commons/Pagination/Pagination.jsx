'use client';

import Button from '../Button';

import s from './Pagination.module.scss';

export default function Pagination({ currentPage, totalPages, onClick }) {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      i,
    );
  }

  return (
    <div className={s.root}>
      {pages.map((i) => (
        <div className={s.btnContainer}>
          <Button key={i} onClick={() => onClick(i)} disabled={i === currentPage} className={s.paginationBtn}>
            {i}
          </Button>
        </div>
      ))}
    </div>
  );
}
