import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import UserCard from "@/lib/auth/components/user-card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FolderKanban, Globe, NotebookText, Plus, Settings, Star } from "lucide-react"
import { ProjectSwitcher } from "./project-switcher"
import Link from "next/link"
interface ProjectCardProps {
    name: string
    description: string
}
export function AppSidebar() {
    const dummyProjects: ProjectCardProps[] = [
    // {
    //   name: "Project Alpha",
    //     description: "Description for Project Alpha",
    // },
    ]
  return (
    <Sidebar className="font-title" >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="">
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-3 p-4">
              <a href="/loop/dashboard" className="p-4">
                <span className="text-xl font-semibold">Loop</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {/* <ProjectSwitcher projects={dummyProjects} /> */}
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
            <SidebarGroupContent>
  <SidebarMenu>
    {/* Dashboard */}
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className="data-[slot=sidebar-menu-button]:p-3 p-4 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      >
        <Link href="/loop/dashboard" className="flex items-center gap-2">
          <FolderKanban className="size-4" />
          <span>Dashboard</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>

    {/* Journal */}
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className="data-[slot=sidebar-menu-button]:p-3 p-4 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      >
        <Link href="/loop/journal" className="flex items-center gap-2">
          <NotebookText className="size-4" />
          <span>Journal</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>

    {/* Highlights */}
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className="data-[slot=sidebar-menu-button]:p-3 p-4 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      >
        <Link href="/loop/highlights" className="flex items-center gap-2">
          <Star className="size-4" />
          <span>Highlights</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>

    {/* Public Pages */}
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className="data-[slot=sidebar-menu-button]:p-3 p-4 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      >
        <Link href="/loop/pages" className="flex items-center gap-2">
          <Globe className="size-4" />
          <span>Public Pages</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>

    {/* Settings */}
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className="data-[slot=sidebar-menu-button]:p-3 p-4 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      >
        <Link href="/loop/settings" className="flex items-center gap-2">
          <Settings className="size-4" />
          <span>Settings</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
</SidebarGroupContent>

        </SidebarGroup>


      </SidebarContent>
      <SidebarFooter>
        <UserCard/>
      </SidebarFooter>
    </Sidebar>
  )
}