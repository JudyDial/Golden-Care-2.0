// components/ui/label.tsx
import React from 'react';

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;  // Add className as an optional prop
}

export const Label: React.FC<LabelProps> = ({ htmlFor, children, className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium text-gray-700 ${className || ''}`} // Apply className if provided
    >
      {children}
    </label>
  );
};
