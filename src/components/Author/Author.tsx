import React from "react";
import { ResponsiveImage } from "../ResponsiveImage";
import { ImageField } from "@prismicio/client";

interface AuthorProps {
  image?: ImageField;
  author?: string;
  jobTitle?: string;
}

const Author = ({ image, author, jobTitle }: AuthorProps) => {
  return (
    <div className="gradient-border p-[0.5px] rounded-[20px]">
      <div className="gradient-card-bg flex flex-col items-center justify-center glow-blur gap-8 px-10 py-16">
        <ResponsiveImage
          image={image}
          containerClassName="w-[168px] h-[168px] aspect-square rounded-full"
        />
        <span className="text-bodyLarge text-white font-bold">Written By:</span>
        <div className="flex flex-col gap-3">
          <span>{author}</span>
          <span>{jobTitle}</span>
        </div>
      </div>
    </div>
  );
};

export default Author;
