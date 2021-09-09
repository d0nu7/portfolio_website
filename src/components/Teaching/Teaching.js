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
  ClassLink,
  ClassTitle,
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
            <TitleContent>
              <HeaderThree isTitle>{e.category}</HeaderThree>
              <Hr />
            </TitleContent>
            <ul>
              {e.events.map((ev, ei) => {
                return (
                  <li>
                    <ClassLink href={ev.ref} key={ei}>
                      <ClassTitle> {ev.title}</ClassTitle>
                    </ClassLink>
                  </li>
                );
              })}
            </ul>
          </TeachingCard>
        );
      })}
    </GridContainer>
  </Section>
);

export default Teaching;
