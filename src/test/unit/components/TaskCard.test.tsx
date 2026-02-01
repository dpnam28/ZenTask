import { describe, it, vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TaskCard } from "@/components/ui/TaskCard";
import { mockTaskFromDb, createTaskMock } from "@/test/mocks/task.mock";
import { TaskStatus } from "@/core/entities/task.entity";

vi.mock("@/components/features/EditButton", () => ({
    EditButton: () => <div data-testid="mock-edit-btn">Test edit button</div>
}))

vi.mock("@/components/features/DeleteButton", () => ({
    DeleteButton: () => <div data-testid="mock-delete-btn">Test delete button</div>
}))

vi.mock("@/components/features/StatusButton", () => ({
    StatusButton: () => <div data-testid="mock-status-btn">Status</div>
}))

describe("TaskCard Component", () => {
    it("Should show title and descripiton", () => {
        render(<TaskCard task={mockTaskFromDb} />)
        const titleElement = screen.getByText(new RegExp(mockTaskFromDb.title, "i"))
        const descElement = screen.getByText(new RegExp(mockTaskFromDb.description!, "i"))
        expect(titleElement).toBeInTheDocument();
        expect(descElement).toBeInTheDocument();
    })
    it("Should show button component", () => {
        render(<TaskCard task={mockTaskFromDb} />)
        expect(screen.getByTestId('mock-edit-btn')).toBeInTheDocument();
        expect(screen.getByTestId('mock-delete-btn')).toBeInTheDocument();
        expect(screen.getByTestId('mock-status-btn')).toBeInTheDocument();
        expect(screen.getByText(`${TaskStatus.TODO}`)).toBeInTheDocument();
    })
})