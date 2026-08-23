/**
 * One row of a timeline. Declared here rather than in `src/types/` because it
 * is this component's props contract, not a domain type any feature owns.
 */
export type TimelineItem = {
  date: string;
  title: string;
};

export function TimelineCard({ item }: { item: TimelineItem }) {
  return (
    <div
      data-timeline-card
      className="flex rounded-3xl w-80 flex-col gap-2 font-bold bg-gradient-gold p-2"
    >
      <p className="text-center text-2xl">{item.date}</p>
      <div className="w-full h-full min-h-20 flex flex-col justify-center rounded-3xl bg-gradient-timeline p-4">
        <div className="flex items-center justify-center w-full">
          <p className="text-gradient-gold text-2xl text-center flex justify-center">
            {item.title}
          </p>
        </div>
      </div>
    </div>
  );
}
