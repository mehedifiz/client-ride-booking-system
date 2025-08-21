import { useGetAllRidesQuery } from "@/redux/features/ride/ride.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import RideCard from "@/components/rideCard";
import RideRequestModal from "@/components/RideRequestModal";

const AllRides = () => {
  const { data: userData } = useUserInfoQuery(undefined);
  const { data: ridesResponse, isLoading, isError } = useGetAllRidesQuery(undefined);
console.log(ridesResponse)
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching rides</div>;

  const rides = ridesResponse?.data || [];
  const role = userData?.data?.role;

  const title =
    role === "driver"
      ? "Requested Rides"
      : role === "rider"
      ? "My Rides"
      : "All Rides";

 return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {role === "rider" && <RideRequestModal />}  
      {rides.length === 0 ? (
        <p>No rides found</p>
      ) : (
        rides.map((ride) => <RideCard key={ride._id} ride={ride} />)
      )}
    </div>
  );
};

export default AllRides;
