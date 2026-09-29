import React from "react";

import { Section, SectionDivider, SectionTitle } from "../../styles/GlobalComponents";
import { talks } from "../../constants/constants";
import { Row, RowList, RowMain, RowMeta, RowTitle, RowYear } from "./TalksStyles";

const Inner = ({ t }) => (
  <>
    <RowYear>{t.year}</RowYear>
    <RowMain>
      <RowTitle>{t.title}</RowTitle>
      <RowMeta>{t.org}</RowMeta>
    </RowMain>
  </>
);

const Talks = () => (
  <Section id="talks">
    <SectionDivider divider />
    <SectionTitle>Talks, Workshops & Media</SectionTitle>
    <RowList>
      {talks.map((t) => (
        <li key={`${t.year}-${t.title}`}>
          {t.href ? (
            <Row as="a" href={t.href} target="_blank" rel="noopener noreferrer" $link><Inner t={t} /></Row>
          ) : (
            <Row><Inner t={t} /></Row>
          )}
        </li>
      ))}
    </RowList>
  </Section>
);

export default Talks;
