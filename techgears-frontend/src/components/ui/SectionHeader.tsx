import { ReactNode } from 'react'

interface SectionHeaderProps {
  tag?: string
  title: string
  action?: ReactNode
}

export default function SectionHeader({ tag, title, action }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        {tag && (
          <div className="flex items-center gap-3 mb-5">
            <div className="w-5 h-10 bg-secondary rounded"></div>
            <span className="text-secondary font-semibold">{tag}</span>
          </div>
        )}
        <h2 className="text-3xl md:text-4xl font-semibold">{title}</h2>
      </div>
      {action}
    </div>
  )
}

