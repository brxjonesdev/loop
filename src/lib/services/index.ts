import { createInMemoryEntryRepository } from "../repositories/entry.repository";
import { createInMemoryGoalsRepository } from "../repositories/goals.repository";
import { createInMemoryUserRepository } from "../repositories/user.repository";
import { createSupabaseServices } from "./auth.supabase.services";
import { createEntryServices } from "./entry.services";
import { createGoalsServices } from "./goals.services";
import { createUserServices } from "./user.services";


// entry services
const entryInMemoryRepo = createInMemoryEntryRepository();
export const entryServices = createEntryServices(entryInMemoryRepo);

// user services
const userInMemoryRepo = createInMemoryUserRepository();
export const userServices = createUserServices(userInMemoryRepo);

// goal services
 const goalsInMemoryRepo = createInMemoryGoalsRepository();
 export const goalsServices = createGoalsServices(goalsInMemoryRepo);

 export const authServices = createSupabaseServices();