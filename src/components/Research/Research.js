import React from "react";

import {
  Section,
  SectionDivider,
  SectionTitle,
} from "../../styles/GlobalComponents";

import {
  ResearchTitle,
  ResearchAuthors,
  ResearchYear,
  Table,
  TableCell,
  TableRow,
  DoiLink,
} from "./ResearchStyles";

import { Publications } from "../../constants/constants";

const Research = () => (
  <Section nopadding id="research">
    <SectionDivider />
    <SectionTitle main>Publications</SectionTitle>

    <Table>
      {Publications.map((p, i) => {
        return (
          <DoiLink key={i} href={p.doi}>
            <TableRow>
              <TableCell>
                <ResearchYear>{p.year}</ResearchYear>
              </TableCell>
              <TableCell>
                <ResearchTitle>{p.title}</ResearchTitle>
                <ResearchAuthors>{p.authors}</ResearchAuthors>
              </TableCell>
            </TableRow>
          </DoiLink>
        );
      })}
    </Table>
  </Section>
);

export default Research;
