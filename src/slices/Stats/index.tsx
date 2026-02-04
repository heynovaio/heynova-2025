import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Container } from "@/components";

type SliceContext = {
  lang: string;
  isBlogPage?: boolean;
};

export type StatsProps = SliceComponentProps<Content.StatsSlice, SliceContext>;

const Stats: FC<StatsProps> = ({ slice, context }) => {
  const background = slice.primary.background;
  const numColumns = slice.primary.number_of_columns;

  const bgColor =
    background === "Teal"
      ? "bg-teal-drk"
      : background === "Blue"
        ? "bg-aqua text-black"
        : "bg-purple-lt text-black";

  const isBlog = context?.isBlogPage ?? false;
  const verticalPadding = isBlog ? "py-6 print:my-0" : "py-8 md:py-13";

  return (
    <AnimatedSection>
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className={`${bgColor} ${verticalPadding} flex justify-center items-center w-full`}
      >
        <Container>
          <div
            className="grid grid-animate w-full  px-4 md:px-0 gap-8 grid-cols-1 md:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]"
            style={{ "--cols": numColumns } as React.CSSProperties}
          >
            {slice.primary.stats.map((stat) => (
              <div key={stat.stat} className="text-center">
                <div className="text-massive font-[700]">{stat.stat}</div>
                <div className="text-[1.375rem] font-[300]">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </AnimatedSection>
  );
};

export default Stats;
