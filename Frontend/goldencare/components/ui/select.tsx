"use client";

import { useState, createContext, useContext } from "react";
import { Listbox } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";

// Context to provide the selected value
const SelectContext = createContext<{ selected: string | undefined }>({
  selected: undefined,
});

export function Select({
  children,
  name,
  onChange,
  defaultValue,
  required,
}: {
  children: React.ReactNode;
  name: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  required?: boolean;
}) {
  const [selected, setSelected] = useState(defaultValue || "");

  const handleChange = (value: string) => {
    setSelected(value);
    if (onChange) onChange(value);
  };

  return (
    <SelectContext.Provider value={{ selected }}>
      <Listbox
        value={selected}
        onChange={handleChange}
        as="div"
        className="relative"
      >
        {children}
        <input type="hidden" name={name} value={selected} required={required} />
      </Listbox>
    </SelectContext.Provider>
  );
}

export function SelectTrigger({ placeholder }: { placeholder: string }) {
  const { selected } = useContext(SelectContext);

  return (
    <Listbox.Button className="w-full flex items-center justify-between px-3 py-2 border rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
      <span className="block w-fit text-gray-700">
        {selected || placeholder}
      </span>
      <ChevronDown className="w-5 h-5 text-gray-400" />
    </Listbox.Button>
  );
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  return (
    <Listbox.Options className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg focus:outline-none">
      {children}
    </Listbox.Options>
  );
}

export function SelectItem({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
//   const { selected } = useContext(SelectContext);

  return (
    <Listbox.Option
      value={value}
      className={({ active }) =>
        `cursor-pointer select-none relative px-4 py-2 ${
          active ? "bg-blue-500 text-white" : "text-gray-900"
        }`
      }
    >
      {({ selected: isSelected }) => (
        <>
          <span
            className={`block truncate ${
              isSelected ? "font-medium" : "font-normal"
            }`}
          >
            {children}
          </span>
          {isSelected && (
            <Check
              className="absolute inset-y-0 left-2 w-5 h-5 text-white"
              aria-hidden="true"
            />
          )}
        </>
      )}
    </Listbox.Option>
  );
}
