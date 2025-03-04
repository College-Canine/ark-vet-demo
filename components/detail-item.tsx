import type React from "react"
interface DetailItemProps {
  label: string
  value: React.ReactNode
}

export function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div className="py-2">
      <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm">{value}</dd>
    </div>
  )
}

