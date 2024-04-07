'use client';

import { array, string } from 'prop-types';

import s from './Dropdown.module.scss';

export default function Dropdown({
  text, contentList, additionalClassText, additionalClassContent, additionalClassRoot,
}) {
  const content = contentList.map((item) => (
    <p key={`${item.key}`} className={s.listItem}>{item.questionType}</p>
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
