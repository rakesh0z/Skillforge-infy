interface VideoPlayerProps {
  src: string
  title: string
  poster?: string
}

const VideoPlayer = ({ src, title, poster }: VideoPlayerProps) => (
  <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black">
    <video
      key={src}
      className="w-full h-full"
      src={src}
      poster={poster}
      controls
      controlsList="nodownload"
    >
      Your browser does not support video playback.
    </video>
    <div className="mt-3">
      <p className="text-lg font-semibold text-slate-900">{title}</p>
    </div>
  </div>
)

export default VideoPlayer

