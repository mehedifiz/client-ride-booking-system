import { Skeleton } from "@/components/ui/skeleton";
import { useGetStatsQuery } from "@/redux/features/stats/stat.api";

export default function Analytics() {
  const { data, isLoading, isError } = useGetStatsQuery();

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="grid gap-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <Skeleton key={idx} className="h-40 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }
  if (isError) return <p className="text-center mt-10 text-red-600">Failed to load stats</p>;

  const stats = data?.data;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">📊 Analytics Dashboard</h1>

      {/* User Counts */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">User Counts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {stats?.userCounts?.map((u: any) => (
            <div key={u._id} className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg flex flex-col items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400 uppercase text-sm">{u._id}</span>
              <span className="text-2xl font-bold mt-2">{u.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Ride Counts */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Ride Counts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats?.rideCounts?.map((r: any) => (
            <div key={r._id} className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg flex flex-col items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400 uppercase text-sm">{r._id.replace("_", " ")}</span>
              <span className="text-2xl font-bold mt-2">{r.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
