import { createInMemoryEntryRepository, createSupabaseEntryRepository } from "../repositories/entry.repository";
import { createSupabaseGoalsRepository } from "../repositories/goals.repository";
import { createEntryServices } from "./entry.services";
import { createGoalsServices } from "./goals.services";


// entry services
// const entryInMemoryRepo = createInMemoryEntryRepository();
const entryRepo = createSupabaseEntryRepository();
export const entryServices = createEntryServices(entryRepo);


// goal services
//  const goalsInMemoryRepo = createInMemoryGoalsRepository();
 const goalsRepo = createSupabaseGoalsRepository()
 export const goalsServices = createGoalsServices(goalsRepo);
