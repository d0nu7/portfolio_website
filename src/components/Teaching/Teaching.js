import React from "react";

import {
  BlogCard,
  CardInfo,
  ExternalLinks,
  GridContainer,
  HeaderThree,
  Hr,
  Tag,
  TagList,
  TitleContent,
  UtilityList,
  Img,
  TeachingCard,
} from "./TeachingStyles";
import {
  Section,
  SectionDivider,
  SectionTitle,
} from "../../styles/GlobalComponents";
import { TeachingExperience } from "../../constants/constants";

const Teaching = () => (
  <Section nopadding id="teaching">
    <SectionDivider />
    <SectionTitle main>Teaching</SectionTitle>
    <GridContainer>
      {TeachingExperience.map((e, i) => {
        return (
          <TeachingCard key={i}>
            <span>{e.category}</span>
            {/* {e.events.map((ev, i2) => {
              <span>0</span>;
            })}
            { e.events.map((ev, i) => {
              <span>ev.title</span>;
            })}  */}
          </TeachingCard>
        );
      })}
    </GridContainer>
  </Section>
);

export default Teaching;
