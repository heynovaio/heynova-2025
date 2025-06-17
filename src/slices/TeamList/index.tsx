import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { TeamCard } from "@/components/Cards/TeamCard";
import { Container, Section } from "@/components";

/**
 * Props for `TeamList`.
 */
export type TeamListProps = SliceComponentProps<Content.TeamListSlice>;

/**
 * Component for "TeamList" Slices.
 */
const TeamList: FC<TeamListProps> = ({ slice }) => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Container>
        <div className="grid gap-10 sm:grid-cols-3 lg:grid-cols-4">
          {slice.primary.team_member.map((team_member, index) => (
            <TeamCard
              key={index}
              name={team_member.name}
              position={team_member.position}
              image={team_member.image}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default TeamList;
