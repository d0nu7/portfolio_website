import React from "react";
import { GiArtificialIntelligence, GiGamepad, GiLevelThree, GiSmartphone, GiTeacher, GiVrHeadset } from "react-icons/gi";

import { Section, SectionDivider, SectionTitle } from "../../styles/GlobalComponents";
import { List, ListContainer, ListIcon, ListItem, ListParagraph, ListTitle } from "./SkillsStyles";

const focus = [
  { Icon: GiGamepad, title: "Games", text: "Game development and design from prototype to release. Unity 6, C#, AI for games." },
  { Icon: GiVrHeadset, title: "Mixed Reality", text: "AR and VR applications, tracking and photogrammetry, often for health and research." },
  { Icon: GiArtificialIntelligence, title: "Computer Vision & AI", text: "Making machines see and reason, from classic vision pipelines to generative AI." },
  { Icon: GiTeacher, title: "AI Trainings", text: "Hands-on AI literacy for teams, public administration and leadership, EU AI Act included." },
  { Icon: GiLevelThree, title: "Rapid Prototyping", text: "From idea to something you can test: 3D printing, electronics, CAD." },
  { Icon: GiSmartphone, title: "Web & Mobile", text: "Apps and tools for research projects: React, Next.js, .NET, Android." },
];

const Skills = () => (
  <Section id="tech">
    <SectionDivider divider />
    <SectionTitle>Focus</SectionTitle>
    <List>
      {focus.map(({ Icon, title, text }) => (
        <ListItem key={title}>
          <ListIcon aria-hidden="true"><Icon size="4rem" /></ListIcon>
          <ListContainer>
            <ListTitle>{title}</ListTitle>
            <ListParagraph>{text}</ListParagraph>
          </ListContainer>
        </ListItem>
      ))}
    </List>
  </Section>
);

export default Skills;
