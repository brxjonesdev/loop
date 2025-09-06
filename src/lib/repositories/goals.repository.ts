import { nanoid } from "nanoid";
import { Goal, GoalCreate, GoalUpdate, Result, ok, err} from "../models";

export interface GoalsRepository {
    createGoal(data: GoalCreate): Promise<Result<Goal, string>>;
    getGoalById(id: string): Promise<Result<Goal | null, string>>;
    updateGoal(id: string, data: GoalUpdate): Promise<Result<Goal | null, string>>;
    deleteGoal(id: string): Promise<Result<boolean, string>>;
    getUsersGoals(userId: string): Promise<Result<Goal[], string>>;
}

export function createInMemoryGoalsRepository(): GoalsRepository {
    const goals: Goal[] = [
        {
            id: "goal-1",
            userId: "user-123",
            title: "Learn TypeScript",
            description: "Complete the TypeScript course on Codecademy",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: "goal-2",
            userId: "user-123",
            title: "Build a Portfolio",
            description: "Create a personal portfolio website to showcase projects",
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ];

    return {
        async createGoal(data: GoalCreate): Promise<Result<Goal, string>> {
            const id = `goal-${nanoid(12)}`;
            const goal: Goal = {
                id: id,
                createdAt: new Date(),
                updatedAt: new Date(),
                ...data
            };
            goals.push(goal);
            return ok(goal);
        },

        async getGoalById(id: string): Promise<Result<Goal | null, string>> {
            const goal = goals.find(g => g.id === id);
            return goal ? ok(goal) : err("Goal not found");
        },

        async updateGoal(id: string, data: GoalUpdate): Promise<Result<Goal | null, string>> {
            const goal = goals.find(g => g.id === id);
            if (!goal) return err("Goal not found");
            Object.assign(goal, data);
            return ok(goal);
        },

        async deleteGoal(id: string): Promise<Result<boolean, string>> {
            const index = goals.findIndex(g => g.id === id);
            if (index === -1) return err("Goal not found");
            goals.splice(index, 1);
            return ok(true);
        },

        async getUsersGoals(userId: string): Promise<Result<Goal[], string>> {
            const userGoals = goals.filter(g => g.userId === userId);
            return ok(userGoals);
        }
    };
}