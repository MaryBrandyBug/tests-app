'use client';

import { useEffect, useState } from 'react';
import { bool } from 'prop-types';

import TestCard from '../TestCard';
import Pagination from '../Pagination';

import s from './TestLibrary.module.scss';

export default function TestLibrary({ is_admin }) {
  const [tests, setTests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTests = async (page) => {
    try {
      fetch(`https://interns-test-fe.snp.agency/api/v1/tests?page=${page}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'scope-key': 'hJSv{7A8jcm4<U^}f)#E`e',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setTests(data.tests);
          setTotalPages(data.meta.total_pages);
        });
    } catch (error) {
      console.error('Error fetching tests:', error);
    }
  };

  const handleFlipPage = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    fetchTests(currentPage);
  }, [currentPage]);

  const testLibrary = tests?.map((test) => <TestCard key={test.id} title={test.title} is_admin={is_admin} questionNumber={test.questions.length} id={test.id} />);

  return (
    <div className={s.root}>
      <div className={s.content}>
        {testLibrary}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onClick={handleFlipPage} />
    </div>
  );
}

TestLibrary.propTypes = {
  is_admin: bool,
};
