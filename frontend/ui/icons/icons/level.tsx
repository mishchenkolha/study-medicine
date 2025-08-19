import { memo } from 'react';
import { TIcon } from '..';

const Icon = ({ id, className, style: coreStyle, width, height }: TIcon) => {
  const style = { ...coreStyle, width, height };
  return (
    <svg
      id={id}
      style={style}
      className={className}
      viewBox="0 0 60 53"
      width="16"
      height="16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M33.3,7v37.89h15.16V7H33.3z M10.57,22.16v22.73h15.15V22.16H10.57z"
        fill="currentcolor"
      />
    </svg>
  );
};
export default memo(Icon);
