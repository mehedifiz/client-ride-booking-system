import React from "react";
import { Button } from "@/components/ui/button";

const BecomeDriver = () => {
  return (
    <section className="w-full py-16 px-6 md:px-12 bg-background text-foreground">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left Text Content */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Drive with <span className="text-primary">Ridey</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Join our network of trusted drivers and earn on your own schedule. 
            With flexible hours, competitive fares, and reliable support, Ridey 
            helps you achieve financial freedom while connecting with riders in your city.
          </p>

          <ul className="space-y-3 text-muted-foreground">
            <li>✅ Flexible hours — work when you want</li>
            <li>✅ Earn more with transparent fares</li>
            <li>✅ Reliable support for every trip</li>
          </ul>

          <Button size="lg" className="mt-4">
            Become a Driver
          </Button>
        </div>

        {/* Right Image */}
        <div className="w-full h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1604357209793-fca5dca89f97?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Ridey Driver"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default BecomeDriver;
