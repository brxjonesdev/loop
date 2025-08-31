import { nanoid } from "nanoid";
import { Entry, EntryCreate, EntryUpdate, Result, ok, err } from "../models";

export interface EntryRepository{
    createEntry(data: EntryCreate): Promise<Result<Entry, string>>;
    getEntryById(id: string): Promise<Result<Entry | null, string>>;
    updateEntry(id: string, data: EntryUpdate): Promise<Result<Entry | null, string>>;
    deleteEntry(id: string): Promise<Result<boolean, string>>;
}

export function createInMemoryEntryRepository(): EntryRepository {
    const entries: Entry[] = [];
    return {
        createEntry(data: EntryCreate): Promise<Result<Entry, string>> {
            const id = `entry-${nanoid(12)}`;
            const entry: Entry = {
                id: id,
                createdAt: new Date(),
                updatedAt: new Date(),
                ...data
            };
            entries.push(entry);
            return Promise.resolve(ok(entry));
        },
        getEntryById(id: string): Promise<Result<Entry | null, string>> {
            const entry = entries.find(e => e.id === id);
            return Promise.resolve(entry ? ok(entry) : err("Entry not found"));
        },
        updateEntry(id: string, data: EntryUpdate): Promise<Result<Entry | null, string>> {
            const entry = entries.find(e => e.id === id);
            if (!entry) return Promise.resolve(err("Entry not found"));
            Object.assign(entry, data);
            return Promise.resolve(ok(entry));
        },
        deleteEntry(id: string): Promise<Result<boolean, string>> {
            const index = entries.findIndex(e => e.id === id);
            if (index === -1) return Promise.resolve(err("Entry not found"));
            entries.splice(index, 1);
            return Promise.resolve(ok(true));
        }
    };
}
