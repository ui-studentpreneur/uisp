import { SpeakerSection, type SpeakerGroup } from "@/components/speaker";

const SpeakerSummit = ({
  heading,
  groups,
}: {
  heading: string;
  groups: readonly SpeakerGroup[];
}) => <SpeakerSection heading={heading} groups={groups} />;

export default SpeakerSummit;
