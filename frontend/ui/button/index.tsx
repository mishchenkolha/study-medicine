import { cn } from '@/utils';
import Link from 'next/link';

type Props = React.ButtonHTMLAttributes<
  HTMLAnchorElement | HTMLButtonElement
> & {
  variant?: 'primary' | 'secondary';
  className?: string;
  href?: string;
};

export const Button = ({
  children,
  variant = 'primary',
  className,
  href,
  ...rest
}: Props) => {
  const base = 'px-4 py-2 rounded font-semibold cursor-pointer';
  const styles =
    variant === 'primary'
      ? 'bg-blue-600 text-white hover:!bg-blue-900'
      : 'bg-gray-300 text-black hover:!bg-gray-700 hover:text-white';

  return (
    <>
      {href ? (
        <Link
          href={href}
          className={cn('inline-flex justify-center', base, styles, className)}
          {...rest}
        >
          {children}
        </Link>
      ) : (
        <button className={`${base} ${styles} ${className}`} {...rest}>
          {children}
        </button>
      )}
    </>
  );
};
