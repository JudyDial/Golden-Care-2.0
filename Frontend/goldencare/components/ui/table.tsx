import { ReactNode } from 'react'

interface TableProps {
  children: ReactNode
  className?: string
}

export function Table({ children, className }: TableProps) {
  return (
    <div className={`overflow-x-auto w-full border border-gray-200 rounded-lg ${className}`}>
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        {children}
      </table>
    </div>
  )
}

export function TableHeader({ children }: TableProps) {
  return <thead className="bg-gray-100">{children}</thead>
}

export function TableBody({ children }: TableProps) {
  return <tbody className="divide-y divide-gray-200">{children}</tbody>
}

export function TableRow({ children, className }: TableProps) {
  return <tr className={`hover:bg-gray-50 ${className}`}>{children}</tr>
}

interface TableCellProps extends TableProps {
  as?: 'td' | 'th'
}

export function TableHead({ children, className }: TableCellProps) {
  return (
    <th
      className={`px-4 py-2 text-left text-sm font-medium text-gray-700 uppercase tracking-wider ${className}`}
    >
      {children}
    </th>
  )
}

export function TableCell({ children, as = 'td', className }: TableCellProps) {
  const Component = as
  return (
    <Component className={`px-4 py-2 text-sm text-gray-700 ${className}`}>
      {children}
    </Component>
  )
}
