import BecomeDriver from "@/components/modules/home/BecomeDrive";
import Benefits from "@/components/modules/home/Benefits";
import Hero from "@/components/modules/home/Hero";
import Howitworks from "@/components/modules/home/Howitworks";
import Testimonials from "@/components/modules/home/Testimonials";

const Home = () => {
    return (
        <div>
            <Hero/>

            <Howitworks/>

            <Benefits/>

            <Testimonials/>

            <BecomeDriver/>
        </div>
    );
};

export default Home;