/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Trash2, Edit, Plus, X } from "lucide-react"
import type { Entry, EntryCreate, EntryUpdate } from "@/lib/models/index"
import { useState } from "react"
import { entryServices } from "@/lib/services"

interface UserEntriesProps {
  data: Entry[]
}

const moodColors = {
  happy: "bg-green-100 text-green-800 border-green-200",
  sad: "bg-blue-100 text-blue-800 border-blue-200",
  neutral: "bg-gray-100 text-gray-800 border-gray-200",
  angry: "bg-red-100 text-red-800 border-red-200",
  excited: "bg-yellow-100 text-yellow-800 border-yellow-200",
  anxious: "bg-orange-100 text-orange-800 border-orange-200",
  calm: "bg-teal-100 text-teal-800 border-teal-200",
  bored: "bg-purple-100 text-purple-800 border-purple-200",
  confused: "bg-pink-100 text-pink-800 border-pink-200",
  hopeful: "bg-emerald-100 text-emerald-800 border-emerald-200",
  frustrated: "bg-rose-100 text-rose-800 border-rose-200",
  content: "bg-indigo-100 text-indigo-800 border-indigo-200",
}

const moods = Object.keys(moodColors) as Array<keyof typeof moodColors>

export default function UserEntries({ data }: UserEntriesProps) {
  const [entries, setEntries] = useState<Entry[]>(data)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null)
  const [createForm, setCreateForm] = useState<EntryCreate>({
    goalID: "",
    content: "",
    tags: [],
    mood: "neutral",
  })
  const [editForm, setEditForm] = useState<EntryUpdate>({})
  const [newTag, setNewTag] = useState("")

  const createEntry = async (entry: EntryCreate): Promise<void> => {
    const result = await entryServices.createEntry(entry)
    if (!result.ok){
      console.error("Failed to create entry:", result.error)
      return
    }

    const newEntry: Entry = {
      id: Date.now().toString(),
      ...entry,
      createdAt: new Date(),
      updatedAt: new Date(),
      userID: "user-123", // Placeholder user ID
    }
    setEntries((prev) => [newEntry, ...prev])
  }

  const updateEntry = async (id: string, entry: EntryUpdate): Promise<void> => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...entry, updatedAt: new Date() } : e))
    )
    const result = await entryServices.updateEntry(id, entry)
    if (!result.ok) {
      console.error("Failed to update entry:", result.error)
      // reverting the optimistic update in case of failure
      const fetchResult = await entryServices.getAllEntries()
      if (!fetchResult.ok) {
        console.error("Failed to fetch entries:", fetchResult.error)
        return
      }
      setEntries(fetchResult.data)
    }
  }

  const deleteEntry = async (id: string): Promise<void> => {
    setEntries((prev) => prev.filter((e) => e.id !== id))
    const result = await entryServices.deleteEntry(id)
    if (!result.ok) {
      console.error("Failed to delete entry:", result.error)
      // reverting the optimistic update in case of failure
      const fetchResult = await entryServices.getAllEntries()
      if (!fetchResult.ok) {
        console.error("Failed to fetch entries:", fetchResult.error)
        return
      }
      setEntries(fetchResult.data)
    }

  }

  const handleCreate = async () => {
    if (createForm.content.trim()) {
      await createEntry(createForm)
      setCreateForm({ goalID: "", content: "", tags: [], mood: "neutral" })
      setIsCreateOpen(false)
    }
  }

  const handleUpdate = async () => {
    if (editingEntry && Object.keys(editForm).length > 0) {
      await updateEntry(editingEntry.id, editForm)
      setEditingEntry(null)
      setEditForm({})
    }
  }

  const handleDelete = async (id: string) => {
    await deleteEntry(id)
  }

  const addTag = (isEdit = false) => {
    if (newTag.trim()) {
      if (isEdit) {
        setEditForm((prev: EntryUpdate) => ({
          ...prev,
          tags: [...(prev.tags || editingEntry?.tags || []), newTag.trim()],
        }))
      } else {
        setCreateForm((prev: EntryCreate) => ({
          ...prev,
          tags: [...prev.tags, newTag.trim()],
        }))
      }
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string, isEdit = false) => {
    if (isEdit) {
      setEditForm((prev: EntryUpdate) => ({
        ...prev,
        tags: (prev.tags ?? editingEntry?.tags ?? []).filter((tag: string) => tag !== tagToRemove),
      }))
    } else {
      setCreateForm((prev: EntryCreate) => ({
        ...prev,
        tags: prev.tags.filter((tag: string) => tag !== tagToRemove),
      }))
    }
  }

  return (
    <Card className="shadow-none gap-2 border-2 font-nunito">
      <CardHeader className="space-y-0 gap-0">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Your Entries</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">Your personal journal entries</CardDescription>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Entry
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Entry</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="goalID">Goal ID</Label>
                  <Input
                    id="goalID"
                    value={createForm.goalID}
                    onChange={(e) => setCreateForm((prev: any) => ({ ...prev, goalID: e.target.value }))}
                    placeholder="Enter goal ID"
                  />
                </div>
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={createForm.content}
                    onChange={(e) => setCreateForm((prev: any) => ({ ...prev, content: e.target.value }))}
                    placeholder="Write your entry..."
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="mood">Mood</Label>
                  <Select
                    value={createForm.mood}
                    onValueChange={(value) => setCreateForm((prev: any) => ({ ...prev, mood: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {moods.map((mood) => (
                        <SelectItem key={mood} value={mood}>
                          <span className="capitalize">{mood}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Tags</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add a tag"
                      onKeyPress={(e) => e.key === "Enter" && addTag()}
                    />
                    <Button type="button" onClick={() => addTag()}>
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {createForm.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreate}>Create Entry</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      {entries.length === 0 ? (
        <CardContent>
          <p className="text-sm text-muted-foreground">No entries found</p>
        </CardContent>
      ) : (
        entries.map((entry) => (
          <CardContent key={entry.id} className="border-b last:border-b-0">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">{entry.createdAt.toLocaleString()}</h3>
                <Badge className={moodColors[entry.mood as keyof typeof moodColors] || moodColors.neutral}>
                  {entry.mood}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setEditingEntry(entry)
                    setEditForm({
                      content: entry.content,
                      tags: [...entry.tags],
                      mood: entry.mood,
                    })
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(entry.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{entry.content}</p>
            {entry.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {entry.tags.map((tag: string) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        ))
      )}

      <Dialog open={!!editingEntry} onOpenChange={() => setEditingEntry(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Entry</DialogTitle>
          </DialogHeader>
          {editingEntry && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-content">Content</Label>
                <Textarea
                  id="edit-content"
                  value={editForm.content || editingEntry.content}
                  onChange={(e) => setEditForm((prev: any) => ({ ...prev, content: e.target.value }))}
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="edit-mood">Mood</Label>
                <Select
                  value={editForm.mood || editingEntry.mood}
                  onValueChange={(value) => setEditForm((prev: any) => ({ ...prev, mood: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {moods.map((mood) => (
                      <SelectItem key={mood} value={mood}>
                        <span className="capitalize">{mood}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Tags</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyPress={(e) => e.key === "Enter" && addTag(true)}
                  />
                  <Button type="button" onClick={() => addTag(true)}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(editForm.tags || editingEntry.tags).map((tag: string) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag, true)} />
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditingEntry(null)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdate}>Update Entry</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
}
