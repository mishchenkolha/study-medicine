import { ComponentProps } from 'react';
import CoreLink from 'next/link';

const Link: React.FC<ComponentProps<typeof CoreLink>> = ({
  children,
  prefetch = true,
  href,
  target,
  ...rest
}) => {
  return (
    <>
      {target === '_blank' ? (
        <a href={String(href)} target={target} {...rest}>
          {children}
        </a>
      ) : (
        <CoreLink
          href={href}
          target={target ?? '_top'}
          prefetch={prefetch}
          {...rest}
        >
          {children}
        </CoreLink>
      )}
    </>
  );
};

export default Link;
