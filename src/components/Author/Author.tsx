import React from "react";
import { ResponsiveImage } from "../ResponsiveImage";
import { ImageField, KeyTextField } from "@prismicio/client";

interface AuthorProps {
  image?: ImageField;
  author?: KeyTextField;
  jobTitle?: KeyTextField;
}

const Author = ({ image, author, jobTitle }: AuthorProps) => {
  return (
    <div className="w-full md:max-w-[40%] flex-1 md:basis-0 rounded-[1.25rem] bg-midnight overflow-hidden border border-[#97E1E5]/60">
      <div
        className="flex flex-col items-center justify-center glow-blur gap-8 px-8 py-8 md:px-16 md:py-16 lg:px-32"
        style={{
          background:
            "linear-gradient(66deg, rgba(53, 252, 255, 0.36) 4.86%, rgba(81, 58, 145, 0.36) 84.35%)",
        }}
      >
        <ResponsiveImage
          image={image}
          containerClassName="w-[168px] h-[168px] aspect-square "
          imageHeightClassName="rounded-full overflow-hidden"
        />

        <div className="flex flex-col gap-3 justify-center items-center text-center">
          <span className="text-bodyLarge text-lavendar font-[800]">
            Written By:
          </span>
          <span className="uppercase font-bold">{author}</span>
          <span className="font-[100]">{jobTitle}</span>
        </div>
      </div>
    </div>
  );
};

export default Author;
