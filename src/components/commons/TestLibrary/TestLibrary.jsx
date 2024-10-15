'use client';

import { useEffect, useState } from 'react';
import { bool } from 'prop-types';
import { useRouter } from 'next/router';
import cx from 'classnames';

import TestCard from '../TestCard';
import Pagination from '../Pagination';
import Button from '../Button';
import SearchField from '../SearchField';

import s from './TestLibrary.module.scss';

export default function TestLibrary({ is_admin, onTestStarting }) {
  const [tests, setTests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortTumblerSwitched, setSortTumblerSwitched] = useState(false);
  const [dateSorting, setDateSorting] = useState('created_at_desc');
  const [searchQuery, setSearchQuery] = useState('');

  const router = useRouter();
  const { query } = router;

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    router.push({
      pathname: router.pathname,
      query: { ...query, search: searchQuery },
    }, undefined, { shallow: true });
  };
  const handleReset = () => setSearchQuery('');

  const switchSorting = () => {
    if (dateSorting === 'created_at_desc') {
      setDateSorting('created_at_asc');
      router.push({
        pathname: router.pathname,
        query: { ...query, sort: 'old' },
      }, undefined, { shallow: true });
    }
    if (dateSorting === 'created_at_asc') {
      setDateSorting('created_at_desc');
      const { sort: removedParam, ...newQuery } = query;
      router.replace({
        pathname: router.pathname,
        query: newQuery,
      }, undefined, { shallow: true });
    }
  };

  const handleStartTest = (e, id) => {
    if (e.target.tagName !== 'A' && e.target.className !== 'btnContainer') {
      onTestStarting(id);
    }
  };

  const fetchTests = async (page) => {
    try {
      fetch(`https://interns-test-fe.snp.agency/api/v1/tests?page=${page}&sort=${dateSorting}&search=${searchQuery}`, {
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
      const initialPage = parseInt(query?.page, 10) || 1;
      setCurrentPage(initialPage);
      if (query.sort === 'old') {
        setDateSorting('created_at_asc');
        setSortTumblerSwitched(true);
      }
    }
  }, [router.isReady]);

  useEffect(() => {
    if (router.isReady) {
      fetchTests(currentPage);

      if (!searchQuery) {
        const { search, ...queryWithoutSearch } = query;
        router.push({
          pathname: router.pathname,
          query: queryWithoutSearch,
        }, undefined, { shallow: true });
      }
    }
  }, [currentPage, router.isReady, totalPages, dateSorting, searchQuery]);

  const testLibrary = tests?.map((test) => <TestCard key={test.id} title={test.title} is_admin={is_admin} questionNumber={test.questions.length} id={test.id} onClick={handleStartTest} />);

  const showCurrentLibrary = () => {
    if (testLibrary?.length > 0 && !searchQuery) return testLibrary; // есть созданные тесты && поисковое поле пустое
    if (testLibrary?.length > 0 && searchQuery) return testLibrary; // есть тесты удовлетворяющие поисковому запросу && поисковое поле не пустое
    if (!testLibrary?.length && searchQuery) return <p className={s.searchHasNoResult}>No tests matching your search were found.</p>; // нет тестов удовлетворяющих поисковому запросу && поисковое поле не пустует
    return '';
  };

  const currentLibrary = showCurrentLibrary();

  const onSwitch = () => {
    setSortTumblerSwitched(!sortTumblerSwitched);
    switchSorting();
  };

  return (
    <div className={s.root}>
      <SearchField handleChange={handleChange} value={searchQuery} onClick={handleReset} />
      <div className={s.dateSortContainer}>
        <p>NEWEST</p>
        <Button className={cx(s.tumblerContainer, { [s.tumblerRightPosition]: sortTumblerSwitched })} onClick={onSwitch}>
          <div className={s.tumbler} />
        </Button>
        <p>OLDEST</p>
      </div>
      <div className={s.content}>
        {currentLibrary}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onClick={handleFlipPage} />
    </div>
  );
}

TestLibrary.propTypes = {
  is_admin: bool,
};
