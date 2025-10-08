import type { ReactNode } from "react"

interface SettingsFieldProps {
  label: string
  description?: string
  children: ReactNode
  htmlFor?: string
}

export function SettingsField({ label, description, children, htmlFor }: SettingsFieldProps) {
  return (
    <div className="space-y-2 md:space-y-3">
      <div>
        <label htmlFor={htmlFor} className="text-sm font-medium text-foreground block">
          {label}
        </label>
        {description && <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{description}</p>}
      </div>
      <div>{children}</div>
    </div>
  )
}
