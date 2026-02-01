import { TaskForm } from "@/components/features/TaskForm";
import { TaskList } from "@/components/ui/TaskList";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Suspense } from "react";
export const dynamic = 'force-dynamic'
const page = () => {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Header: Tiêu đề ứng dụng */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            ZenTask 🚀
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            Quản lý công việc theo phong cách tối giản và hiệu quả.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-12">
          {/* Khu vực thêm mới: Client Component */}
          <section>
            <TaskForm />
          </section>

          {/* Khu vực danh sách: Server Component với Suspense */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Danh sách nhiệm vụ</h2>
              <div className="h-1 flex-1 bg-gray-200 ml-4 rounded-full"></div>
            </div>

            {/* Suspense giúp hiển thị trạng thái chờ riêng cho danh sách */}
            <Suspense fallback={<LoadingSpinner />}>
              <TaskList />
            </Suspense>
          </section>
        </div>

      </div>
    </main>
  );
};

export default page;
