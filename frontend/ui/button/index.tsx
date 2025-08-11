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
  const base = 'px-4 py-2 rounded font-semibold';
  const styles =
    variant === 'primary' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black';

  return (
    <>
      {href ? (
        <Link
          href={href}
          className={`inline-flex justify-center ${base} ${styles} ${className}`}
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
