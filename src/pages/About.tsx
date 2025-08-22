const About = () => {
  return (
    <section className="w-full py-16 px-6 md:px-12 bg-background text-foreground">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left Image */}
        <div className="w-full h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1604357209793-fca5dca89f97?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="About Ridey"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Content */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            About <span className="text-primary">Ridey</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Ridey is more than just a ride-sharing app — it’s a movement to make
            transportation safe, reliable, and affordable for everyone. We
            connect riders and drivers seamlessly, ensuring a smooth experience
            from pickup to destination.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Our mission is simple: empower communities with better mobility,
            create flexible earning opportunities for drivers, and deliver
            exceptional rides every time. Whether you’re commuting, heading to a
            meeting, or exploring the city, Ridey is here for you.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            With cutting-edge technology and a growing network, we’re building
            the future of urban mobility — one ride at a time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
