import { cn } from '@/utils';
import Link from '@/ui/link';

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
  const styles = variant === 'primary' ? 'btn' : 'btn-secondary';

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
