import React from "react";

import { Section, SectionDivider, SectionTitle } from "../../styles/GlobalComponents";
import { talks, talkTypes } from "../../constants/constants";
import { tr } from "../../i18n/LanguageContext";
import useHomeCopy from "../../i18n/useHomeCopy";
import { Row, RowList, RowMain, RowMeta, RowTitle, RowType, RowYear } from "./TalksStyles";

const Talks = () => {
  const { lang, t } = useHomeCopy();
  return (
    <Section id="talks">
      <SectionDivider divider />
      <SectionTitle>{t.talks.title}</SectionTitle>
      <RowList>
        {talks.map((talk) => {
          const inner = (
            <>
              <RowYear>{talk.year}</RowYear>
              <RowMain>
                <RowTitle>{tr(talk.title, lang)}</RowTitle>
                <RowMeta>
                  <RowType>{tr(talkTypes[talk.type], lang)}</RowType>
                  {tr(talk.org, lang)}
                </RowMeta>
              </RowMain>
            </>
          );
          return (
            <li key={`${talk.year}-${tr(talk.title, "en")}`}>
              {talk.href
                ? <Row as="a" href={talk.href} target="_blank" rel="noopener noreferrer" $link>{inner}</Row>
                : <Row>{inner}</Row>}
            </li>
          );
        })}
      </RowList>
    </Section>
  );
};

export default Talks;
