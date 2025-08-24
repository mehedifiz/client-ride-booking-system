import { useState } from "react";
import { useGetRidesAdminQuery } from "@/redux/features/ride/ride.api";
import { IRide } from "@/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router";

const AdminAllRides = () => {
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  const { data: rides, isLoading, isError } = useGetRidesAdminQuery({
    status: statusFilter || undefined,
    from: fromDate || undefined,
    to: toDate || undefined,
  });

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
  if (isError) return <p className="text-red-600">Failed to load rides</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-4">Admin Rides</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <select
          className="border rounded px-2 py-1"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="requested">Requested</option>
          <option value="accepted">Accepted</option>
          <option value="picked_up">Picked Up</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

         
        <Input type="date" placeholder="From" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        <Input type="date" placeholder="To" value={toDate} onChange={(e) => setToDate(e.target.value)} />
      </div>

    

<div className="space-y-4">
  {rides?.data?.map((ride: IRide) => (
    <Card key={ride._id} className="shadow-md hover:shadow-lg">
      <CardHeader className="flex justify-between items-center">
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
          {ride.status.toUpperCase()}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-1 text-sm">
        <p><strong>Rider:</strong> {ride.rider?.name} ({ride.rider?.email})</p>
        <p><strong>Driver:</strong> {ride.driver?.name || "-"} ({ride.driver?.email || "-"})</p>
        <p><strong>Pickup:</strong> {ride.pickupLocation.lat}, {ride.pickupLocation.lng}</p>
        <p><strong>Destination:</strong> {ride.destinationLocation.lat}, {ride.destinationLocation.lng}</p>
        <p><strong>Price:</strong> ${ride.price}</p>

        <Link to={`/rides/${ride._id}`}>
          <button className="btn btn-sm btn-outline mt-2">View Details</button>
        </Link>
      </CardContent>
    </Card>
  ))}
</div>

    </div>
  );
};

export default AdminAllRides;
