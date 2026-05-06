import { type ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';

type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({
  className,
  variant = 'primary',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex h-11 items-center justify-center border px-5 text-sm font-medium transition-colors',
        variant === 'primary' &&
          'border-neutral-950 bg-neutral-950 text-white hover:bg-neutral-800',
        variant === 'secondary' &&
          'border-neutral-300 bg-white text-neutral-950 hover:bg-neutral-100',
        className,
      )}
      type={type}
      {...props}
    />
  );
}
