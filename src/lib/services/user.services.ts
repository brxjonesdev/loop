import { Result, UserCreate, UserModel, UserUpdate } from "../models";
import { UserRepository } from "../repositories/user.repository";

export function createUserServices(userRepository: UserRepository) {
    return {
        createUser: async (data: UserCreate): Promise<Result<UserModel, string>> => {
            return userRepository.createUser(data);
        },
        getUserById: async (id: string): Promise<Result<UserModel | null, string>> => {
            return userRepository.getUserById(id);
        },
        updateUser: async (id: string, data: UserUpdate): Promise<Result<UserModel | null, string>> => {
            return userRepository.updateUser(id, data);
        },
        deleteUser: async (id: string): Promise<Result<boolean, string>> => {
            return userRepository.deleteUser(id);
        }
    };
}
