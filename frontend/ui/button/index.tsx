type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

export const Button = ({ children, variant = 'primary', ...rest }: Props) => {
  const base = 'px-4 py-2 rounded font-semibold';
  const styles = variant === 'primary' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black';

  return (
    <button className={`${base} ${styles}`} {...rest}>
      {children}
    </button>
  );
};
