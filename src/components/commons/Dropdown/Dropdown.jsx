'use client';

import { array, string } from 'prop-types';

import Button from '../Button';

import s from './Dropdown.module.scss';

export default function Dropdown({
  text, contentList, additionalClassText, additionalClassContent, additionalClassRoot,
}) {
  const content = contentList.map((item) => (
    <Button key={`${item.key}`} className={s.listItem} onClick={item.onClick}>{item.questionType}</Button>
  ));

  return (
    <div className={`${s.root} ${additionalClassRoot}`}>
      <p className={additionalClassText}>{text}</p>
      <div className={`${s.content} ${additionalClassContent}`}>
        {content}
      </div>
    </div>
  );
}

Dropdown.propTypes = {
  text: string,
  contentList: array.isRequired,
  additionalClassText: string,
  additionalClassContent: string,
  additionalClassRoot: string,
};
