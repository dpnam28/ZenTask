"use client"

import { toggleTaskStatusAction } from '@/app/actions/task.actions';
import { TaskStatus } from '@/core/entities/task.entity';
import { useTransition } from 'react'

type StatusButtonProps = {
  id: string;
  status: TaskStatus
}

export const StatusButton = ({ id, status }: StatusButtonProps) => {

  const [isPending, startTransition] = useTransition()

  const handleUpdate = () => {
    startTransition(async () => {
      await toggleTaskStatusAction(id, status)
    })
  }
  return (
    <button
      onClick={handleUpdate}
      disabled={isPending}
      className={`mt-2 w-full py-1 px-3 rounded text-sm font-semibold transition-all ${isPending ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'
        } ${status === TaskStatus.COMPLETED ? 'bg-gray-200 text-gray-600' : 'bg-blue-600 text-white'
        }`}
    >
      {isPending ? 'Đang cập nhật...' : 'Chuyển trạng thái ➡️'}
    </button>
  )
}
