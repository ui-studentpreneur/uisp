/** One contact, as stored under the `footer.contacts` collection. */
export type ContactCardData = {
  title: string;
  phone: string;
  email: string;
};

/** `tel:` rejects spaces, so strip everything that is not a digit or `+`. */
function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
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
          href={telHref(card.phone)}
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
