export interface Entry{
    id: string
    goalID: string
    content: string
    createdAt: Date
    updatedAt: Date
    tags: string[]
    mood: "happy" | "sad" | "neutral" | "angry" | "excited" | "anxious" | "calm" | "bored" | "confused" | "hopeful" | "frustrated" | "content" | string
    
}

export interface EntryCreate {
    goalID: string;
    content: string;
    tags: string[];
    mood: "happy" | "sad" | "neutral" | "angry" | "excited" | "anxious" | "calm" | "bored" | "confused" | "hopeful" | "frustrated" | "content" | string;
}

export interface EntryUpdate {
    content?: string;
    tags?: string[];
    mood?: "happy" | "sad" | "neutral" | "angry" | "excited" | "anxious" | "calm" | "bored" | "confused" | "hopeful" | "frustrated" | "content" | string;
}