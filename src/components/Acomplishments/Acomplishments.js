import React from "react";
import { GiGamepad } from "react-icons/gi";
import { HiAcademicCap } from "react-icons/hi";
import { RiMedalLine } from "react-icons/ri";

import { Section, SectionDivider, SectionTitle } from "../../styles/GlobalComponents";
import { Box, Boxes, BoxIcon, BoxNum, BoxText } from "./AcomplishmentsStyles";

const achievements = [
  { title: "Austrian CG Award 2015", lines: ["Best Game", "Project Yokaisho"], Icon: GiGamepad },
  { title: "Austrian CG Award 2016", lines: ["Best Game, Best Student Project", "Project NIVA"], Icon: GiGamepad },
  { title: "Order for Disaster Relief", lines: ["State of Salzburg"], Icon: RiMedalLine },
  { title: "Science Award 2017", lines: ["AK Salzburg"], Icon: HiAcademicCap },
];

const Acomplishments = () => (
  <Section id="acomplishments">
    <SectionDivider divider />
    <SectionTitle>Achievements</SectionTitle>
    <Boxes>
      {achievements.map(({ title, lines, Icon }) => (
        <Box key={title}>
          <div>
            <BoxNum>{title}</BoxNum>
            <BoxText>
              {lines.map((line) => <span key={line}>{line}</span>)}
            </BoxText>
          </div>
          <BoxIcon aria-hidden="true"><Icon /></BoxIcon>
        </Box>
      ))}
    </Boxes>
  </Section>
);

export default Acomplishments;
