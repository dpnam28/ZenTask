export enum TaskStatus {
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
}

export interface ITask {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    deadline: Date;
    createdAt: Date;
}