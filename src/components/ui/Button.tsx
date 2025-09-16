import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { tv, type VariantProps } from 'tailwind-variants';

const button = tv({
  base: 'flex-row items-center justify-center rounded-lg font-sans-bold transition-colors',
  variants: {
    intent: {
      primary: 'bg-primary text-background',
      secondary: 'bg-gray-200 text-text-main',
      danger: 'bg-error text-white',
    },
    size: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    },
    outline: {
      true: 'bg-transparent border',
    },
    disabled: {
      true: 'opacity-50',
    }
  },
  compoundVariants: [
    {
      intent: 'primary',
      outline: true,
      className: 'border-primary text-primary',
    },
    {
      intent: 'secondary',
      outline: true,
      className: 'border-gray-300 text-text-subtle',
    },
    {
      intent: 'danger',
      outline: true,
      className: 'border-error text-error',
    },
  ],
  defaultVariants: {
    intent: 'primary',
    size: 'md',
  },
});

export type ButtonVariants = VariantProps<typeof button>;

interface ButtonProps extends TouchableOpacityProps, ButtonVariants {
  title?: string;
  isLoading?: boolean;
}

export const Button = ({
  title,
  isLoading,
  intent,
  size,
  outline,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      className={button({ intent, size, outline, disabled, className })}
      disabled={isLoading || disabled}
      {...props}>
      {isLoading ? (
        <ActivityIndicator
          size="small"
          className={outline || intent === 'secondary' ? 'text-text-main' : 'text-white'}
        />
      ) : (
        <>
          {title && (
            <Text className={button({ size, intent, outline })}>
              {title}
            </Text>
          )}
          {children}
        </>
      )}
    </TouchableOpacity>
  );
};