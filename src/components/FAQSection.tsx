import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqData } from "@/lib/constants";

export default function FaqSection() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full font-bold md:text-xl"
    >
      {faqData.map((data) => (
        <AccordionItem
          className="border-accentRed border rounded-xl p-1 px-3 my-3 md:px-8"
          value={`item-${data.id}`}
        >
          <AccordionTrigger>{data.question}</AccordionTrigger>
          <AccordionContent>{data.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
