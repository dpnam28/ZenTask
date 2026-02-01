'use client';

import { useState } from 'react';
import { ITask } from '@/core/entities/task.entity';
import { EditTaskModal } from '../ui/EditTaskModal';

interface EditButtonProps {
    task: ITask;
}

export const EditButton = ({ task }: EditButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="text-white hover:bg-green-400 text-sm font-medium w-full bg-green-500 rounded px-2 py-1 mt-2"
            >
                Sửa
            </button>

            {isOpen && (
                <EditTaskModal
                    task={task}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </>
    );
};