import { cn } from '@/lib/utils'

interface DiffViewProps {
  diff: string
}

export function DiffView({ diff }: DiffViewProps) {
  if (!diff) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        No changes to display
      </div>
    )
  }

  const lines = diff.split('\n')

  return (
    <div className="font-mono text-[13px] leading-relaxed py-3">
      {lines.map((line, i) => {
        let lineClass = 'text-secondary-foreground'
        if (line.startsWith('+') && !line.startsWith('+++')) {
          lineClass = 'bg-[rgba(76,175,80,0.12)] text-[#4caf50]'
        } else if (line.startsWith('-') && !line.startsWith('---')) {
          lineClass = 'bg-[rgba(244,67,54,0.12)] text-[#f44336]'
        } else if (line.startsWith('@@')) {
          lineClass = 'bg-[rgba(33,150,243,0.08)] text-primary italic'
        } else if (line.startsWith('diff') || line.startsWith('index') || line.startsWith('---') || line.startsWith('+++') || line.startsWith('new file')) {
          lineClass = 'bg-muted text-muted-foreground font-semibold'
        }

        return (
          <div key={i} className={cn("flex min-h-[22px] px-4", lineClass)}>
            <span className="w-10 shrink-0 text-right pr-3 text-muted-foreground select-none">
              {i + 1}
            </span>
            <span className="flex-1 whitespace-pre-wrap break-all px-2">
              {line || '\u00A0'}
            </span>
          </div>
        )
      })}
    </div>
  )
}
