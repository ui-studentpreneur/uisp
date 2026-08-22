import { contactCards } from "@/config";

import { ContactCard } from "./contact-card";

export function ContactList() {
  return (
    <div className="flex gap-8 flex-wrap justify-between sm:gap-10">
      {contactCards.map((card) => (
        <ContactCard key={card.title} card={card} />
      ))}
    </div>
  );
}
