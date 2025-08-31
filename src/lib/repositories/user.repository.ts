import { UserCreate, UserModel, UserUpdate, Result, ok, err } from "../models";
import {nanoid} from "nanoid";

export interface UserRepository {
    createUser(data: UserCreate): Promise<Result<UserModel, string>>;
    getUserById(id: string): Promise<Result<UserModel | null, string>>;
    updateUser(id: string, data: UserUpdate): Promise<Result<UserModel | null, string>>;
    deleteUser(id: string): Promise<Result<boolean, string>>;
}

export function createInMemoryUserRepository(): UserRepository {
    const users: UserModel[] = [];
    return {
        createUser(data: UserCreate): Promise<Result<UserModel, string>> {
            const id = `user-${nanoid(12)}`;
            const user: UserModel = {
                id: id,
                createdAt: new Date(),
                updatedAt: new Date(),
                ...data
            };
            users.push(user);
            return Promise.resolve(ok(user));
        },
        getUserById(id: string): Promise<Result<UserModel | null, string>> {
            const user = users.find(u => u.id === id);
            return Promise.resolve(user ? ok(user) : err("User not found"));
        },
        updateUser(id: string, data: UserUpdate): Promise<Result<UserModel | null, string>> {
            const user = users.find(u => u.id === id);
            if (!user) return Promise.resolve(err("User not found"));
            Object.assign(user, data);
            return Promise.resolve(ok(user));
        },
        deleteUser(id: string): Promise<Result<boolean, string>> {
            const index = users.findIndex(u => u.id === id);
            if (index === -1) return Promise.resolve(err("User not found"));
            users.splice(index, 1);
            return Promise.resolve(ok(true));
        }
    };
}
