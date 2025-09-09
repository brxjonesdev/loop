import { nanoid } from "nanoid";
import { Entry, EntryCreate, EntryUpdate, Result, ok, err } from "../models";

export interface EntryRepository{
    createEntry(data: EntryCreate): Promise<Result<Entry, string>>;
    getEntryById(id: string): Promise<Result<Entry | null, string>>;
    updateEntry(id: string, data: EntryUpdate): Promise<Result<Entry | null, string>>;
    deleteEntry(id: string): Promise<Result<boolean, string>>;
    getAllEntries(userID: string): Promise<Result<Entry[], string>>;
    addTag(entryId: string, tag: string): Promise<Result<Entry | null, string>>;
    removeTag(entryId: string, tag: string): Promise<Result<Entry | null, string>>;
}

export function createInMemoryEntryRepository(): EntryRepository {
    const entries: Entry[] = [
        {
            id: "entry-1",
            userID: "user-123",
            goalID: "goal-1",
            createdAt: new Date("2025-09-01T10:00:00Z"),
            updatedAt: new Date("2025-09-01T10:00:00Z"),
            content: "First entry content",
            tags: ["tag1", "tag2"],
            mood: "happy"
        },
        {
            id: "entry-2",
            goalID: "goal-1",
            userID: "user-123",
            createdAt: new Date("2025-09-02T11:00:00Z"),
            updatedAt: new Date("2025-09-02T11:00:00Z"),
            content: "Second entry content",
            tags: ["tag2"],
            mood: "happy"
        },
         {
            id: "entry-2.4",
            goalID: "goal-1",
            userID: "user-123",
            createdAt: new Date("2025-09-02T11:00:00Z"),
            updatedAt: new Date("2025-09-02T11:00:00Z"),
            content: "Second entry content",
            tags: ["tag2"],
            mood: "neutral"
        },
        {
            id: "entry-3",
            goalID: "goal-2",
            userID: "user-123",
            createdAt: new Date("2025-09-03T12:00:00Z"),
            updatedAt: new Date("2025-09-03T12:00:00Z"),
            content: "Third entry content",
            tags: ["tag3"],
            mood: "sad"
        },
        {
            id: "entry-4",
            goalID: "goal-2",
            userID: "user-13",
            createdAt: new Date("2025-09-04T13:00:00Z"),
            updatedAt: new Date("2025-09-04T13:00:00Z"),
            content: "Fourth entry content",
            tags: [],
            mood: "neutral"
        },
    ];
    return {
        async createEntry(data: EntryCreate): Promise<Result<Entry, string>> {
            const id = `entry-${nanoid(12)}`;
            const userID = "user-123"; 
            const entry: Entry = {
                id: id,
                createdAt: new Date(),
                updatedAt: new Date(),
                ...data,
                userID: userID
            };
            entries.push(entry);
            return ok(entry);
        },
        async getEntryById(id: string): Promise<Result<Entry | null, string>> {
            const entry = entries.find(e => e.id === id);
            return entry ? ok(entry) : err("Entry not found");
        },
        async updateEntry(id: string, data: EntryUpdate): Promise<Result<Entry | null, string>> {
            const entry = entries.find(e => e.id === id);
            if (!entry) return err("Entry not found");
            Object.assign(entry, data);
            return ok(entry);
        },
        async deleteEntry(id: string): Promise<Result<boolean, string>> {
            const index = entries.findIndex(e => e.id === id);
            if (index === -1) return err("Entry not found");
            entries.splice(index, 1);
            return ok(true);
        },
        async getAllEntries(userID: string): Promise<Result<Entry[], string>> {
            const userEntries = entries.filter(e => e.userID === userID);
            return ok(userEntries);
        },
        async addTag(entryId: string, tag: string): Promise<Result<Entry | null, string>> {
            const entry = entries.find(e => e.id === entryId);
            if (!entry) return err("Entry not found");
            entry.tags.push(tag);
            return ok(entry);
        },
        async removeTag(entryId: string, tag: string): Promise<Result<Entry | null, string>> {
            const entry = entries.find(e => e.id === entryId);
            if (!entry) return err("Entry not found");
            entry.tags = entry.tags.filter(t => t !== tag);
            return ok(entry);
        }
    };
}
