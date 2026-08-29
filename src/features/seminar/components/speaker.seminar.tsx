import { SpeakerSection, type SpeakerGroup } from "@/components/speaker";

const SpeakerSeminar = ({
  heading,
  groups,
}: {
  heading: string;
  groups: readonly SpeakerGroup[];
}) => <SpeakerSection heading={heading} groups={groups} />;

export default SpeakerSeminar;
