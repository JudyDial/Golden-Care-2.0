interface ResourceItemProps {
    title: string
    type: string
  }
  
  export function ResourceItem({ title, type }: ResourceItemProps) {
    return (
      <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
        <h4 className="font-semibold">{title}</h4>
        <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">{type}</span>
      </li>
    )
  }