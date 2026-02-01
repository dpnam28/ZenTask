"use client"

import { deleteTaskAction } from "@/app/actions/task.actions"
import { useTransition } from "react"

export const DeleteButton = ({ id }: { id: string }) => {
    const [isPending, startTransition] = useTransition()

    const handleDelete = () => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa công việc này?")) return
        startTransition(async () => {
            await deleteTaskAction(id)
        })
    }
    return (
        <button
            onClick={handleDelete}
            disabled={isPending}
            className="text-red-500 hover:text-red-700 text-sm font-medium disabled:opacity-50 cursor-pointer"
        >
            {isPending ? 'Đang xóa...' : 'Xóa'}
        </button>
    )
}