import dynamic from 'next/dynamic';
import { LinkProps } from 'next/link';
import { FC, HTMLProps } from 'react';
//import CoreLink from 'next/link';
const LazyLink = dynamic(() => import('@/ui/link/link'));
const Link: FC<LinkProps & HTMLProps<HTMLAnchorElement>> = ({
  children,
  ...props
}) => {
  //  return <CoreLink {...props}>{children}</CoreLink>;
  return <LazyLink {...props}>{children}</LazyLink>;
};
export default Link;
