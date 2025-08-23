import { useEarningsHistoryQuery } from "@/redux/features/ride/ride.api";
import DriverAvailability from "./DriverAvailability ";

const EarningsHistory = () => {
  const { data, isLoading, isError } = useEarningsHistoryQuery(undefined);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Loading earnings...</h1>
        <div className="animate-pulse space-y-2">
          <div className="h-6 w-32 bg-gray-300 rounded"></div>
          <div className="h-6 w-48 bg-gray-300 rounded"></div>
          <div className="h-6 w-full bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return <p className="text-center mt-10 text-red-600">{data.message}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Earnings History</h1>

      <div className="mb-6">

        <DriverAvailability/>
        <p>
          <span className="font-medium">Total Earnings:</span>{" "}
          <span className="text-green-600 font-semibold">${data?.totalEarnings || 0}</span>
        </p>
        <p>
          <span className="font-medium">Total Rides:</span> {data?.count || 0}
        </p>
      </div>

      <div className="space-y-4">
        {data?.rides.map((ride: any) => (
          <div
            key={ride._id}
            className="p-4 border rounded-lg shadow-sm flex justify-between items-center"
          >
            <div>
              <p>
                <span className="font-medium">Rider:</span> {ride.rider?.name} ({ride.rider?.email})
              </p>
              <p>
                <span className="font-medium">Amount:</span> ${ride.price}
              </p>
              <p className="text-xs text-muted-foreground">
                Completed at: {new Date(ride.completedAt).toLocaleString()}
              </p>
            </div>
            <div>
              <span
                className={`px-2 py-1 rounded-full text-sm font-semibold ${
                  ride.paymentMethod === "cash"
                    ? "bg-green-100 text-green-600"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                {ride.paymentMethod.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EarningsHistory;
