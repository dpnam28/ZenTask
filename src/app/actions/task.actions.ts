"use server"

import { TaskService } from "@/core/services/task.service"
import { CreateTaskSchema, UpdateTaskSchema } from "@/core/validations/task.schema"
import { TaskStatus } from "@/core/entities/task.entity"
import { revalidatePath } from "next/cache"
import { ZodValidationError } from "@/core/errors/task.error"

const taskService = new TaskService()

export type ActionState = {
    error?: {
        title?: string[];
        description?: string[];
        deadline?: string[];
        server?: string[];
    };
    success?: boolean;
}

export async function createTaskAction(_: ActionState | null, formData: FormData): Promise<ActionState> {
    const rawData = {
        title: formData.get("title")!.toString() as string,
        description: formData.get("description")!.toString(),
        deadline: formData.get("deadline")
            ? new Date(formData.get("deadline") as string)
            : undefined
    }

    try {
        await taskService.createTask(rawData)
        revalidatePath("/")
        return {
            success: true
        }
    } catch (e: any) {
        if (e?.name == "ZodValidationError") {
            return { error: e.error };
        }
        return {
            error: {
                server: ["Something went wrong"]
            }
        }
    }
}

export async function toggleTaskStatusAction(id: string, currentStatus: TaskStatus) {
    try {
        let nextStatus: TaskStatus;
        switch (currentStatus) {
            case TaskStatus.TODO:
                nextStatus = TaskStatus.IN_PROGRESS;
                break;
            case TaskStatus.IN_PROGRESS:
                nextStatus = TaskStatus.COMPLETED;
                break;
            case TaskStatus.COMPLETED:
                nextStatus = TaskStatus.TODO;
                break;
            default:
                nextStatus = TaskStatus.TODO;
                break;
        }
        await taskService.updateTaskStatus(id, nextStatus)
        revalidatePath("/")
        return { success: true }
    } catch (error) {
        console.error("TOGGLE TASK STATUS ERROR:", error);
        return { error: { server: ["Something went wrong"] } }
    }
}

export async function deleteTaskAction(id: string) {
    try {
        await taskService.deleteTask(id)
        revalidatePath("/")
        return { success: true }
    } catch (error) {
        console.error("DELETE TASK ERROR:", error);
        return { error: { server: ["Something went wrong"] } }
    }
}

export async function updateTaskAction(id: string, prevState: ActionState | null, formData: FormData): Promise<ActionState> {
    const rawData = {
        title: formData.get("title"),
        description: formData.get("description"),
        deadline: formData.get("deadline") || undefined,
    }

    const validatedData = UpdateTaskSchema.safeParse(rawData)
    if (!validatedData.success) {
        console.log(validatedData.error.flatten().fieldErrors)
        return {
            error: validatedData.error.flatten().fieldErrors
        }
    }

    try {
        await taskService.updateTask(id, validatedData.data)
        revalidatePath("/")
        return {
            success: true
        }
    } catch (error) {
        console.error("UPDATE TASK ERROR:", error);
        return { error: { server: ["Something went wrong"] } }
    }
}

