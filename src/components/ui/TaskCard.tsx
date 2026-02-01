import { ITask, TaskStatus } from "@/core/entities/task.entity";
import { StatusButton } from "../features/StatusButton";
import { DeleteButton } from "../features/DeleteButton";
import { EditButton } from "../features/EditButton";

interface TaskCardProps {
  task: ITask;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.TODO:
        return "bg-gray-200 text-gray-800";
      case TaskStatus.IN_PROGRESS:
        return "bg-blue-200 text-blue-800";
      case TaskStatus.COMPLETED:
        return "bg-green-200 text-green-800";
    }
  };

  return (
    <div className="flex flex-col justify-between p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
      <div className="">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                task.status
              )}`}
            >
              {task.status}
            </span>
            <DeleteButton id={task.id} />
          </div>
        </div>
        {task.description && (
          <p className="mt-2 text-gray-600 text-sm">{task.description}</p>
        )}
        {task.deadline && (
          <p className="mt-4 text-xs text-red-500 font-medium">
            Deadline: {new Date(task.deadline).toLocaleDateString()}
          </p>
        )}

      </div>
      <div className="flex flex-col items-center">
        <EditButton task={task} />
        <StatusButton id={task.id} status={task.status} />
      </div>
    </div>
  );
};
