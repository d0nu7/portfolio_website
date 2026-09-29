import React from "react";

import { Section, SectionDivider, SectionTitle } from "../../styles/GlobalComponents";
import { awards, Publications } from "../../constants/constants";
import { tr } from "../../i18n/LanguageContext";
import useHomeCopy from "../../i18n/useHomeCopy";
import { Row, RowList, RowMain, RowMeta, RowTitle, RowYear, SubTitle } from "../Talks/TalksStyles";

const Recognition = () => {
  const { lang, t } = useHomeCopy();
  return (
    <Section id="recognition">
      <SectionDivider divider />
      <SectionTitle>{t.recognition.title}</SectionTitle>

      <SubTitle>{t.recognition.awards}</SubTitle>
      <RowList>
        {awards.map((a) => {
          const inner = (
            <>
              <RowYear>{a.year || ""}</RowYear>
              <RowMain><RowTitle>{tr(a.title, lang)}</RowTitle><RowMeta>{tr(a.org, lang)}</RowMeta></RowMain>
            </>
          );
          return (
            <li key={tr(a.title, "en") + tr(a.org, "en")}>
              {a.href
                ? <Row as="a" href={a.href} target="_blank" rel="noopener noreferrer" $link>{inner}</Row>
                : <Row>{inner}</Row>}
            </li>
          );
        })}
      </RowList>

      <SubTitle id="research">{t.recognition.publications}</SubTitle>
      <RowList>
        {Publications.map((p) => (
          <li key={p.doi}>
            <Row as="a" href={p.doi} target="_blank" rel="noopener noreferrer" $link>
              <RowYear>{p.year}</RowYear>
              <RowMain><RowTitle>{p.title}</RowTitle><RowMeta>{p.authors}</RowMeta></RowMain>
            </Row>
          </li>
        ))}
      </RowList>
    </Section>
  );
};

export default Recognition;
