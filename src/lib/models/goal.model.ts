export interface Goal{
    id: string
    userId: string
    title: string
    description: string
    createdAt: Date
    updatedAt: Date
}

export interface GoalCreate{
    userId: string
    title: string
    description: string
}

export interface GoalUpdate{
    id: string
    userId?: string
    title?: string
    description?: string
}
