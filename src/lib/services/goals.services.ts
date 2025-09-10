import {  GoalUpdate, ok, err, Goal } from "../models";
import { GoalsRepository } from "../repositories/goals.repository";

export const createGoalsServices = (repo: GoalsRepository) => {
    return {
        createGoal: async (data: Goal) => {
            const result = await repo.createGoal(data);
            if (!result.ok) {
                return err("Failed to create goal");
            }
            return ok(result.data);
        },
        getGoalById: async (id: string) => {
            const result = await repo.getGoalById(id);
            if (!result.ok) {
                return err("Goal not found");
            }
            return ok(result.data);
        },
        updateGoal: async (id: string, data: GoalUpdate) => {
            const result = await repo.updateGoal(id, data);
            if (!result.ok) {
                return err("Failed to update goal");
            }
            return ok(result.data);
        },
        deleteGoal: async (id: string) => {
            const result = await repo.deleteGoal(id);
            if (!result.ok) {
                return err("Failed to delete goal");
            }
            return ok(result.data);
        },
        getUsersGoals: async (userID: string) => {
            const userId = userID; 
            const result = await repo.getUsersGoals(userId);
            if (!result.ok) {
                return err("Failed to retrieve user's goals");
            }
            return ok(result.data);
        }
    };
};
