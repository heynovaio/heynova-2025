import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Container, ContentBox, Section } from "@/components";

/**
 * Props for `TagList`.
 */
export type TagListProps = SliceComponentProps<Content.TagListSlice>;

/**
 * Component for "TagList" Slices.
 */
const TagList: FC<TagListProps> = ({ slice }) => {
  return (
    <Section>
      <Container>
        {slice.primary.title && (
          <ContentBox
            title={slice.primary.title}
            titleClassName="text-aqua 
            "
            content={
              <div className="text-bodyLarge">
                <PrismicRichText
                  field={slice.primary.body}
                  components={{
                    paragraph: ({ children }) => (
                      <p className="!mx-0 ">{children}</p>
                    ),
                  }}
                />
              </div>
            }
            width="standard"
          />
        )}
      </Container>
    </Section>
  );
};

export default TagList;
