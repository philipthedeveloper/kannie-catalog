import work from "@/data/works.json";
import { Link } from "react-router-dom";
import appleMusicIcon from "@/assets/images/apple-music.jpeg";
import spotifyIcon from "@/assets/images/spotify.png";

type CardProps = {
  description: string;
  appleMusicLink: string;
  spotifyLink: string;
  coverArtUrl: string;
};

const WorkCard = ({
  description,
  appleMusicLink,
  spotifyLink,
  coverArtUrl,
}: CardProps) => {
  return (
    <div className="bg-white shadow-[0px_4px_8px_0px_#0000000d,0px_6px_20px_0px_rgba(0,0,0,0.02)] flex flex-col">
      <div className="flex-1 bg-[#fafafa] overflow-hidden relative">
        <div className="h-full relative">
          <img src={coverArtUrl} className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="p-4 flex flex-col justify-between gap-2">
        <p className="font-jost leading-relaxed">{description}</p>
        <div className="flex items-center gap-2">
          <a
            target="_blank"
            href="https://music.apple.com/ng/album/nonstop-single/1605316975"
          >
            <img src={appleMusicIcon} className="w-8 h-8" />
          </a>
          <a
            href="https://open.spotify.com/track/2KxfdmPnyOHhXgMNUmQjRZ?si=dk3LQmSvQzmuvVFD-W9Etg&context=spotify%3Aalbum%3A2wqyoPMDUPk5GrSMoiFwdW"
            target="_blank"
          >
            <img src={spotifyIcon} className="w-8 h-8" />
          </a>
        </div>
      </div>
    </div>
  );
};

export const Works = () => {
  return (
    <div className="min-h-[30dvh]" id="works">
      <div className="py-20 w-[90%] max-w-7xl mx-auto flex flex-col gap-12">
        <h2 className="font-great-vibe text-3xl md:text-4xl text-blue-400 font-medium">
          Some of my works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[550px] gap-6">
          <WorkCard {...work} />
        </div>

        <div className="flex items-center justify-center">
          <Link
            to={"/works"}
            className="text-center text-sm py-3 px-4 bg-blue-400 text-white rounded-md font-medium hover:brightness-75 duration-300 flex items-center justify-center cursor-pointer w-max"
          >
            View all works
          </Link>
        </div>
      </div>
    </div>
  );
};
