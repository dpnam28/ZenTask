import { render, screen, fireEvent } from "@testing-library/react"
import { it, describe, expect, vi } from "vitest"
import { EditButton } from "@/components/features/EditButton"
import { mockTaskFromDb } from "@/test/mocks/task.mock"

vi.mock("@/app/actions/task.actions", () => ({
    updateTaskAction: vi.fn()
}))

describe("Integration: EditButton and EditTaskModal", () => {
    it("Don't show modal when initial page", () => {
        render(<EditButton task={mockTaskFromDb} />)
        const modelHeading = screen.queryByText(/Chỉnh sửa công việc/i)
        expect(modelHeading).not.toBeInTheDocument()
    })
    it("Show model when click on EditButton", () => {
        render(<EditButton task={mockTaskFromDb} />)
        const editBtn = screen.getByRole("button", { name: /Sửa/i })
        fireEvent.click(editBtn)
        const inputTitle = screen.getByDisplayValue(mockTaskFromDb.title)
        expect(inputTitle).toBeInTheDocument()
    })
    it("Must close modal when click 'Hủy'", () => {
        render(<EditButton task={mockTaskFromDb} />)
        const editBtn = screen.getByRole("button", { name: /Sửa/i })
        fireEvent.click(editBtn)
        const cancelBtn = screen.getByRole("button", { name: /Hủy/i })
        fireEvent.click(cancelBtn)
        const modelHeading = screen.queryByText(/Chỉnh sửa công việc/i)
        expect(modelHeading).not.toBeInTheDocument()
    })
})