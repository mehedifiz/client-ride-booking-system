import { useGetRideDetailsQuery } from "@/redux/features/ride/ride.api";
import { useParams } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const RideDetails = () => {
  const { rideId } = useParams<{ rideId: string }>();
  const { data, isLoading, isError } = useGetRideDetailsQuery(rideId!);

  if (isLoading) return <p className="text-center">Loading ride details...</p>;
  if (isError || !data?.data) return <p className="text-center text-red-500">Failed to fetch ride details.</p>;

  const ride = data.data;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Ride Overview */}
      <Card className="shadow-md">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Ride ID: {ride._id}</CardTitle>
          <Badge
            className={`${
              ride.status === "completed"
                ? "bg-green-500/10 text-green-600"
                : ride.status === "cancelled"
                ? "bg-red-500/10 text-red-600"
                : "bg-blue-500/10 text-blue-600"
            } px-3 py-1 rounded-full text-xs font-semibold`}
          >
            {ride.status?.toUpperCase() || "UNKNOWN"}
          </Badge>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <p>
            <strong>Pickup:</strong>{" "}
            {ride.pickupLocation
              ? `${ride.pickupLocation.lat}, ${ride.pickupLocation.lng}`
              : "Not available"}
          </p>
          <p>
            <strong>Destination:</strong>{" "}
            {ride.destinationLocation
              ? `${ride.destinationLocation.lat}, ${ride.destinationLocation.lng}`
              : "Not available"}
          </p>
          <p><strong>Price:</strong> ${ride.price ?? "N/A"}</p>
          <p>
            <strong>Requested At:</strong>{" "}
            {ride.requestedAt
              ? new Date(ride.requestedAt).toLocaleString()
              : "N/A"}
          </p>
        </CardContent>
      </Card>

      {/* Driver Info */}
      <Card>
        <CardHeader>
          <CardTitle>Driver Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-sm">
          <p><strong>Name:</strong> {ride.driver?.name || "N/A"}</p>
          <p><strong>Email:</strong> {ride.driver?.email || "N/A"}</p>
          <p><strong>Phone:</strong> {ride.driver?.phone || "N/A"}</p>
        </CardContent>
      </Card>

      {/* Rider Info */}
      <Card>
        <CardHeader>
          <CardTitle>Rider Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-sm">
          <p><strong>Name:</strong> {ride.rider?.name || "N/A"}</p>
          <p><strong>Email:</strong> {ride.rider?.email || "N/A"}</p>
          <p><strong>Phone:</strong> {ride.rider?.phone || "N/A"}</p>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Ride Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          {ride.timeline?.length > 0 ? (
            <div className="relative border-l-2 border-gray-300 pl-4 space-y-4">
              {ride.timeline.map((t: any, idx: number) => (
                <div key={idx} className="ml-2">
                  <div className="absolute -left-2 w-3 h-3 bg-blue-500 rounded-full"></div>
                  <p className="text-sm font-medium">{t.status}</p>
                  <p className="text-xs text-gray-500">
                    {t.time ? new Date(t.time).toLocaleString() : "N/A"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No timeline events available.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RideDetails;
