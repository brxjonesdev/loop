"use client"

import { SettingsLayout } from "./_components/settings-layout"
import { SettingsSection } from "./_components/settings-section"
import { SettingsField } from "./_components/settings-field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const sections = [
  { id: "general", label: "General" },
  { id: "profile", label: "Profile" },
  { id: "appearance", label: "Appearance" },
  { id: "advanced", label: "Advanced" },
]

export default function SettingsPage() {
  return (
    <SettingsLayout
      title="Settings"
      backLink={{ label: "Go to Dashboard", href: "/" }}
      sections={sections}
      searchPlaceholder="Search settings..."
    >
      

    
    </SettingsLayout>
  )
}
