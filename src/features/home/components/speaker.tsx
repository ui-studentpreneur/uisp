import { SpeakerSection, type SpeakerGroup } from "@/components/speaker";

/**
 * Home page's speaker list. Only the copy and the people are the home page's —
 * the carousel and layout are shared with `seminar/` and `summit/`.
 */
const HomeSpeakerSection = ({
  heading,
  groups,
}: {
  heading: string;
  groups: readonly SpeakerGroup[];
}) => <SpeakerSection heading={heading} groups={groups} />;

export default HomeSpeakerSection;
