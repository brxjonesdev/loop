import { ok, err, EntryUpdate, Entry } from "../models";
import { EntryRepository } from "../repositories/entry.repository";

export const createEntryServices = (repo: EntryRepository) => {
    return {
        createEntry: async (data: Entry) => {
            // validate data
            const result = await repo.createEntry(data);
            if (!result.ok) {
                return err("Failed to create entry");
            }
            return ok(result.data);
        },
        getEntryById: async (id: string) => {
            const result = await repo.getEntryById(id);
            if (!result.ok) {
                return err("Entry not found");
            }
            return ok(result.data);
        },
        updateEntry: async (id: string, data: EntryUpdate) => {
            if (!id){
                return err("ID is required");
            }

            if (!data) {
                return err("Data is required");
            }

            const result = await repo.updateEntry(id, data);
            if (!result.ok) {
                return err("Failed to update entry");
            }
            return ok(result.data);
        },
        deleteEntry: async (id: string) => {
            const result = await repo.deleteEntry(id);
            if (!result.ok) {
                return err("Failed to delete entry");
            }
            return ok(result.data);
        },
        getAllEntries: async (userID: string) => {
            console.log("Fetching entries for userID:", userID);
            const result = await repo.getAllEntries(userID);
            if (!result.ok) {
                return err("Failed to retrieve entries");
            }
            return ok(result.data);
        },
        addTag: async (entryId: string, tag: string) => {
            const result = await repo.addTag(entryId, tag);
            if (!result.ok) {
                return err("Failed to add tag");
            }
            return ok(result.data);
        },
        removeTag: async (entryId: string, tag: string) => {
            const result = await repo.removeTag(entryId, tag);
            if (!result.ok) {
                return err("Failed to remove tag");
            }
            return ok(result.data);
        }
    }

}