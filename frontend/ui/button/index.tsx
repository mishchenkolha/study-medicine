import { cn } from '@/utils';
import Link from '@/ui/link';

export enum VARIANTS {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  DANGER = 'danger',
  SUCCESS = 'success',
}
type Props = React.ButtonHTMLAttributes<
  HTMLAnchorElement | HTMLButtonElement
> & {
  variant?: VARIANTS;
  className?: string;
  href?: string;
};

export const Button = ({
  children,
  variant = VARIANTS.PRIMARY,
  className,
  href,
  ...rest
}: Props) => {
  const base = 'px-4 py-2 rounded font-semibold cursor-pointer';
  let styles = '';
  switch (variant) {
    case VARIANTS.PRIMARY:
      styles = 'btn';
      break;
    case VARIANTS.DANGER:
      styles = 'btn-danger';
      break;
    case VARIANTS.SUCCESS:
      styles = 'btn-success';
      break;
    default:
      styles = 'btn-secondary';
  }

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
