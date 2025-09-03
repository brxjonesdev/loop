import { err } from "../models";
import { EntryCreate, EntryUpdate } from "../models/entry.model";
import { EntryRepository } from "../repositories/entry.repository";

export const createEntryServices = (repo: EntryRepository) => {
    return {
        createEntry: async (data: EntryCreate) => {
            // validate data
            const result = await repo.createEntry(data);
            if (!result) {
                return err("Failed to create entry");
            }
            return result;
        },
        getEntryById: async (id: string) => {
            const result = await repo.getEntryById(id);
            return result;
        },
        updateEntry: async (id: string, data: EntryUpdate) => {
            const result = await repo.updateEntry(id, data);
            return result;
        },
        deleteEntry: async (id: string) => {
            const result = await repo.deleteEntry(id);
            return result;
        },
        getAllEntries: async (goalID: string) => {
            const result = await repo.getAllEntries(goalID);
            return result;
        },
        addTag: async (entryId: string, tag: string) => {
            const result = await repo.addTag(entryId, tag);
            return result;
        },
        removeTag: async (entryId: string, tag: string) => {
            const result = await repo.removeTag(entryId, tag);
            return result;
        }
    }

}