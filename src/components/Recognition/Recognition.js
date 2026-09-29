import React from "react";

import { Section, SectionDivider, SectionTitle } from "../../styles/GlobalComponents";
import { awards, Publications } from "../../constants/constants";
import { Row, RowList, RowMain, RowMeta, RowTitle, RowYear, SubTitle } from "../Talks/TalksStyles";

const Recognition = () => (
  <Section id="recognition">
    <SectionDivider divider />
    <SectionTitle>Awards & Publications</SectionTitle>

    <SubTitle>Selected awards & recognition</SubTitle>
    <RowList>
      {awards.map((a) => {
        const inner = (
          <>
            <RowYear>{a.year || ""}</RowYear>
            <RowMain><RowTitle>{a.title}</RowTitle><RowMeta>{a.org}</RowMeta></RowMain>
          </>
        );
        return (
          <li key={a.title + a.org}>
            {a.href
              ? <Row as="a" href={a.href} target="_blank" rel="noopener noreferrer" $link>{inner}</Row>
              : <Row>{inner}</Row>}
          </li>
        );
      })}
    </RowList>

    <SubTitle id="research">Publications</SubTitle>
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

export default Recognition;
