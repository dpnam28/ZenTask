'use client';

import { ITask } from '@/core/entities/task.entity';
import { useActionState, useEffect } from 'react';
import { updateTaskAction } from '@/app/actions/task.actions';

interface EditTaskModalProps {
    task: ITask;
    onClose: () => void;
}

export const EditTaskModal = ({ task, onClose }: EditTaskModalProps) => {
    const updateTaskWithId = updateTaskAction.bind(null, task.id);
    const [state, formAction, isPending] = useActionState(updateTaskWithId, null);

    useEffect(() => {
        if (state?.success) {
            onClose();
        }
    }, [state?.success, onClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Chỉnh sửa công việc</h2>

                <form action={formAction} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tiêu đề</label>
                        <input
                            name="title"
                            defaultValue={task.title}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-200"
                            required
                        />
                        {state?.error?.title && (
                            <p className="mt-1 text-xs text-red-500">{state.error.title[0]}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                        <textarea
                            name="description"
                            defaultValue={task.description || ''}
                            rows={3}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Hạn chót</label>
                        <input
                            name="deadline"
                            type="date"
                            defaultValue={task.deadline ? new Date(task.deadline).toISOString().split('T')[0] : ''}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>
                    {state?.error?.deadline && (
                        <p className="mt-1 text-xs text-red-500">{state.error.deadline[0]}</p>
                    )}
                    {state?.error?.description && (
                        <p className="mt-1 text-xs text-red-500">{state.error.description[0]}</p>
                    )}
                    {state?.error?.title && (
                        <p className="mt-1 text-xs text-red-500">{state.error.title[0]}</p>
                    )}
                    <div className="flex justify-end gap-2 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer rounded-md"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="px-4 py-2 bg-blue-600 cursor-pointer text-white rounded-md disabled:bg-gray-400"
                        >
                            {isPending ? 'Đang lưu...' : 'Cập nhật'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};