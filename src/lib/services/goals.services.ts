import { GoalCreate, GoalUpdate } from "../models";
import { GoalsRepository } from "../repositories/goals.repository";

export const createGoalsServices = (repo: GoalsRepository) => {
    return {
        createGoal: async (data: GoalCreate) => {
            const result = await repo.createGoal(data);
            return result;
        },
        getGoalById: async (id: string) => {
            const result = await repo.getGoalById(id);
            return result;
        },
        updateGoal: async (id: string, data: GoalUpdate) => {
            const result = await repo.updateGoal(id, data);
            return result;
        },
        deleteGoal: async (id: string) => {
            const result = await repo.deleteGoal(id);
            return result;
        },
        getUsersGoals: async (userId: string) => {
            const result = await repo.getUsersGoals(userId);
            return result;
        }
    };
};
