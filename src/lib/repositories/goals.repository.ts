import { nanoid } from "nanoid";
import { Goal, GoalCreate, GoalUpdate, Result, ok, err} from "../models";

export interface GoalsRepository {
    createGoal(data: GoalCreate): Promise<Result<Goal, string>>;
    getGoalById(id: string): Promise<Result<Goal | null, string>>;
    updateGoal(id: string, data: GoalUpdate): Promise<Result<Goal | null, string>>;
    deleteGoal(id: string): Promise<Result<boolean, string>>;
}

export function createInMemoryGoalsRepository(): GoalsRepository {
    const goals: Goal[] = [];
    return {
        createGoal(data: GoalCreate): Promise<Result<Goal, string>> {
            const id = `goal-${nanoid(12)}`;
            const goal: Goal = {
                id: id,
                createdAt: new Date(),
                updatedAt: new Date(),
                ...data
            };
            goals.push(goal);
            return Promise.resolve(ok(goal));
        },
        getGoalById(id: string): Promise<Result<Goal | null, string>> {
            const goal = goals.find(g => g.id === id);
            return Promise.resolve(goal ? ok(goal) : err("Goal not found"));
        },
        updateGoal(id: string, data: GoalUpdate): Promise<Result<Goal | null, string>> {
            const goal = goals.find(g => g.id === id);
            if (!goal) return Promise.resolve(err("Goal not found"));
            Object.assign(goal, data);
            return Promise.resolve(ok(goal));
        },
        deleteGoal(id: string): Promise<Result<boolean, string>> {
            const index = goals.findIndex(g => g.id === id);
            if (index === -1) return Promise.resolve(err("Goal not found"));
            goals.splice(index, 1);
            return Promise.resolve(ok(true));
        }
    };
}
