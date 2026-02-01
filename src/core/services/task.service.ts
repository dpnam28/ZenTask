import { db } from "@/lib/db";
import { ITask, TaskStatus } from "../entities/task.entity";
import { CreateTaskSchema } from "../validations/task.schema";
import { ZodValidationError } from "../errors/task.error";
export class TaskService {
  async getAllTasks(): Promise<ITask[]> {
    const tasks = await db.task.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return tasks as ITask[];
  }
  async createTask(data: {
    title: string;
    description: string;
    deadline?: Date;
  }): Promise<ITask> {
    const validatedData = CreateTaskSchema.safeParse(data);
    if (!validatedData.success) {
      throw new ZodValidationError(validatedData.error.flatten().fieldErrors)
    }
    return await db.task.create({
      data: {
        title: validatedData.data.title,
        description: validatedData.data.description,
        deadline: validatedData.data.deadline,
        status: TaskStatus.TODO,
      },
    }) as ITask;
  }
  async updateTaskStatus(id: string, newStatus: TaskStatus): Promise<ITask> {
    return await db.task.update({
      where: { id },
      data: { status: newStatus },
    }) as ITask;
  }
  async deleteTask(id: string): Promise<void> {
    await db.task.delete({ where: { id } })
  }
  async updateTask(id: string, data: Partial<ITask>): Promise<ITask> {
    return await db.task.update({
      where: { id },
      data,
    }) as ITask;
  }
}
