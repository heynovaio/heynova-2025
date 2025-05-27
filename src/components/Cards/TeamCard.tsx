import { ResponsiveImage } from "../ResponsiveImage";
import { ImageField, KeyTextField } from "@prismicio/client";

interface TeamCardProps {
  image?: ImageField;
  name?: KeyTextField;
  position?: KeyTextField;
}

export const TeamCard = ({ image, name, position }: TeamCardProps) => {
  return (
    <div className="border-2 w-full p-8 font-body flex flex-col justify-between bg-[#14335b] text-black rounded-lg overflow-hidden">
      {image && (
        <div className="relative -mx-8 -mt-8 mb-4 overflow-hidden rounded-t-lg">
          <ResponsiveImage
            image={image}
            className="w-full object-cover rounded-t-lg"
          />
        </div>
      )}

      <div className="flex-1">
        {name && <h3 className="font-extraBold text-bodyLarge ml-1">{name}</h3>}
        {position && <p className="text-base ml-1">{position}</p>}
      </div>
    </div>
  );
};
