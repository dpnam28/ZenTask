"use client"

import { createTaskAction } from "@/app/actions/task.actions"
import { useActionState } from "react"

export const TaskForm = () => {
    const [state, formAction, isPending] = useActionState(createTaskAction,null)
    return (
        <form action={formAction} className="bg-white p-6 rounded-xl shadow-sm border mb-8 space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Thêm công việc mới ➕</h2>
            <div>
                <label className="block text-sm font-medium text-gray-700">Tiêu đề</label>
                <input
                    name="title"
                    required
                    minLength={3}
                    className={`w-full mt-1 p-2 border rounded-md outline-none focus:ring-2 ${
                        state?.error?.title ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                    placeholder="Ví dụ: Học Next.js SOLID"
                />
                {state?.error?.title && (
                    <p className="mt-1 text-xs text-red-500 italic">{state.error.title[0]}</p>
                )}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Mô tả (tùy chọn)</label>
                <textarea
                    name="description"
                    rows={3}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-200"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Hạn chót</label>
                <input
                    name="deadline"
                    type="date"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-200"
                />
            </div>
            <button
                type="submit"
                disabled={isPending}
                className={`w-full py-2 px-4 rounded-md text-white font-semibold transition-colors ${
                    isPending ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-sm'
                }`}
            >
                {isPending ? 'Đang xử lý...' : 'Lưu công việc'}
            </button>
            {state?.error?.server && (
                <p className="p-2 bg-red-50 text-red-700 text-sm rounded-md">{state.error.server[0]}</p>
            )}
            {state?.error?.description && (
                <p className="p-2 bg-red-50 text-red-700 text-sm rounded-md">{state.error.description[0]}</p>
            )}
            {state?.error?.title && (
                <p className="p-2 bg-red-50 text-red-700 text-sm rounded-md">{state.error.title[0]}</p>
            )}
            {state?.error?.deadline && (
                <p className="p-2 bg-red-50 text-red-700 text-sm rounded-md">{state.error.deadline[0]}</p>
            )}
        </form>
    );
}