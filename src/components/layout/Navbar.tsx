import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ModeToggle } from "./ModeToggler";
import { Link } from "react-router";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { role } from "@/constants/role";

// Navigation links array
const navigationLinks = [
 
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },

  // All Rides
  { href: "/admin/all-rides", label: "All Rides", role: role.admin },
  { href: "/driver/all-rides", label: "All Rides", role: role.driver },
  { href: "/rider/all-rides", label: "All Rides", role: role.rider },

  // Other dashboard-specific routes
  { href: "/all-rides", label: "Book Ride", role: role.rider },
  { href: "/admin", label: "Dashboard", role: role.admin },
  { href: "/driver", label: "Driver Dashboard", role: role.driver },
  { href: "/rider", label: "Rider Dashboard", role: role.rider },
 

];

export default function Navbar() {
  const { data, isLoading } = useUserInfoQuery(undefined);  
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await logout(undefined);  
      dispatch(authApi.util.resetApiState());  
    } catch (err) {
      console.error(err);
    }
  };

  const userRole = data?.data?.role;

  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur-md">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-40 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-2">
                  {navigationLinks.map((link, index) => {
                    if (link.role === "PUBLIC" || link.role === userRole) {
                      return (
                        <NavigationMenuItem key={index} className="w-full">
                          <NavigationMenuLink asChild className="py-1.5">
                            <Link to={link.href}>{link.label}</Link>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      );
                    }
                    return null;
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-2xl font-bold text-primary hover:text-primary/90"
            >
              Ridey
            </Link>

            {/* Desktop navigation */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-4">
                {navigationLinks.map((link, index) => {
                  if (link.role === "PUBLIC" || link.role === userRole) {
                    return (
                      <NavigationMenuItem key={index}>
                        <NavigationMenuLink
                          asChild
                          className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                        >
                          <Link to={link.href}>{link.label}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    );
                  }
                  return null;
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          {!isLoading && (userRole ? (
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-sm"
            >
              Logout
            </Button>
          ) : (
            <Button asChild className="text-sm">
              <Link to="/login">Login</Link>
            </Button>
          ))}
        </div>
      </div>
    </header>
  );
}
