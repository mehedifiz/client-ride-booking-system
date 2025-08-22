import { IRide, useDriverRidesQuery } from "@/redux/features/ride/ride.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import RideCard from "@/components/rideCard";
import { Skeleton } from "@/components/ui/skeleton";

const MyAcceptedRides = () => {
  const { data: userData } = useUserInfoQuery(undefined);
  const { data: rides, isLoading, isError } = useDriverRidesQuery(undefined);

//   console.log(rides?.data, "all rides");

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

  if (isError)
    return <p className="text-center mt-10">Failed to load rides.</p>;

  // Show all rides for the current driver
  const myRides = rides?.data?.filter(
    (ride :IRide) =>
      (typeof ride.driver === "string"
        ? ride.driver
        : ride.driver?._id) === userData?.data?._id
  );

  if (!myRides || myRides.length === 0)
    return <p className="text-center mt-10">No rides found.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Rides</h1>
      <div className="grid gap-4">
        {myRides.map((ride : IRide) => (
          <RideCard key={ride._id} ride={ride} />
        ))}
      </div>
    </div>
  );
};

export default MyAcceptedRides;
