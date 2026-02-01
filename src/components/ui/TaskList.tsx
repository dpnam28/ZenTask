import { TaskService } from "@/core/services/task.service";
import { TaskCard } from "./TaskCard";

export const TaskList = async () => {
  const taskService = new TaskService();
  const tasks = await taskService.getAllTasks();

  if (tasks.length === 0) {
    return (
      <p className="text-center text-gray-500 py-10">
        Chưa có công việc nào. Hãy thêm mới!
      </p>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};
