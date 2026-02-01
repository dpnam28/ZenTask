import { TaskStatus } from "@/core/entities/task.entity";

export const mockTaskInput = {
    title: "Test Task",
    description: "Test Description",
    deadline: new Date(),
}

export const mockTaskFromDb = {
    id: "uuid-test",
    ...mockTaskInput,
    status: TaskStatus.TODO,
    createdAt: new Date(),
}

export const createTaskMock = (overrides = {}) => {
    return {
        ...mockTaskFromDb,
        ...overrides,
    }
}