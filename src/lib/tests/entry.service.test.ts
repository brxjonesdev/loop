  /* eslint-disable @typescript-eslint/no-explicit-any */
  import { describe, it, expect, vi, beforeEach } from 'vitest'
import { EntryRepository } from '../repositories/entry.repository'
import { ok, err, EntryCreate, EntryUpdate, Entry } from '../models'
import { createEntryServices } from '../services/entry.services'

const mockRepo: EntryRepository = {
  createEntry: vi.fn(),
  getEntryById: vi.fn(),
  updateEntry: vi.fn(),
  deleteEntry: vi.fn(),
  getAllEntries: vi.fn(),
  addTag: vi.fn(),
  removeTag: vi.fn(),
}

describe('Entry Services', () => {
  let services: ReturnType<typeof createEntryServices>

  beforeEach(() => {
    // Reset all mocks before each test
    vi.resetAllMocks()
    // Create fresh services instance
    services = createEntryServices(mockRepo)
  })

  // Creating an entry
  describe("creating an entry", () => {
    const mockEntry: EntryCreate = {
      goalID: "goal123",
      content: "This is a test entry",
      tags: ["test", "entry"],
      mood: "happy"
    }


    it("should create an entry successfully", async () => {
      const createdEntry: Entry = {
        id: "entry123",
        userID: "dummyUser",
        ...mockEntry,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      vi.mocked(mockRepo.createEntry).mockResolvedValueOnce(ok(createdEntry))
      const result = await services.createEntry(createdEntry)
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.data).toEqual(createdEntry)
      }
      expect(mockRepo.createEntry).toHaveBeenCalledWith(createdEntry)

    })
    it("should handle repository errors gracefully", async () => {
      const createdEntry: Entry = {
        id: "entry123",
        userID: "dummyUser",
        ...mockEntry,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      vi.mocked(mockRepo.createEntry).mockResolvedValueOnce(err("Database error"))
      const result = await services.createEntry(createdEntry)
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe("Failed to create entry")
      }

    })
  })
  // Updating an entry
  describe("updating an entry", () => {
    const entryId = "entry123"
    const updateData: EntryUpdate = {
      content: "Updated content",
      mood: "sad"
    }

    it("should update an entry successfully", async () => {
      const updatedEntry = {
        id: entryId,
        goalID: "goal123",
        userID: "dummyUser",
        content: updateData.content || "This is a test entry",
        mood: updateData.mood || "happy",
        tags: ["test", "entry"],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      vi.mocked(mockRepo.updateEntry).mockResolvedValueOnce(ok(updatedEntry))

      const result = await services.updateEntry(entryId, updateData)
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.data).toEqual(updatedEntry)
      }
      expect(mockRepo.updateEntry).toHaveBeenCalledWith(entryId, updateData)
    })
    it("should handle missing ID error", async () => {
      const result = await services.updateEntry("", updateData)
      expect(result.ok).toBe(false)
      expect(mockRepo.updateEntry).not.toHaveBeenCalled()
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe('ID is required')
      }
    })
    it("should handle missing data error", async () => {
      const result = await services.updateEntry(entryId, undefined as any)
      expect(result.ok).toBe(false)
      expect(mockRepo.updateEntry).not.toHaveBeenCalled()
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe('Data is required')
      }
    })
    it("should handle repository errors gracefully", async () => {
      vi.mocked(mockRepo.updateEntry).mockResolvedValueOnce(err("Database error"))
      const result = await services.updateEntry(entryId, updateData)
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe("Failed to update entry")
      }
    })
  })
  // Deleting an entry
  describe("deleting an entry", () => {
    const entryId = "entry123"
    it("should delete an entry successfully", async () => {
      vi.mocked(mockRepo.deleteEntry).mockResolvedValueOnce(ok(true))
      const result = await services.deleteEntry(entryId)
      expect(result.ok).toBe(true)
    })
    it("should handle repository errors gracefully", async () => {
      vi.mocked(mockRepo.deleteEntry).mockResolvedValueOnce(err("Database error"))
      const result = await services.deleteEntry(entryId)
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe("Failed to delete entry")
      }
    })
  })
  // Retrieving an entry by ID
  describe("retrieving an entry by ID", () => {
    const entryId = "entry123"
    const mockEntry: Entry = {
      id: entryId,
      goalID: "goal123",
      userID: "dummyUser",
      content: "This is a test entry",
      tags: ["test", "entry"],
      mood: "happy",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    it("should retrieve an entry successfully", async () => {
      vi.mocked(mockRepo.getEntryById).mockResolvedValueOnce(ok(mockEntry))
      const result = await services.getEntryById(entryId)
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.data).toEqual(mockEntry)
      }
    })
    it("should handle entry not found error", async () => {
      vi.mocked(mockRepo.getEntryById).mockResolvedValueOnce(err("Not found"))
      const result = await services.getEntryById(entryId)
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe("Entry not found")
      }
    })
    it("should handle repository errors gracefully", async () => {
      vi.mocked(mockRepo.getEntryById).mockResolvedValueOnce(err("Database error"))
      const result = await services.getEntryById(entryId)
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe("Entry not found")
      }
    })
  })
  // Retrieving all entries for a user
  describe("retrieving all entries for a user", () => {
    const mockEntries: Entry[] = [
      {
      id: "entry1",
      goalID: "goal123",
      userID: "user1",
      content: "First entry",
      tags: ["tag1", "tag2"],
      mood: "happy",
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
      id: "entry2",
      goalID: "goal456",
      userID: "user1",
      content: "Second entry",
      tags: ["tag3"],
      mood: "neutral",
      createdAt: new Date(),
      updatedAt: new Date(),
      }
    ]

    it("should retrieve all entries successfully", async () => {
      vi.mocked(mockRepo.getAllEntries).mockResolvedValueOnce(ok(mockEntries))
      const result = await services.getAllEntries("user1")
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.data).toEqual(mockEntries)
      }
    })
    it("should handle repository errors gracefully", async () => {
      vi.mocked(mockRepo.getAllEntries).mockResolvedValueOnce(err("Database error"))
      const result = await services.getAllEntries("user1")
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe("Failed to retrieve entries")
      }
    })
  })
  
  // Adding a tag to an entry
  describe("adding a tag to an entry", () => {
    const entryId = "entry123"
    const newTag = "newTag"
    const updatedEntry: Entry = {
      id: entryId,
      goalID: "goal123",
      userID: "dummyUser",
      content: "This is a test entry",
      tags: ["test", "entry", newTag],
      mood: "happy",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    it("should add a tag successfully", async () => {
      vi.mocked(mockRepo.addTag).mockResolvedValueOnce(ok(updatedEntry))
      const result = await services.addTag(entryId, newTag)
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.data).toEqual(updatedEntry)
      }
    })
    it("should handle repository errors gracefully", async () => {
      vi.mocked(mockRepo.addTag).mockResolvedValueOnce(err("Database error"))
      const result = await services.addTag(entryId, newTag)
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe("Failed to add tag")
      }
    })
  })
  // Removing a tag from an entry
  describe("removing a tag from an entry", () => {
    const entryId = "entry123"
    const tagToRemove = "entry"
    const updatedEntry: Entry = {
      id: entryId,
      goalID: "goal123",
      userID: "dummyUser",
      content: "This is a test entry",
      tags: ["test"], // 'entry' tag removed
      mood: "happy",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    it("should remove a tag successfully", async () => {
      vi.mocked(mockRepo.removeTag).mockResolvedValueOnce(ok(updatedEntry))
      const result = await services.removeTag(entryId, tagToRemove)
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.data).toEqual(updatedEntry)
      }
    })
    it("should handle repository errors gracefully", async () => {
      vi.mocked(mockRepo.removeTag).mockResolvedValueOnce(err("Database error"))
      const result = await services.removeTag(entryId, tagToRemove)
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe("Failed to remove tag")
      }
    })
  })
})