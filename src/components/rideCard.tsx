import {
  IRide,
  useUpdateRideStatusMutation,
} from "@/redux/features/ride/ride.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { allowedTransitions } from "@/types";

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

  const [updateRideStatus, { isLoading }] = useUpdateRideStatusMutation();

  const [open, setOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<IRide["status"]>(
    "" as IRide["status"]
  );
  const [payment, setPayment] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      const firstStatus = allowedTransitions[ride.status][0];
      setNewStatus(firstStatus);
      setPayment(false);
    }
  };

  const handleUpdate = async () => {
    if (!newStatus) return;
    try {
      await updateRideStatus({
        rideId: ride._id,
        status: newStatus,
        payment,
      }).unwrap();

      setOpen(false);

      setNewStatus("");
      setPayment(false);
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  return (
    <Card className="w-full shadow-md hover:shadow-lg my-2 transition">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-base font-medium">Ride Details</CardTitle>
        <Badge
          className={`${
            statusColors[ride.status]
          } px-3 py-1 rounded-full text-xs font-semibold`}
        >
          {ride.status.replace("_", " ").toUpperCase()}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-2 text-sm">
        <p>
          <span className="font-medium">From:</span> {ride.pickupLocation.lat},{" "}
          {ride.pickupLocation.lng}
        </p>
        <p>
          <span className="font-medium">To:</span>{" "}
          {ride.destinationLocation.lat}, {ride.destinationLocation.lng}
        </p>
        <p>
          <span className="font-medium">Price:</span> ${ride.price}
        </p>
        <p>
          <span className="font-medium">Payment:</span>{" "}
          <span
            className={
              ride.paymentStatus === "paid"
                ? "text-green-600 font-semibold"
                : "text-red-600 font-semibold"
            }
          >
            {ride.paymentStatus.toUpperCase()}
          </span>
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

        {role === "driver" && allowedTransitions[ride.status].length > 0 && (
          <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <Button variant="default" className="w-full mt-3">
                Update Status
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Ride Status</DialogTitle>
              </DialogHeader>

              <div className="flex flex-col gap-4 mt-2">
                <Select
                  value={newStatus}
                  onValueChange={(val) => setNewStatus(val as IRide["status"])}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select new status" />
                  </SelectTrigger>
                  <SelectContent>
                    {allowedTransitions[ride.status].map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.replace("_", " ").toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={payment}
                    onCheckedChange={(val) => setPayment(!!val)}
                  />
                  <span>Payment received (cash)</span>
                </div>
              </div>

              <DialogFooter>
                <Button onClick={handleUpdate} disabled={isLoading}>
                  {isLoading ? "Updating..." : "Update"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
};

export default RideCard;
