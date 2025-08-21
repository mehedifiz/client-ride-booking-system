import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import car1 from "@/assets/images/car1.jpg"

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-primary/10 via-background to-background py-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
        {/* Left side - text content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Ride Smarter with <span className="text-primary">Ridey</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl">
            Your trusted ride-sharing platform. Connect with drivers and riders
            instantly, enjoy affordable rides, and travel safely anytime,
            anywhere.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button asChild size="lg">
              <Link to="/allrides">Book a Ride</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/register">Become a Driver</Link>
            </Button>
          </div>
        </div>

        {/* Right side - illustration / image */}
        <div className="flex-1 flex justify-center">
          <img
            src={car1}
            alt="Ridey car illustration"
            className="max-w-3xl rounded-2xl  w-full drop-shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
