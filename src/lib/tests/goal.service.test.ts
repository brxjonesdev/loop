import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GoalsRepository } from '@/lib/repositories/goals.repository'
import { ok, err, GoalCreate, GoalUpdate, Goal } from '../models'
import { createGoalsServices } from '../services/goals.services'


const mockRepo: GoalsRepository = {
    createGoal: vi.fn(),
    getGoalById: vi.fn(),
    updateGoal: vi.fn(),
    deleteGoal: vi.fn(),
    getUsersGoals: vi.fn(),
}

describe('Goals Services', () => {
    let services: ReturnType<typeof createGoalsServices>

    beforeEach(() => {
        // Reset all mocks before each test
        vi.resetAllMocks()
        // Create fresh services instance
        services = createGoalsServices(mockRepo)
    })
    // Creating a goal
    describe("creating a goal", () => {
        const mockGoal: GoalCreate = {
            userId: "user123",
            title: "Test Goal",
            description: "This is a test goal",
        }
        
        it("should create a goal successfully", async () => {
            const createdGoal: Goal = {
                id: "goal123",
                ...mockGoal,
                createdAt: new Date(),
                updatedAt: new Date(),
                color: "blue",
            }
            vi.mocked(mockRepo.createGoal).mockResolvedValueOnce(ok(createdGoal))
            const result = await services.createGoal(createdGoal)
            expect(result.ok).toBe(true)
            
        })

        it("should handle failure to create a goal", async () => {

            const createdGoal: Goal = {
                id: "goal123",
                ...mockGoal,
                createdAt: new Date(),
                updatedAt: new Date(),
                color: "blue",
            }
            vi.mocked(mockRepo.createGoal).mockResolvedValueOnce(err("DB error"))
            const result = await services.createGoal(createdGoal)
            expect(result.ok).toBe(false)
            if (!result.ok) {
                expect(result.error).toBe("Failed to create goal")
            }
            expect(mockRepo.createGoal).toHaveBeenCalledWith(createdGoal)

        })
    })
    // Updating a goal
    describe("updating a goal", () => {
        const mockUpdate: GoalUpdate = {
            id: "goal123",
            title: "Updated Goal Title",
            description: "Updated description",
            color: "red",
        }
        it("should update a goal successfully", async () => {
            const updatedGoal: Goal = {
                id: "goal123",
                userId: "user123",
                title: "Updated Goal Title",
                description: "Updated description",
                color: "red",
                createdAt: new Date(),
                updatedAt: new Date(),
            }
            vi.mocked(mockRepo.updateGoal).mockResolvedValueOnce(ok(updatedGoal))
            const result = await services.updateGoal("goal123", mockUpdate)
            expect(result.ok).toBe(true)
        })

        it("should handle failure to update a goal", async () => {
            vi.mocked(mockRepo.updateGoal).mockResolvedValueOnce(err("DB error"))
            const result = await services.updateGoal("goal123", mockUpdate)
            expect(result.ok).toBe(false)
            if (!result.ok) {
                expect(result.error).toBe("Failed to update goal")
            }
            
        })
    
    })
    // Deleting a goal
    describe("deleting a goal", () => {

        it("should delete a goal successfully", async () => {
            vi.mocked(mockRepo.deleteGoal).mockResolvedValueOnce(ok(true))
            const result = await services.deleteGoal("goal123")
            expect(result.ok).toBe(true)
            if (result.ok) {
                expect(result.data).toBe(true)
            }
            expect(mockRepo.deleteGoal).toHaveBeenCalledWith("goal123")
        })
        it("should handle failure to delete a goal", async () => {
            vi.mocked(mockRepo.deleteGoal).mockResolvedValueOnce(err("DB error"))
            const result = await services.deleteGoal("goal123")
            expect(result.ok).toBe(false)
             if (!result.ok) {
            expect(result.error).toBe("Failed to delete goal")
        }   
            expect(mockRepo.deleteGoal).toHaveBeenCalledWith("goal123")
        })
        it("should handle deleting a non-existent goal", async () => {
            vi.mocked(mockRepo.deleteGoal).mockResolvedValueOnce(err("Goal not found"))
            const result = await services.deleteGoal("nonexistentGoal")
            expect(result.ok).toBe(false)
            if (!result.ok) {
                expect(result.error).toBe("Failed to delete goal")
            }
        })

       
    })
    // Retrieving a goal by ID
    describe("retrieving a goal by ID", () => {
        const mockGoal: Goal = {
                id: "goal123",
                userId: "user123",
                title: "Updated Goal Title",
                description: "Updated description",
                color: "red",
                createdAt: new Date(),
                updatedAt: new Date(),
        }
        it("should retrieve a goal successfully", async () => {
            vi.mocked(mockRepo.getGoalById).mockResolvedValueOnce(ok(mockGoal))
            const result = await services.getGoalById("goal123")
            expect(result.ok).toBe(true)
            if (result.ok) {
                expect(result.data).toEqual(mockGoal)
            }
        })
        it("should handle goal not found error", async () => {
            vi.mocked(mockRepo.getGoalById).mockResolvedValueOnce(err("Not found"))
            const result = await services.getGoalById("nonexistentGoal")
            expect(result.ok).toBe(false)
            if (!result.ok) {
                expect(result.error).toBe("Goal not found")
            }
        })
    })

    // Retrieving all goals for a user
    describe("retrieving all goals for a user", () => {
        const mockGoals: Goal[] = [
            {
            id: "goal1",
            userId: "user123",
            title: "First Goal",
            description: "Description for first goal",
            color: "green",
            createdAt: new Date(),
            updatedAt: new Date(),
            },
            {
            id: "goal2",
            userId: "user123",
            title: "Second Goal",
            description: "Description for second goal",
            color: "blue",
            createdAt: new Date(),
            updatedAt: new Date(),
            }
        ]
        it("should retrieve all goals successfully", async () => {
            vi.mocked(mockRepo.getUsersGoals).mockResolvedValueOnce(ok(mockGoals))
            const result = await services.getUsersGoals("user123")
            expect(result.ok).toBe(true)
            if (result.ok) {
                expect(result.data).toEqual(mockGoals)
            }
        })
    })
})