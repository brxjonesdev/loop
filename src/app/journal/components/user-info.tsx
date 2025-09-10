import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "@supabase/supabase-js"
import { UserStreaksWeekly } from "./user-streaks"
import { Entry } from "@/lib/models/entry.model"


interface UserCardProps {
  user: User | null
  entries: Entry[]
}

export function UserCard({ user, entries }: UserCardProps) {
  if (!user) {
    return null
  }
  const getInitials = (email?: string) => {
    if (email) {
      return email.slice(0, 2).toUpperCase()
    }
    return "U"
  }

  const getDisplayName = () => {
    if (user.user_metadata?.full_name) return user.user_metadata.full_name
    if (user.email) return user.email.split("@")[0]
    return "User"
  }

  return (
    <Card className="w-full p-4 shadow-none border-2 ">
      <CardContent className="p-0 flex gap-4 flex-col">
        <div className="flex items-center space-x-3 justify-center">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.user_metadata?.avatar_url || "/placeholder.svg"} alt={getDisplayName()} />
            <AvatarFallback className="text-sm">{getInitials(user.email)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 ">
            <p className="font-medium text-sm truncate">{getDisplayName()}</p>
            {user.email && <p className="text-xs text-muted-foreground truncate">{user.email}</p>}
          </div>
        </div>
        <UserStreaksWeekly entries={entries} />
      </CardContent>
    </Card>
  )
}
