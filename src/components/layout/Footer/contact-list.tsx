import { contactCards } from "@/config";

import { ContactCard } from "./contact-card";

export function ContactList() {
  return (
    <div className="grid gap-8 sm:grid-cols-3 sm:gap-10">
      {contactCards.map((card) => (
        <ContactCard key={card.title} card={card} />
      ))}
    </div>
  );
}
