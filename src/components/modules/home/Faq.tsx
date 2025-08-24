import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface Faq1Props {
  heading?: string;
  items?: FaqItem[];
}

const Faq = ({
  heading = "Frequently Asked Questions",
  items = [
    {
      id: "faq-1",
      question: "How can I track my ride?",
      answer:
        "You can track your ride in real-time through the RideDetails page, which shows the driver's location and the ride status timeline.",
    },
    {
      id: "faq-2",
      question: "Can I cancel a ride?",
      answer:
        "Yes, rides with the status 'requested' can be cancelled by the rider. Once cancelled, the status will be updated and the driver notified.",
    },
    {
      id: "faq-3",
      question: "What does each ride status mean?",
      answer:
        "Requested: The ride has been requested but not yet accepted by a driver.\nAccepted: A driver has accepted the ride.\nPicked Up: The driver has picked up the rider.\nIn Transit: The ride is ongoing.\nCompleted: The ride has finished successfully.\nCancelled: The ride was cancelled by the rider or driver.",
    },
    {
      id: "faq-4",
      question: "How is payment handled?",
      answer:
        "Payment can be either collected in cash or through the app (if supported). The payment status is shown on the RideDetails page.",
    },
    {
      id: "faq-5",
      question: "Who do I contact for support?",
      answer:
        "For any issues related to your ride, contact our support team through the app or via the support email provided in your account.",
    },
  ],
}: Faq1Props) => {
  return (
    <section className="py-32 flex items-center justify-center">
      <div className="container max-w-3xl">
        <h1 className="mb-4 text-3xl font-semibold md:mb-11 md:text-4xl">
          {heading}
        </h1>
        <Accordion type="single" collapsible>
          {items.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="font-semibold hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export { Faq };
