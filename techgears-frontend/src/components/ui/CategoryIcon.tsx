import { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

interface CategoryIconProps {
  icon: LucideIcon
  label: string
  href: string
  active?: boolean
}

export default function CategoryIcon({ icon: Icon, label, href, active }: CategoryIconProps) {
  return (
    <Link
      to={href}
      className={`flex flex-col items-center justify-center gap-2 sm:gap-3 border-2 rounded p-3 sm:p-4 lg:p-6 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] ${active ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-300 text-gray-800'
        }`}
    >
      <Icon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
      <span className="text-xs sm:text-sm">{label}</span>
    </Link>
  )
}
