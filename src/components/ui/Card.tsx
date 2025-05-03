import React, { HTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  interactive?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  interactive = false,
  onClick,
  className = '',
  ...props
}) => {
  const baseClasses = 'rounded-lg overflow-hidden';
  
  const variantClasses = {
    default: 'bg-white shadow-card',
    elevated: 'bg-white shadow-elevated',
    outlined: 'bg-white border border-neutral-200',
  };
  
  const interactiveClasses = interactive
    ? 'cursor-pointer transition-transform duration-200 hover:-translate-y-1 hover:shadow-elevated' 
    : '';
  
  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${interactiveClasses}
    ${className}
  `;
  
  return (
    <motion.div
      className={classes}
      onClick={onClick}
      whileHover={interactive ? { y: -4 } : {}}
      whileTap={interactive ? { y: -2 } : {}}
      {...props}
    >
      {children}
    </motion.div>
  );
};