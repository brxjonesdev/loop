"use client"
import { useState } from "react"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { Goal, GoalCreate, GoalUpdate } from "@/lib/models/index"
import { getButtonClass, getCardClass, getSupabaseUserID } from "@/lib/utils"
import { Plus, Edit2, Trash2, Save, X } from "lucide-react"
import { goalsServices } from "@/lib/services"
import { nanoid } from "nanoid"
import { createClient } from "@/lib/auth/supabase/client"

export default function UserGoals({ data }: { data: Goal[] }) {
  const [goals, setGoals] = useState<Goal[]>(data)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<string | null>(null)
  const supabase = createClient();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    color: "blue" as Goal["color"],
  })

  const handleCreate = async (goalData: GoalCreate) => {
    const newGoal: Partial<Goal> = {
      ...goalData,
      id: `goal-${nanoid(12)}`,
      color: formData.color as Goal["color"],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setGoals((prev) => [newGoal as Goal, ...prev])
    console.log("Creating goal with data:", goalData)
    const result = await goalsServices.createGoal(newGoal as Goal)
    if (!result.ok) {
      setGoals((prev) => prev.filter((goal) => goal.id !== "temp-id"))
    }
    setIsCreating(false)
    resetForm()
  }

  const handleUpdate = async (goalData: GoalUpdate) => {
    setGoals((prev) => prev.map((goal) => (goal.id === goalData.id ? { ...goal, ...goalData } : goal)))
    const result = await goalsServices.updateGoal(goalData.id, goalData)
  if (!result.ok) {
      setGoals(data)
  }
    setEditingId(null)
    resetForm()
  }

  const handleDelete = async (goalId: string) => {
    const result = await goalsServices.deleteGoal(goalId)
    setGoals((prev) => prev.filter((goal) => goal.id !== goalId))
    if(!result.ok){
      setGoals(data)
    }

    setDeleteDialogOpen(null)
  }

  const resetForm = () => {
    setFormData({ title: "", description: "", color: "blue" })
  }

  const startEdit = (goal: Goal) => {
    setEditingId(goal.id)
    setFormData({
      title: goal.title,
      description: goal.description,
      color: goal.color,
    })
  }

  const startCreate = () => {
    setIsCreating(true)
    resetForm()
  }

  const cancelEdit = () => {
    setEditingId(null)
    setIsCreating(false)
    resetForm()
  }

  const colorOptions: Goal["color"][] = [
    "red",
    "blue",
    "green",
    "yellow",
    "orange",
    "purple",
    "pink",
    "teal",
    "cyan",
    "lime",
    "indigo",
    "gray",
  ]

  return (
    <Card className="shadow-none gap-2 border-2 font-nunito ">
      <CardHeader className="space-y-0 gap-0">
        <CardTitle className="text-xl">Goals</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">Your personal goals and objectives</CardDescription>
        <CardAction>
          <Button onClick={startCreate} className="w-full mt-2 text-sm" size={"sm"}>
            <Plus />
            Goal
          </Button>
        </CardAction>
      </CardHeader>

      {isCreating && (
        <CardContent>
          <div className="border rounded-xl p-4 bg-muted/50">
            <div className="space-y-4">
              <Input
                placeholder="Goal title"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              />
              <Textarea
                placeholder="Goal description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              />
              <Select
                value={formData.color}
                onValueChange={(value: Goal["color"]) => setFormData((prev) => ({ ...prev, color: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map((color) => (
                    <SelectItem key={color} value={color}>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full bg-${color}-500`}></div>
                        {color.charAt(0).toUpperCase() + color.slice(1)}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Button
                  onClick={async () =>
                    handleCreate({
                      userId: await getSupabaseUserID(supabase), 
                      title: formData.title,
                      description: formData.description,
                    })
                  }
                  size="sm"
                  disabled={!formData.title.trim()}
                >
                  <Save className="w-4 h-4 mr-1" />
                  Save
                </Button>
                <Button onClick={cancelEdit} variant="outline" size="sm">
                  <X className="w-4 h-4 mr-1" />
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      )}

      {goals.length === 0 && !isCreating ? (
        <CardContent>
          <CardDescription>You have no goals set. Set one to start tracking!</CardDescription>
        </CardContent>
      ) : (
        <>
          <CardContent className="flex-col gap-4 hidden lg:flex">
            {goals.map((goal) => (
              <div key={goal.id} className={`border rounded-xl p-4 flex gap-2 flex-col ${getCardClass(goal.color)}`}>
                {editingId === goal.id ? (
                  <div className="space-y-4">
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    />
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    />
                    <Select
                      value={formData.color}
                      onValueChange={(value: Goal["color"]) => setFormData((prev) => ({ ...prev, color: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {colorOptions.map((color) => (
                          <SelectItem key={color} value={color}>
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full bg-${color}-500`}></div>
                              {color.charAt(0).toUpperCase() + color.slice(1)}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="flex gap-2">
                      <Button
                        onClick={() =>
                          handleUpdate({
                            id: goal.id,
                            title: formData.title,
                            description: formData.description,
                          })
                        }
                        size="sm"
                        disabled={!formData.title.trim()}
                      >
                        <Save className="w-4 h-4 mr-1" />
                        Save
                      </Button>
                      <Button onClick={cancelEdit} variant="outline" size="sm">
                        <X className="w-4 h-4 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <h3 className="text-lg font-medium">{goal.title}</h3>
                      <p className="text-sm text-muted-foreground font-nunito-sans">{goal.description}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Button
                        onClick={() => startEdit(goal)}
                        variant="outline"
                        size="sm"
                        className={`shadow-none ${getButtonClass(goal.color)}`}
                      >
                        <Edit2 className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Dialog
                        open={deleteDialogOpen === goal.id}
                        onOpenChange={(open) => setDeleteDialogOpen(open ? goal.id : null)}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            
                          >
                            <Trash2 className="" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Delete Goal</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete &quot;{goal.title}&quot;? This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setDeleteDialogOpen(null)}>
                              Cancel
                            </Button>
                            <Button variant="destructive" onClick={() => handleDelete(goal.id)}>
                              Delete
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </>
                )}
              </div>
            ))}
          </CardContent>

          <CardContent className="flex-col gap-4 lg:hidden flex">
            <Accordion type="single" collapsible className="w-full">
              {goals.map((goal) => (
                <AccordionItem key={goal.id} value={goal.id}>
                  <AccordionTrigger>{goal.title}</AccordionTrigger>
                  <AccordionContent>
                    {editingId === goal.id ? (
                      <div className="space-y-4">
                        <Input
                          value={formData.title}
                          onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                        />
                        <Textarea
                          value={formData.description}
                          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                        />
                        <Select
                          value={formData.color}
                          onValueChange={(value: Goal["color"]) => setFormData((prev) => ({ ...prev, color: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {colorOptions.map((color) => (
                              <SelectItem key={color} value={color}>
                                <div className="flex items-center gap-2">
                                  <div className={`w-3 h-3 rounded-full bg-${color}-500`}></div>
                                  {color.charAt(0).toUpperCase() + color.slice(1)}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <div className="flex gap-2">
                          <Button
                            onClick={() =>
                              handleUpdate({
                                id: goal.id,
                                title: formData.title,
                                description: formData.description,
                              })
                            }
                            size="sm"
                          >
                            <Save className="w-4 h-4 mr-1" />
                            Save
                          </Button>
                          <Button onClick={cancelEdit} variant="outline" size="sm">
                            <X className="w-4 h-4 mr-1" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="mb-4">{goal.description}</p>
                        <div className="flex gap-2 flex-wrap">
                          <Button onClick={() => startEdit(goal)} variant="outline" size="sm">
                            <Edit2 className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Dialog
                            open={deleteDialogOpen === goal.id}
                            onOpenChange={(open) => setDeleteDialogOpen(open ? goal.id : null)}
                          >
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700 bg-transparent"
                              >
                                <Trash2 className="w-4 h-4 mr-1" />
                                Delete
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Delete Goal</DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to delete &quot;{goal.title}&quot;? This action cannot be undone.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setDeleteDialogOpen(null)}>
                                  Cancel
                                </Button>
                                <Button variant="destructive" onClick={() => handleDelete(goal.id)}>
                                  Delete
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </>
      )}
    </Card>
  )
}
