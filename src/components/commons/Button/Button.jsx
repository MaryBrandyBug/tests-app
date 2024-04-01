import { memo, forwardRef, useMemo } from 'react';
import {
  string, any, func, bool,
} from 'prop-types';
import Link from 'next/link';
import cx from 'classnames';

import isExternalLink from '@/utils/isExternalCheck';

import s from './Button.module.scss';

const Button = forwardRef(
  (
    {
      className,
      cbData,
      children,
      as,
      href,
      onClick,
      onMouseLeave,
      onMouseEnter,
      preventClick,
      stopPropagation,
      ...otherProps
    },
    ref,
  ) => {
    const CustomTag = useMemo(() => {
      if (as) return as;
      if (href) return 'a';
      return 'button';
    }, [href, as]);

    const isExternal = useMemo(() => isExternalLink(href || ''), [href]);

    const classNames = useMemo(() => cx(className, s.root, {}), [className]);

    const handleMouseLeave = () => {
      if (onMouseLeave) onMouseLeave(cbData);
    };

    const handleMouseEnter = () => {
      if (onMouseEnter) onMouseEnter(cbData);
    };

    const handleClick = (e) => {
      if (stopPropagation) e.stopPropagation();
      if (preventClick) e.preventDefault();
      if (onClick) onClick(cbData);
    };

    if (href && !isExternal) {
      return (
        <Link
          href={href}
          className={classNames}
          ref={ref}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          {...otherProps}
        >
          {children}
        </Link>
      );
    }

    return (
      <CustomTag
        className={classNames}
        href={href}
        ref={ref}
        rel={href && isExternal && 'noopener noreferrer'}
        target={href && isExternal && '_blank'}
        onClick={handleClick}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        {...otherProps}
      >
        {children}
      </CustomTag>
    );
  },
);

Button.propTypes = {
  className: string,
  cbData: func,
  children: any,
  as: any,
  href: string,
  onClick: func,
  onMouseLeave: func,
  onMouseEnter: func,
  preventClick: bool,
  stopPropagation: bool,
};

export default memo(Button);
