import type { ReactNode } from "react"

interface SettingsSectionProps {
  id: string
  title: string
  description?: string
  children: ReactNode
}

export function SettingsSection({ id, title, description, children }: SettingsSectionProps) {
  return (
    <section id={id} className="scroll-mt-8">
      <div className="bg-card border border-border rounded-lg p-4 md:p-8">
        <div className="mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl font-semibold mb-2">{title}</h2>
          {description && <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>}
        </div>
        <div className="space-y-4 md:space-y-6">{children}</div>
      </div>
    </section>
  )
}
