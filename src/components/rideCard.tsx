import { IRide } from "@/redux/features/ride/ride.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RideCardProps {
  ride: IRide;
}

const statusColorMap: Record<IRide["status"], "default" | "primary" | "secondary" | "destructive" | "success"> = {
  requested: "primary",
  accepted: "secondary",
  picked_up: "secondary",
  in_transit: "secondary",
  completed: "success",
  cancelled: "destructive",
};

const RideCard = ({ ride }: RideCardProps) => {
  return (
    <Card className="mb-4 shadow hover:shadow-lg transition">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-lg font-semibold">{ride.rider.name}</CardTitle>
        <Badge variant={statusColorMap[ride.status]}>
          {ride.status.replace("_", " ").toUpperCase()}
        </Badge>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <p>
          <span className="font-medium">Email:</span> {ride.rider.email}
        </p>
        {ride.driver && (
          <p>
            <span className="font-medium">Driver:</span> {ride.driver.name || "Assigned"}
          </p>
        )}
        <p>
          <span className="font-medium">Pickup:</span> {ride.pickupLocation.lat}, {ride.pickupLocation.lng}
        </p>
        <p>
          <span className="font-medium">Destination:</span> {ride.destinationLocation.lat}, {ride.destinationLocation.lng}
        </p>
        <p>
          <span className="font-medium">Price:</span> ${ride.price}
        </p>
        <p>
          <span className="font-medium">Payment:</span> {ride.paymentStatus} {ride.paymentMethod && `(${ride.paymentMethod})`}
        </p>
        <p>
          <span className="font-medium">Requested At:</span> {new Date(ride.requestedAt).toLocaleString()}
        </p>
      </CardContent>
    </Card>
  );
};

export default RideCard;
