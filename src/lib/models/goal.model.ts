export interface Goal{
    id: string
    userId: string
    title: string
    description: string
    color: "red" | "blue" | "green" | "yellow" | "orange" | "purple" | "pink" | "teal" | "cyan" | "lime" | "indigo" | "gray"
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
