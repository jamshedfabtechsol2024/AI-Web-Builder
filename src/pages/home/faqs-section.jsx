import { memo } from "react";
import CentralHeading from "@/components/landing/central-heading";
import CentralLine from "@/components/landing/central-line";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/data/faq-data";

// Configurable constants
const SECTION_ID = "faqs";
const SECTION_TITLE = "Frequently Asked Questions";
const ACCORDION_TYPE = "single";
const ACCORDION_COLLAPSIBLE = true;
const SHOW_RIGHT_DOT = true;

// Faqs Line Work
const lastIndex = FAQS.length - 1;

const FAQItem = memo(function FaqItemComponent({ item, isLast }) {
  return (
    <div className="flex flex-col">
      <AccordionItem value={item.id}>
        <AccordionTrigger className="cursor-pointer font-semibold text-lg sm:text-xl">
          {item.question}
        </AccordionTrigger>
        <AccordionContent className="flex w-full flex-col gap-4 text-base sm:text-lg">
          {item.answers.map((answer) => (
            <p key={answer}>{answer}</p>
          ))}
        </AccordionContent>
      </AccordionItem>

      {/* Divider only between items */}
      {!isLast && <CentralLine showRightDot={SHOW_RIGHT_DOT} />}
    </div>
  );
});

const FAQsSection = memo(function FaqsSectionComponent() {
  return (
    <section className="h-full w-full bg-[var(--background)]" id={SECTION_ID}>
      <CentralHeading title={SECTION_TITLE} />
      <div className="container mx-auto flex w-full flex-col items-center justify-center px-8 py-10 sm:px-8 lg:px-12">
        <div className="w-full max-w-sm lg:max-w-lg 2xl:max-w-4xl">
          <Accordion
            className="w-full"
            collapsible={ACCORDION_COLLAPSIBLE}
            type={ACCORDION_TYPE}
          >
            {FAQS.map((faqItem, index) => (
              <FAQItem
                isLast={index === lastIndex}
                item={faqItem}
                key={faqItem.id}
              />
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
});

export default FAQsSection;
