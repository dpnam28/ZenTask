import { describe, it, expect, vi, beforeEach } from "vitest";
import { TaskService } from "@/core/services/task.service";
import { TaskStatus } from "@/core/entities/task.entity";
import { db } from "@/lib/db";
import { createTaskMock, mockTaskFromDb, mockTaskInput } from "@/test/mocks/task.mock";

vi.mock("@/lib/db", () => ({
    db: {
        task: {
            create: vi.fn(),
            update: vi.fn(),
            findMany: vi.fn(),
            delete: vi.fn(),
        }
    }
}))

describe("TaskService", () => {
    let taskService: TaskService;
    beforeEach(() => {
        taskService = new TaskService();
        vi.clearAllMocks();
    })
    it("Should create a task with validate data", async () => {
        (db.task.create as any).mockResolvedValue(mockTaskFromDb);
        const result = await taskService.createTask(mockTaskInput);
        expect(result).toEqual(mockTaskFromDb);

        expect(db.task.create).toHaveBeenCalledWith({
            data: expect.objectContaining({
                title: mockTaskInput.title,
                status: TaskStatus.TODO,
            }),
        })

        expect(result.id).toBe("uuid-test");
        expect(result.title).toBe(mockTaskInput.title)
    })
    it("Should throw error when database connection failed", async () => {
        const dbError = new Error("Database connection failed");
        (db.task.create as any).mockRejectedValue(dbError);
        await expect(taskService.createTask(mockTaskInput)).rejects.toThrow(dbError);
        expect(db.task.create).toHaveBeenCalled()
    })
    it("Should throw error when title is empty", async () => {
        const inputData = {
            title: "",
            description: "Test Description"
        }
        await expect(taskService.createTask(inputData)).rejects.toThrow("Title must be at least 3 characters long");
    })
    it("Should throw error when id not found", async () => {
        const id = "1";
        (db.task.update as any).mockRejectedValue(new Error("Task not found"));
        await expect(taskService.updateTaskStatus(id, TaskStatus.TODO)).rejects.toThrow("Task not found");
    })
    it("Should update task with new title", async () => {
        const customTask = createTaskMock({
            title: "Custom Task",
        });
        (db.task.update as any).mockResolvedValue(customTask)
        const result = await taskService.updateTask("1", { title: customTask.title })
        expect(result.title).toBe("Custom Task")
        expect(db.task.update).toHaveBeenCalledWith({
            where: { id: "1" },
            data: expect.objectContaining({
                title: customTask.title,
            })
        })
        expect(result.status).toBe(TaskStatus.TODO)
    })
})
