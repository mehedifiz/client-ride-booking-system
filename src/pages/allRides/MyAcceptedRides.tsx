import {  useDriverRidesQuery, useUpdateRideStatusMutation } from "@/redux/features/ride/ride.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import RideCard from "@/components/rideCard";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner"; 
import { IRide } from "@/types";
const MyAcceptedRides = () => {
  const { data: userData } = useUserInfoQuery(undefined);
  const { data: rides, isLoading, isError, refetch } = useDriverRidesQuery(undefined);
  const [updateRideStatus, { isLoading: isUpdating }] = useUpdateRideStatusMutation();

  const myRides = rides?.data?.filter(
    (ride: IRide) =>
      (typeof ride.driver === "string" ? ride.driver : ride.driver?._id) === userData?.data?._id
  );

  const handleStatusChange = async (rideId: string, newStatus: IRide["status"]) => {
    try {
      await updateRideStatus({ rideId, status: newStatus }).unwrap();
      toast.success(`Ride status updated to ${newStatus}`);
      refetch(); // refresh the rides after update
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update status");
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Loading rides...</h1>
        <div className="grid gap-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <Skeleton key={idx} className="h-40 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) return <p className="text-center mt-10">Failed to load rides.</p>;
  if (!myRides || myRides.length === 0) return <p className="text-center mt-10">No rides found.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Rides</h1>
      <div className="grid gap-4">
        {myRides.map((ride: IRide) => (
          <RideCard key={ride._id} ride={ride}>
            {/* Status update buttons example */}
            <div className="flex gap-2 mt-2">
              {ride.status === "accepted" && (
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleStatusChange(ride._id, "picked_up")}
                  disabled={isUpdating}
                >
                  Mark Picked Up
                </button>
              )}
              {ride.status === "picked_up" && (
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => handleStatusChange(ride._id, "in_transit")}
                  disabled={isUpdating}
                >
                  Mark In Transit
                </button>
              )}
              {ride.status === "in_transit" && (
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => handleStatusChange(ride._id, "completed")}
                  disabled={isUpdating}
                >
                  Complete Ride
                </button>
              )}
            </div>
          </RideCard>
        ))}
      </div>
    </div>
  );
};

export default MyAcceptedRides;
