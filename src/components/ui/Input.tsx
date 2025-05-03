import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      fullWidth = true,
      startIcon,
      endIcon,
      className = '',
      ...props
    },
    ref
  ) => {
    const inputClassName = `
      block px-3 py-2 bg-white border rounded-md shadow-sm 
      placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
      ${error ? 'border-error-500' : 'border-neutral-300'}
      ${startIcon ? 'pl-10' : ''}
      ${endIcon ? 'pr-10' : ''}
      ${fullWidth ? 'w-full' : ''}
      ${className}
    `;

    return (
      <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
        {label && (
          <label
            className="block mb-1 text-sm font-medium text-neutral-700"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {startIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-500">
              {startIcon}
            </div>
          )}
          <input
            ref={ref}
            className={inputClassName}
            {...props}
          />
          {endIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-neutral-500">
              {endIcon}
            </div>
          )}
        </div>
        {(helperText || error) && (
          <p className={`mt-1 text-sm ${error ? 'text-error-500' : 'text-neutral-500'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';