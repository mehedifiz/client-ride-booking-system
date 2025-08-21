import { Car, ShieldCheck, Smartphone, Wallet } from "lucide-react";

const benefits = [
  {
    title: "Fast & Reliable",
    desc: "Book rides instantly and reach your destination on time with trusted drivers.",
    icon: Car,
  },
  {
    title: "Safe & Secure",
    desc: "All drivers are verified to ensure your safety throughout the journey.",
    icon: ShieldCheck,
  },
  {
    title: "Easy to Use",
    desc: "Ridey is simple and intuitive — request rides with just a few taps.",
    icon: Smartphone,
  },
  {
    title: "Affordable Payments",
    desc: "Choose between online payment or cash for a hassle-free experience.",
    icon: Wallet,
  },
];

const Benefits = () => {
  return (
    <section className="py-20 bg-background dark:bg-muted/20 transition-colors">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Why Choose <span className="text-primary">Ridey</span>?
        </h2>

        <div className="grid gap-8 md:grid-cols-4">
          {benefits.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center bg-card p-6 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
