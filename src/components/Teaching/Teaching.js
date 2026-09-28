import React from "react";

import { Section, SectionDivider, SectionTitle } from "../../styles/GlobalComponents";
import { TeachingExperience } from "../../constants/constants";
import { CardList, CardTitle, ClassLink, GridContainer, TeachingCard } from "./TeachingStyles";

const Teaching = () => (
  <Section id="teaching">
    <SectionDivider divider />
    <SectionTitle>Teaching</SectionTitle>
    <GridContainer>
      {TeachingExperience.map((group) => (
        <TeachingCard key={group.category}>
          <CardTitle>{group.category}</CardTitle>
          <CardList>
            {group.events.map((event) => (
              <li key={event.title}>
                {event.ref ? (
                  <ClassLink href={event.ref} target="_blank" rel="noopener noreferrer">{event.title}</ClassLink>
                ) : (
                  event.title
                )}
              </li>
            ))}
          </CardList>
        </TeachingCard>
      ))}
    </GridContainer>
  </Section>
);

export default Teaching;
