import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Password from "@/components/ui/Password";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";

// Schema with role
const registerSchema = z
  .object({
    name: z.string().min(3, "Name is too short").max(50),
    email: z.string().email(),
    password: z.string().min(8, "Password is too short"),
    confirmPassword: z.string().min(8, "Confirm Password is too short"),
    role: z.enum(["driver", "rider"], { required_error: "Please select a role" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function RegisterForm({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "driver",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      await register({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      }).unwrap();

      toast.success("User registered successfully!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-6 p-6 rounded-lg shadow-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100",
        className
      )}
      {...props}
    >
      <div className="text-center">
        <h1 className="text-3xl font-bold text-primary">Ridey</h1>
        <p className="text-muted-foreground dark:text-gray-400 mt-2">
          Sign up to start your ride-sharing journey
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    {...field}
                    className="bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="john.doe@example.com"
                    type="email"
                    {...field}
                    className="bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Password {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Password {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Dark/light mode native select */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Register as</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="w-full border rounded-md px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="driver">Driver</option>
                    <option value="rider">Rider</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full mt-2">
            Sign Up
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm mt-2">
        Already have an account?{" "}
        <Link to="/login" className="text-primary underline">
          Login
        </Link>
      </div>
    </div>
  );
}
