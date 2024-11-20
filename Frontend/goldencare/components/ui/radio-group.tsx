import React from 'react';

interface RadioGroupProps {
  selectedValue: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ selectedValue, onChange, children }) => {
  return (
    <div className="flex flex-col space-y-2">
      {React.Children.map(children, (child) =>
        React.isValidElement<RadioGroupItemProps>(child)
          ? React.cloneElement(child as React.ReactElement<RadioGroupItemProps>, {
              checked: selectedValue === child.props.value,
              onChange,
            })
          : child
      )}
    </div>
  );
};

interface RadioGroupItemProps {
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  label: string;
  id: string;
}

export const RadioGroupItem: React.FC<RadioGroupItemProps> = ({ value, checked, onChange, label, id }) => {
  return (
    <div className="flex items-center space-x-3">
      <input
        type="radio"
        id={id}
        name="radio-group"
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="h-4 w-4 text-green-600 border-gray-300 focus:ring-2 focus:ring-green-500"
      />
      <label htmlFor={id} className="text-sm text-gray-700">{label}</label>
    </div>
  );
};
