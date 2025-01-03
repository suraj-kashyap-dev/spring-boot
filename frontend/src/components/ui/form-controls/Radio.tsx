import React, { forwardRef } from 'react';

interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1">
        <label className="inline-flex items-center">
          <input
            type="radio"
            ref={ref}
            className={`
              h-4 w-4 border-gray-300 text-blue-600
              focus:ring-2 focus:ring-blue-500
              disabled:opacity-50 disabled:cursor-not-allowed
              ${error ? 'border-red-500' : ''}
              ${className}
            `}
            {...props}
          />
          {label && <span className="ml-2 text-sm text-gray-700">{label}</span>}
        </label>
        {error && <p className="text-sm text-red-600">{error}</p>}
        {helperText && !error && (
          <p className="text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  },
);

Radio.displayName = 'Radio';
