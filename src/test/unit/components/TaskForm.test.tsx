import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { TaskForm } from "@/components/features/TaskForm"

const { useActionStateMock } = vi.hoisted(() => {
    return {
        useActionStateMock: vi.fn()
    }
})

vi.mock("react", async (importOriginal) => {
    const actual = await importOriginal<typeof import("react")>();
    return {
        ...actual,
        useActionState: useActionStateMock
    }
})

describe("TaskForm component", () => {
    beforeEach(() => {
        useActionStateMock.mockClear();
    })
    it("Should render empty form correctly", () => {
        useActionStateMock.mockReturnValue([null, vi.fn(), false])
        render(<TaskForm />);
        const titleInput = screen.getByPlaceholderText(/Học Next.js/i);
        expect(titleInput).toBeInTheDocument();
        expect(titleInput).toHaveValue("");

        const submitBtn = screen.getByRole("button", { name: /Lưu công việc/i });
        expect(submitBtn).toBeInTheDocument();
        expect(submitBtn).not.toBeDisabled();
    })
})

describe("TaskForm Validation login", () => {
    it("Should show error message when title length is 2 (Invalid)", () => {
        useActionStateMock.mockReturnValue([
            { error: { title: ["Title must be at least 3 characters long"] } },
            vi.fn(),
            false
        ])
        render(<TaskForm />);
        const errorMessage = screen.getByText(/Title must be at least 3 characters long/i);
        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage).toHaveClass("text-red-700")
    })
    it("Should create task when title length is 3 to 100 (Valid)", () => {
        useActionStateMock.mockReturnValue([null, vi.fn(), true]);
        render(<TaskForm />);
        const submitBtn = screen.getByRole("button", { name: /Đang xử lý/i })
        expect(submitBtn).toBeDisabled();
    })
    it("Should show error message when title length is 101 (Invalid)", () => {
        useActionStateMock.mockReturnValue([{ error: { title: ["Title must be at most 100 characters long"] } }])
        render(<TaskForm />)
        const errorMessage = screen.getByText(/Title must be at most 100 characters long/i)
        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage).toHaveClass("text-red-700")
    })
})
