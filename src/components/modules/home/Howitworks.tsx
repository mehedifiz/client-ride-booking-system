import {
  Smartphone,
  Car,
  CheckCircle2,
  CreditCard,
} from "lucide-react";

const steps = [
  {
    title: "1. Request a Ride",
    desc: "Open Ridey and request a ride instantly from your location.",
    icon: Smartphone,
  },
  {
    title: "2. Driver Accepts",
    desc: "Nearby drivers receive your request and the best match accepts.",
    icon: CheckCircle2,
  },
  {
    title: "3. Pickup & Travel",
    desc: "Your driver arrives, picks you up, and takes you to your destination.",
    icon: Car,
  },
  {
    title: "4. Trip Completed",
    desc: "Arrive safely and pay securely — choose online or cash.",
    icon: CreditCard,
  },
];

const Howitworks = () => {
  return (
    <section className="py-20 bg-muted/30 dark:bg-muted/20 transition-colors">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          How <span className="text-primary">Ridey</span> Works
        </h2>

        <div className="grid gap-8 md:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center bg-background dark:bg-card p-6 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Payment info */}
        <p className="mt-12 text-muted-foreground text-sm">
          💳 Payment options: Online payment or hand cash.
        </p>
      </div>
    </section>
  );
};

export default Howitworks;
