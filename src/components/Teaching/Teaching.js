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
import styled from "styled-components";

const Teaching = () => (
  <Section nopadding id="teaching">
    <SectionDivider />
    <SectionTitle main>Teaching</SectionTitle>
    <GridContainer>
      {TeachingExperience.map((e, i) => {
        return (
          <TeachingCard key={i}>
            <span>{e.category}</span>

            {e.events.map((ev, ei) => {
              return (
                <a href={ev.ref} key={ei}>
              <div> {ev.title}</div>
              </a>
              );
            })}
          </TeachingCard>
        );
      })}
    </GridContainer>
  </Section>
);

export default Teaching;
