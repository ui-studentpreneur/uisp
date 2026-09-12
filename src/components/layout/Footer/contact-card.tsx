/** One contact, as stored under the `footer.contacts` collection. */
export type ContactCardData = {
  title: string;
  phone: string;
  email: string;
};

/**
 * wa.me wants digits only, in international form — no `+`, no separators, and
 * no leading `0`, which is the local-dial prefix Indonesian numbers are often
 * written with.
 */
function whatsappHref(phone: string): string {
  const digits = phone.replace(/\D/g, "").replace(/^0/, "62");
  return `https://wa.me/${digits}`;
}

export function ContactCard({ card }: { card: ContactCardData }) {
  return (
    <div>
      {/* Gradient text must own its background, so no bg utility here. */}
      <h3 className="text-gradient-gold w-fit text-base font-semibold tracking-tight">
        {card.title}
      </h3>

      <div className="mt-3 space-y-1 text-sm text-gold-100/80">
        <a
          href={whatsappHref(card.phone)}
          target="_blank"
          rel="noopener noreferrer"
          className="block transition-colors hover:text-gold-300"
        >
          {card.phone}
        </a>
        <a
          href={`mailto:${card.email}`}
          className="block transition-colors hover:text-gold-300"
        >
          {card.email}
        </a>
      </div>
    </div>
  );
}
