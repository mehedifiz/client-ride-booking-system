import {
  useUpdateProfileMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const MyProfile = () => {
  const { data, isLoading, isError, refetch } = useUserInfoQuery(undefined);
  const user = data?.data;

  const [open, setOpen] = useState(false);

  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      availability: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        availability: user.availability || "Offline",
      });
    }
  }, [user, reset]);

  const onSubmit = async (values: any) => {
    try {
      const res: any = await updateProfile(values);

      if (res?.data?.success) {
        toast.success("Profile updated successfully!");
        refetch();
        setOpen(false); 
      } else {
        toast.error(res?.error?.data?.message || "Failed to update profile");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };
 if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="">
          {Array.from({ length: 3 }).map((_, idx) => (
            <Skeleton key={idx} className="max-w-md mx-auto mt-10 p-6 border rounded-2xl shadow-lg space-y-4" />
          ))}
        </div>
      </div>
    );
  }
  if (isError) return <p>Failed to load profile</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-2xl shadow-lg space-y-4">
      <h2 className="text-2xl font-semibold text-center">My Profile</h2>

      <div className="space-y-2">
        <p>
          <span className="font-medium">Name:</span> {user?.name}
        </p>
        <p>
          <span className="font-medium">Email:</span> {user?.email}
        </p>
        <p>
          <span className="font-medium">Role:</span> {user?.role}
        </p>
        <p>
          <span className="font-medium">Availability:</span>{" "}
          {user?.availability}
        </p>
        <p>
          <span className="font-medium">Status:</span>{" "}
          <span className={user?.isBlocked ? "text-red-500" : "text-green-600"}>
            {user?.isBlocked ? "Blocked" : "Active"}
          </span>
        </p>
        <p>
          <span className="font-medium">Created At:</span>{" "}
          {new Date(user?.createdAt).toLocaleDateString("en-US")}
        </p>
      </div>

      {/* Update Profile Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="w-full mt-4">Update Profile</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input {...register("name")} placeholder="Name" />

            <select
              {...register("availability")}
              className="w-full border rounded p-2 bg-secondary"
            >
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>

            <Button type="submit" className="w-full" disabled={isUpdating}>
              {isUpdating ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyProfile;
