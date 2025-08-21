import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ayesha Rahman",
    role: "Student",
    review:
      "Ridey is so easy to use! I can book a ride in seconds and always feel safe with verified drivers.",
    rating: 5,
  },
  {
    name: "Jamal Hossain",
    role: "Business Professional",
    review:
      "The app is super reliable. I love that I can pay with cash or online. It’s perfect for my daily office rides.",
    rating: 4,
  },
  {
    name: "Sara Ahmed",
    role: "Freelancer",
    review:
      "Affordable and convenient! Ridey has made my city commutes stress-free.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-muted/10 dark:bg-muted/30 transition-colors">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          What Our <span className="text-primary">Users Say</span>
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-card rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition"
            >
              {/* Stars */}
              <div className="flex mb-4">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star
                    key={idx}
                    className="w-5 h-5 text-yellow-500 fill-yellow-500"
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-base text-foreground mb-4 leading-relaxed">
                “{t.review}”
              </p>

              {/* User Info */}
              <h3 className="font-semibold text-lg text-foreground">{t.name}</h3>
              <p className="text-sm text-muted-foreground">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
