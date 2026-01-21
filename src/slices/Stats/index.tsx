import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { AnimatedSection } from "@/components/AnimatedSection";

export type StatsProps = SliceComponentProps<Content.StatsSlice>;

const Stats: FC<StatsProps> = ({ slice }) => {
  const background = slice.primary.background;
  const bgColor = !background
    ? "bg-aqua text-purple-drk"
    : "bg-teal-drk text-white";

  return (
    <AnimatedSection>
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className={`${bgColor} py-12 flex justify-center items-center w-full`}
      >
        <div className="grid-animate w-full flex flex-col md:flex-row justify-around items-center max-w-6xl px-4 md:px-0 space-y-8 md:space-y-0 md:space-x-4">
          {slice.primary.stats.map((stat) => (
            <div key={stat.stat} className="text-center">
              <div className="text-massive font-[700]">{stat.stat}</div>
              <div className="text-[1.375rem] font-[300]">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </section>
    </AnimatedSection>
  );
};

export default Stats;
