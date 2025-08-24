import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRequestRideMutation } from "@/redux/features/ride/ride.api";

interface RideForm {
  pickupLat: number;
  pickupLng: number;
  destinationLat: number;
  destinationLng: number;
  price: number;
}

const RideRequestModal: FC = () => {
  const [requestRide, { isLoading }] = useRequestRideMutation(undefined);
  const { register, handleSubmit, reset } = useForm<RideForm>();
  const [isOpen, setIsOpen] = useState(false); // control modal open state

  const onSubmit = async (data: RideForm) => {
    try {
      await requestRide({
        pickupLocation: {
          lat: Number(data.pickupLat),
          lng: Number(data.pickupLng),
        },
        destinationLocation: {
          lat: Number(data.destinationLat),
          lng: Number(data.destinationLng),
        },
        price: Number(data.price),
      }).unwrap();

      toast.success("Ride requested successfully!");
      reset();
      setIsOpen(false); // close modal on success
    } catch (error) {
      console.error(error);
      toast.error("Failed to request ride.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="mb-5">Request Ride</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Request a Ride</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 mt-2">
          <Input type="number" placeholder="Pickup Latitude" {...register("pickupLat", { required: true })} />
          <Input type="number" placeholder="Pickup Longitude" {...register("pickupLng", { required: true })} />
          <Input type="number" placeholder="Destination Latitude" {...register("destinationLat", { required: true })} />
          <Input type="number" placeholder="Destination Longitude" {...register("destinationLng", { required: true })} />
          <Input type="number" placeholder="Price" {...register("price", { required: true })} />

          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Requesting..." : "Request Ride"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RideRequestModal;
