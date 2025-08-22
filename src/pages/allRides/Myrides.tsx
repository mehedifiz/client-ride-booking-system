import RideCard from "@/components/rideCard";
import { useCancelRideMutation, useGetMyRidesQuery } from "@/redux/features/ride/ride.api";
import { toast } from "sonner";

const Myrides = () => {
  const { data, isLoading } = useGetMyRidesQuery(undefined);
  const [cancelRide] = useCancelRideMutation();

  const handleCancel = async (id: string) => {
    try {
        console.log("Cancelling ride with ID:", id);
      await cancelRide(id).unwrap();
      toast.success("Ride cancelled successfully");
    } catch (error) {
      toast.error("Failed to cancel ride");
    }
  };

  if (isLoading) return <p>Loading rides...</p>;

  return (
    <div className="container mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">My Rides</h1>
      {data?.data?.length ? (
        data.data.map((ride: any) => (
          <RideCard key={ride._id} ride={ride} onCancel={handleCancel} />
        ))
      ) : (
        <p>No rides found.</p>
      )}
    </div>
  );
};

export default Myrides;
