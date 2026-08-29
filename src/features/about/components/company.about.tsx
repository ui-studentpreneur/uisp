import { Container, Reveal } from "@/components/ui";

import VideoPlayer from "./video-player.about";

const CompanyVideo = ({ src, title }: { src: string; title: string }) => {
  return (
    <section id="company-video" className="relative isolate flex items-center">
      <Container className="relative z-10 flex flex-col items-center">
        <Reveal motion="unfurl" className="w-full">
          <div className="relative w-full max-w-7xl">
            <div className="aspect-video w-full">
              <VideoPlayer src={src} title={title} />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};

export default CompanyVideo;
