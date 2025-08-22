import { IRide, useUpdateRideStatusMutation } from "@/redux/features/ride/ride.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

interface RideCardProps {
  ride: IRide;
  onCancel?: (id: string) => void;
}

const statusColors: Record<IRide["status"], string> = {
  requested: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  accepted: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  picked_up: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  in_transit: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  completed: "bg-green-500/10 text-green-600 dark:text-green-400",
  cancelled: "bg-red-500/10 text-red-600 dark:text-red-400",
};

const RideCard = ({ ride, onCancel }: RideCardProps) => {
  const { data } = useUserInfoQuery(undefined);
  const role = data?.data?.role;

  const [updateRideStatus, { isLoading: isUpdating }] = useUpdateRideStatusMutation();

  const handleAccept = async () => {
    try {
      await updateRideStatus({ rideId: ride._id, status: "accepted" }).unwrap();
    } catch (err) {
      console.error("Error accepting ride", err);
    }
  };

  return (
    <Card className="w-full shadow-md hover:shadow-lg my-2 transition">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-base font-medium">Ride Details</CardTitle>
        <Badge
          className={`${statusColors[ride.status]} px-3 py-1 rounded-full text-xs font-semibold`}
        >
          {ride.status.replace("_", " ").toUpperCase()}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-2 text-sm">
        <p>
          <span className="font-medium">From:</span> {ride.pickupLocation.lat}, {ride.pickupLocation.lng}
        </p>
        <p>
          <span className="font-medium">To:</span> {ride.destinationLocation.lat}, {ride.destinationLocation.lng}
        </p>
        <p>
          <span className="font-medium">Price:</span> ${ride.price}
        </p>
        <p>
          <span className="font-medium">Payment:</span>{" "}
          <span
            className={
              ride.paymentStatus === "paid"
                ? "text-green-600 dark:text-green-400 font-semibold"
                : "text-red-600 dark:text-red-400 font-semibold"
            }
          >
            {ride.paymentStatus.toUpperCase()}
          </span>
        </p>
        <p className="text-xs text-muted-foreground">
          Requested at: {new Date(ride.requestedAt).toLocaleString()}
        </p>

  
        {ride.status === "requested" && role === "rider" && onCancel && (
          <Button
            variant="destructive"
            className="w-full mt-3"
            onClick={() => onCancel(ride._id)}
          >
            Cancel Ride
          </Button>
        )}
 
        {ride.status === "requested" && role === "driver" && (
          <Button
            variant="default"
            className="w-full mt-3"
            onClick={handleAccept}
            disabled={isUpdating}
          >
            {isUpdating ? "Accepting..." : "Accept Ride"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default RideCard;
