import { UserCreate, UserUpdate, ok, err } from "../models";
import { UserRepository } from "../repositories/user.repository";

export function createUserServices(userRepository: UserRepository) {
    return {
        createUser: async (data: UserCreate) => {
            const result = await userRepository.createUser(data);
            if (!result) {
                return err("Failed to create user");
            }
            return ok(result);
        },
        getUserById: async (id: string) => {
            const result = await userRepository.getUserById(id);
            if (!result) {
                return err("User not found");
            }
            return ok(result);
        },
        updateUser: async (id: string, data: UserUpdate) => {
            const result = await userRepository.updateUser(id, data);
            if (!result) {
                return err("Failed to update user");
            }
            return ok(result);
        },
        deleteUser: async (id: string) => {
            const result = await userRepository.deleteUser(id);
            if (!result) {
                return err("Failed to delete user");
            }
            return ok(result);
        }
    };
}
