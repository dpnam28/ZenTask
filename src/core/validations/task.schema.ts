import { z } from "zod";

export const CreateTaskSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long")
        .max(100, "Title must be at most 100 characters long"),
    description: z.string().min(3, "Description must be at least 3 characters long")
        .max(100, "Description must be at most 100 characters long").optional(),
    deadline: z.coerce.date().optional(),
})

export const UpdateTaskSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long")
        .max(100, "Title must be at most 100 characters long").optional(),
    description: z.string().min(3, "Description must be at least 3 characters long")
        .max(100, "Description must be at most 100 characters long").optional(),
    deadline: z.coerce.date().optional(),
})

export type CreateTaskSchema = z.infer<typeof CreateTaskSchema>
export type UpdateTaskSchema = z.infer<typeof UpdateTaskSchema>
