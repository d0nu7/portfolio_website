import React from "react";

import { Section, SectionDivider, SectionTitle } from "../../styles/GlobalComponents";
import { Publications } from "../../constants/constants";
import { PubLink, PubList, ResearchAuthors, ResearchTitle, ResearchYear } from "./ResearchStyles";

const Research = () => (
  <Section id="research">
    <SectionDivider divider />
    <SectionTitle>Publications</SectionTitle>
    <PubList>
      {Publications.map((p) => (
        <li key={p.doi}>
          <PubLink href={p.doi} target="_blank" rel="noopener noreferrer">
            <ResearchYear>{p.year}</ResearchYear>
            <span>
              <ResearchTitle>{p.title}</ResearchTitle>
              <ResearchAuthors>{p.authors}</ResearchAuthors>
            </span>
          </PubLink>
        </li>
      ))}
    </PubList>
  </Section>
);

export default Research;
