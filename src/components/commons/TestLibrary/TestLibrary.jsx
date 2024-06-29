'use client';

import { useEffect, useState } from 'react';
import { bool } from 'prop-types';
import { useRouter } from 'next/router';

import TestCard from '../TestCard';
import Pagination from '../Pagination';

import s from './TestLibrary.module.scss';

export default function TestLibrary({ is_admin }) {
  const [tests, setTests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();
  const { query } = router;

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

  const updateQueryParams = (page) => {
    router.push({
      pathname: router.pathname,
      query: { ...query, page },
    }, undefined, { shallow: true });
  };

  const handleFlipPage = (newPage) => {
    setCurrentPage(newPage);
    updateQueryParams(newPage);
  };


  useEffect(() => {
    if (router.isReady) {
      const initialPage = parseInt(query?.page)/*  || 1 */;
      setCurrentPage(initialPage);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (router.isReady) {
      fetchTests(currentPage);
    }
  }, [currentPage, router.isReady, totalPages]);

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
