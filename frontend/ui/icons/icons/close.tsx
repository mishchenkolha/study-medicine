import { memo } from 'react';
import { TIcon } from '..';

const Icon = ({ id, className, style: coreStyle, width, height }: TIcon) => {
  const style = { ...coreStyle, width, height };
  return (
    <svg
      style={style}
      className={className}
      id={id}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.23214 1.10126C1.91972 0.788838 1.41319 0.788838 1.10077 1.10126C0.78835 1.41368 0.78835 1.92021 1.10077 2.23263L5.86858 7.00044L1.10109 11.7679C0.788675 12.0803 0.788675 12.5869 1.10109 12.8993C1.41351 13.2117 1.92005 13.2117 2.23247 12.8993L6.99995 8.13181L11.7674 12.8993C12.0799 13.2117 12.5864 13.2117 12.8988 12.8993C13.2112 12.5869 13.2112 12.0803 12.8988 11.7679L8.13132 7.00044L12.8991 2.23263C13.2116 1.92021 13.2116 1.41368 12.8991 1.10126C12.5867 0.788838 12.0802 0.788838 11.7678 1.10126L6.99995 5.86907L2.23214 1.10126Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default memo(Icon);
