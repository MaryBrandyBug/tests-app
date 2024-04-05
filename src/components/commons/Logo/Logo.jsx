'use client';

import { string } from 'prop-types';

import Button from '../Button';

import s from './Logo.module.scss';
import { yeseva } from '@/styles/fonts';

export default function Logo({ additionalClass }) {
  return (
    <div className={`${s.root} ${yeseva.className} ${additionalClass}`}>
      <Button href="/">
        <p className={s.logo}>My tests</p>
      </Button>
    </div>
  );
}

Logo.propTypes = {
  additionalClass: string,
};
