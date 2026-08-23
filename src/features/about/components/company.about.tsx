import { Container } from "@/components/ui";

import VideoPlayer from "./video-player.about";

const VIDEO_TITLE = "UI Studentpreneurs Company Profile";

/** Placeholder source — swap for the real company profile once it is up. */
const VIDEO_SRC = "https://www.youtube.com/watch?v=LXb3EKWsInQ";

const CompanyVideo = () => {
  return (
    <section id="company-video" className="relative isolate flex items-center">

      <Container className="relative z-10 flex flex-col items-center">
        <div className="relative w-full max-w-7xl">
          <div className="aspect-video w-full">
            <VideoPlayer src={VIDEO_SRC} title={VIDEO_TITLE} />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CompanyVideo;
