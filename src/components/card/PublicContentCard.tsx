import { ContentType } from "@/enums";
import { Content } from "@/interfaces";
import { Play } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import playingGif from "@/assets/images/giphy.gif";
import { cn } from "@/lib/utils";
import { Portal } from "../design";

type MediaComponentProps = {
  mediaUrl: string;
};

const durationFormatter = (duration: number) => {
  let minutes: any = Math.floor(duration / 60);
  let seconds: any = Math.floor(duration % 60);

  if (minutes < 10) minutes = `0${minutes}`;
  if (seconds < 10) seconds = `0${seconds}`;

  return `${minutes}:${seconds}`;
};

const VideoComponent = ({ mediaUrl }: MediaComponentProps) => {
  const [totalDuration, setTotalDuration] = useState(1);
  const [currentDuration, setCurrentDuration] = useState(0);
  const [currentRangeValue, setCurrentRangeValue] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const playingInterval = useRef<any>(null);
  const ref = useRef<any>(null);

  const play = () => {
    ref?.current?.play();
    setIsPlaying(true);
  };

  const pause = () => {
    ref?.current.pause();
    setIsPlaying(false);
    clearInterval(playingInterval.current);
  };

  const handleRangeChange = (e: any) => {
    console.log("Change handler called");
    const value = e.target.value;
    setCurrentRangeValue(value);
    const currentTime = (value / 100) * totalDuration;
    ref.current.currentTime = currentTime;
    setCurrentDuration(currentTime || 0);
  };

  function trackDuration() {
    console.log("Still running");
    if (!ref?.current?.currentTime) return;
    setCurrentDuration(ref.current.currentTime);
    setCurrentRangeValue(
      Math.ceil((ref.current.currentTime / totalDuration) * 100)
    );
  }

  useEffect(() => {
    if (!ref?.current?.ended && isPlaying) {
      playingInterval.current = setInterval(() => {
        trackDuration();
      }, 1000);
    }

    return () => clearInterval(playingInterval.current);
  }, [isPlaying, currentRangeValue]);

  return (
    <>
      <div className="h-full relative">
        <video src={mediaUrl} className="h-full object-contain w-full" />
        {isPlaying && (
          <Portal
            isOpen={isPlaying}
            onClose={pause}
            modalContentContainerStyle="w-[90%] max-w-6xl h-[80%] max-h-[800px] flex flex-col p-0 m-0 relative"
          >
            <div className="flex-1 overflow-hidden relative w-full">
              <div
                className={cn(
                  "absolute top-0 h-2 bg-blue-400 z-10 right-0 left-0"
                )}
                style={{
                  width: `${Math.floor(
                    (currentDuration / totalDuration) * 100
                  )}%`,
                }}
              ></div>
              <video
                src={mediaUrl}
                autoPlay
                className="object-contain w-full h-full"
                ref={ref}
                onEnded={pause}
                onLoadedMetadata={() => setTotalDuration(ref.current.duration)}
              />
            </div>
            <div className="h-20 transparent-white flex justify-between items-center px-6 gap-4">
              <span className="text-white font-medium font-jost">
                {durationFormatter(currentDuration)}
              </span>
              <input
                type="range"
                onChange={handleRangeChange}
                value={currentRangeValue}
                min={0}
                max={100}
                className="flex-1"
              />
              <span className="text-white font-medium font-jost">
                {durationFormatter(totalDuration)}
              </span>
            </div>
          </Portal>
        )}
      </div>

      {/* overlay */}
      {!isPlaying && (
        <div className="absolute bg-[#00000067] w-full h-full top-0 left-0 flex justify-center items-center">
          <button
            className="rounded-full bg-blue-400 w-20 h-20 flex justify-center items-center text-white cursor-pointer hover:bg-blue-600 transition-colors duration-300"
            onClick={play}
          >
            <Play />
          </button>
        </div>
      )}
    </>
  );
};

export const AudioComponent = ({
  mediaUrl,
  coverArtUrl,
}: MediaComponentProps & {
  coverArtUrl: string;
}) => {
  const [totalDuration, setTotalDuration] = useState(1);
  const [currentDuration, setCurrentDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const ref = useRef<any>(null);

  const play = () => {
    ref?.current?.play();
    setIsPlaying(true);
  };

  const pause = () => {
    ref?.current.pause();
    setIsPlaying(false);
  };

  return (
    <>
      <div className="h-full relative">
        <img src={coverArtUrl} className="w-full h-full object-cover" />
        <audio
          ref={ref}
          hidden
          src={mediaUrl}
          onEnded={pause}
          onLoadedMetadata={() => setTotalDuration(ref.current.duration)}
          onTimeUpdate={() => setCurrentDuration(ref.current.currentTime)}
        />
        {isPlaying && (
          <div
            className="w-full h-full top-0 left-0 bg-[#00000041] absolute cursor-pointer"
            onClick={pause}
          >
            <div
              className={cn("absolute top-0 h-2 bg-blue-400 w-full z-10")}
              style={{
                width: `${Math.floor(
                  (currentDuration / totalDuration) * 100
                )}%`,
              }}
            ></div>
            <img
              src={playingGif}
              className="opacity-30 w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* overlay */}
      {!isPlaying && (
        <div className="absolute bg-[#00000067] w-full h-full top-0 left-0 flex justify-center items-center">
          <button
            className="rounded-full bg-blue-400 w-20 h-20 flex justify-center items-center text-white cursor-pointer hover:bg-blue-600 transition-colors duration-300"
            onClick={play}
          >
            <Play />
          </button>
        </div>
      )}
    </>
  );
};

interface Props extends Content {}

export const PublicContentCard = ({
  description,
  type,
  mediaUrl,
  coverArtUrl,
}: Props) => {
  return (
    <div className="bg-white shadow-[0px_4px_8px_0px_#0000000d,0px_6px_20px_0px_rgba(0,0,0,0.02)] flex flex-col">
      <div className="flex-1 bg-[#fafafa] overflow-hidden relative">
        {type === ContentType.AUDIO ? (
          <AudioComponent mediaUrl={mediaUrl} coverArtUrl={coverArtUrl!} />
        ) : (
          <VideoComponent mediaUrl={mediaUrl} />
        )}
      </div>
      <div className="h-20 px-4 py-2">
        <p className="font-jost leading-relaxed">{description}</p>
      </div>
    </div>
  );
};
