import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-lg rounded-lg overflow-hidden">
        
        {/* Image side */}
        <div className="hidden md:block">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ_hLPDuCmgV1isR28W9rSn-97abbQOgpgFMG6mONW2FuvhbWKbtKdMGIakANbkkLWf0Y&usqp=CAU"
            alt="Contact Us"
            className="w-full h-full rounded-3xl object-cover"
          />
        </div>

        {/* Form side */}
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
          <p className="mb-6 text-gray-600">
            Have any questions or feedback? Fill out the form below and we’ll get back to you shortly.
          </p>

          <form className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <Input type="text" placeholder="Your name" />
            </div>

            <div>
              <label className="block mb-1 font-medium">Email</label>
              <Input type="email" placeholder="Your email" />
            </div>

            <div>
              <label className="block mb-1 font-medium">Message</label>
              <Textarea placeholder="Your message" rows={4} />
            </div>

            <Button type="submit" className="w-full mt-2">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
