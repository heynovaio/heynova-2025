import { ResponsiveImage } from "../ResponsiveImage";
import { ImageField, KeyTextField } from "@prismicio/client";

interface TeamCardProps {
  image?: ImageField;
  name?: KeyTextField;
  position?: KeyTextField;
}

export const TeamCard = ({ image, name, position }: TeamCardProps) => {
  return (
    <div className="border border-aqua w-full p-8 font-body flex flex-col justify-between bg-navy-blue text-black rounded-[1.25rem] glow-blur overflow-hidden">
      {image && (
        <div className="relative -mx-8 -mt-8 mb-4 overflow-hidden ">
          <ResponsiveImage image={image} className="w-full object-cover " />
        </div>
      )}

      <div className="flex-1 mt-2">
        {name && (
          <p className="font-extraBold ml-1 gradient-text inline-block text-label">
            {name}
          </p>
        )}
        {position && <p className="text-base text-white ml-1">{position}</p>}
      </div>
    </div>
  );
};
