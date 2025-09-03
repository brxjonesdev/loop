import { nanoid } from "nanoid";
import { Entry, EntryCreate, EntryUpdate, Result, ok, err } from "../models";

export interface EntryRepository{
    createEntry(data: EntryCreate): Promise<Result<Entry, string>>;
    getEntryById(id: string): Promise<Result<Entry | null, string>>;
    updateEntry(id: string, data: EntryUpdate): Promise<Result<Entry | null, string>>;
    deleteEntry(id: string): Promise<Result<boolean, string>>;
    getAllEntries(goalID: string): Promise<Result<Entry[], string>>;
    addTag(entryId: string, tag: string): Promise<Result<Entry | null, string>>;
    removeTag(entryId: string, tag: string): Promise<Result<Entry | null, string>>;
}

export function createInMemoryEntryRepository(): EntryRepository {
    const entries: Entry[] = [];
    return {
        async createEntry(data: EntryCreate): Promise<Result<Entry, string>> {
            const id = `entry-${nanoid(12)}`;
            const entry: Entry = {
                id: id,
                createdAt: new Date(),
                updatedAt: new Date(),
                ...data
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
        async getAllEntries(goalID: string): Promise<Result<Entry[], string>> {
            const goalEntries = entries.filter(e => e.goalID === goalID);
            return ok(goalEntries);
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
