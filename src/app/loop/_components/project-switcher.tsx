"use client"

import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ProjectCardProps {
    name: string
    description: string
}

export function ProjectSwitcher({
  projects,
}: {
  projects?: ProjectCardProps[]
}) {
  const { isMobile } = useSidebar()
  const [activeProject, setActiveProject] = React.useState((projects?.[0]) || null)
  const [isAddProjectOpen, setIsAddProjectOpen] = React.useState(false)
  const [newProjectName, setNewProjectName] = React.useState("")
  const [newProjectDescription, setNewProjectDescription] = React.useState("")

  const handleAddProject = () => {
    // Here you would typically add the project to your state/database
    console.log("Adding project:", { name: newProjectName, description: newProjectDescription })
    setIsAddProjectOpen(false)
    setNewProjectName("")
    setNewProjectDescription("")
  }

  if (!activeProject) {
    return (
      <>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              onClick={() => setIsAddProjectOpen(true)}
              className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Plus className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Add project</span>
                <span className="truncate text-xs text-muted-foreground">Get started</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <Dialog open={isAddProjectOpen} onOpenChange={setIsAddProjectOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
              <DialogDescription>Create a new project to organize your work.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Project Name</Label>
                <Input
                  id="name"
                  placeholder="My Awesome Project"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="A brief description"
                  value={newProjectDescription}
                  onChange={(e) => setNewProjectDescription(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddProjectOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddProject}>Add Project</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    )
  }

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  {/* <activeProject.logo className="size-4" /> */}
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{activeProject.name}</span>
                  <span className="truncate text-xs">{activeProject.description}</span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-muted-foreground text-xs">Projects</DropdownMenuLabel>
              {(projects ?? []).map((project, index) => (
                <DropdownMenuItem key={project.name} onClick={() => setActiveProject(project)} className="gap-2 p-2">
                  <div className="flex size-6 items-center justify-center rounded-md border">
                    {/* <project.logo className="size-3.5 shrink-0" /> */}
                  </div>
                  {project.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 p-2" onClick={() => setIsAddProjectOpen(true)}>
                <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                  <Plus className="size-4" />
                </div>
                <div className="text-muted-foreground font-medium">Add project</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <Dialog open={isAddProjectOpen} onOpenChange={setIsAddProjectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
            <DialogDescription>Create a new project to organize your work.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                placeholder="My Awesome Project"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="A brief description"
                value={newProjectDescription}
                onChange={(e) => setNewProjectDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddProjectOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddProject}>Add Project</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
