import { readItems } from "@/lib/content/queries";

import { ContactCard } from "./contact-card";

/**
 * Reads its own content rather than taking it as a prop: the footer is in the
 * layout, so every page would otherwise have to fetch and thread it through.
 */
export async function ContactList() {
  const cards = await readItems("footer.contacts");

  return (
    <div className="flex gap-8 flex-wrap justify-between sm:gap-10">
      {cards.map((card) => (
        <ContactCard
          key={card.id}
          card={{ title: card.title, phone: card.phone, email: card.email }}
        />
      ))}
    </div>
  );
}
