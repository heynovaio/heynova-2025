import { IoPersonOutline } from "react-icons/io5";
import { ResponsiveImage } from "../ResponsiveImage";
import { ImageField, KeyTextField } from "@prismicio/client";

interface TeamCardProps {
  image?: ImageField;
  name?: KeyTextField;
  position?: KeyTextField;
}

export const TeamCard = ({ image, name, position }: TeamCardProps) => {
  return (
    <div className="p-[0.5px] rounded-[1.25rem] gradient-border team-card">
      <div className="bg-[#173a5f] w-full h-full p-8 font-body flex flex-col justify-between bg-navy-blue text-black rounded-[1.25rem] glow-blur overflow-hidden">
        <div className="relative -mx-8 -mt-8 mb-4 overflow-hidden aspect-square">
          {image && "url" in image && image.url ? (
            <ResponsiveImage
              image={image}
              className="w-full object-cover aspect-square rounded-none"
              imageHeightClassName="h-full"
            />
          ) : (
            <div className="w-full h-full bg-midnight flex items-center justify-center">
              <IoPersonOutline className="h-40 w-40 text-white inline-block text-label" />
            </div>
          )}
        </div>

        <div className="flex-1 mt-2">
          {name && (
            <p className="font-extraBold ml-1 gradient-text inline-block text-label">
              {name}
            </p>
          )}
          {position && <p className="text-base text-white ml-1">{position}</p>}
        </div>
      </div>
    </div>
  );
};
