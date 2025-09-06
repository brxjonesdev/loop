import { GoalCreate, GoalUpdate, ok, err } from "../models";
import { GoalsRepository } from "../repositories/goals.repository";

export const createGoalsServices = (repo: GoalsRepository) => {
    return {
        createGoal: async (data: GoalCreate) => {
            const result = await repo.createGoal(data);
           if (!result) {
                return err("Failed to create goal");
            }
            return ok(result);
        },
        getGoalById: async (id: string) => {
            const result = await repo.getGoalById(id);
            if (!result) {
                return err("Goal not found");
            }
            return ok(result);
        },
        updateGoal: async (id: string, data: GoalUpdate) => {
            const result = await repo.updateGoal(id, data);
            if (!result) {
                return err("Failed to update goal");
            }
            return ok(result);
        },
        deleteGoal: async (id: string) => {
            const result = await repo.deleteGoal(id);
            if (!result) {
                return err("Failed to delete goal");
            }
            return ok(result);
        },
        getUsersGoals: async (userId: string) => {
            const result = await repo.getUsersGoals(userId);
            if (!result) {
                return err("Failed to retrieve user's goals");
            }
            return ok(result);
        }
    };
};
