"use client";

import ReactPlayer from "react-player";

type VideoPlayerProps = {
  /** Any source ReactPlayer understands — YouTube, Vimeo, or a file path. */
  src: string;
  /** Accessible label for the player element, not rendered as text. */
  title: string;
};

/**
 * Client leaf around ReactPlayer. Everything else on the section stays a
 * Server Component, so this is the only bundle the page ships for the video.
 *
 * `wrapper="div"` is what carries `className` and the 100% sizing — the
 * default wrapper only forwards children, so the frame would fall back to
 * ReactPlayer's 320×180. The rounded corners are clipped here rather than on
 * the embed, which we do not control.
 */
const VideoPlayer = ({ src, title }: VideoPlayerProps) => {
  return (
    <ReactPlayer
      src={src}
      title={title}
      wrapper="div"
      width="100%"
      height="100%"
      controls
      playsInline
      className="size-full overflow-hidden"
    />
  );
};

export default VideoPlayer;
