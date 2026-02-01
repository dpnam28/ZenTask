export const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="text-gray-500 font-medium">Đang tải danh sách công việc...</p>
    </div>
  );
};