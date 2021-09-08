import React from "react";

import { ResearchTitle, ResearchAuthors, ResearchYear } from "./ResearchStyles";
import {
  Section,
  SectionDivider,
  SectionTitle,
} from "../../styles/GlobalComponents";
import { Publications } from "../../constants/constants";
import { Table } from "../Table/Table.js";
import { NavLink } from "../Table/TableStyles";

const Research = () => (
  <Section nopadding id="research">
    <SectionDivider />
    <SectionTitle main>Publications</SectionTitle>

    <Table>

      <Table.Body>
        {Publications.map((p, i) => {
          return (
            <Table.TR key={i}>
              <NavLink href={p.doi}>
                <Table.TH>
                  <ResearchYear>{p.year}</ResearchYear>
                </Table.TH>
                <Table.TH>
                  <ResearchTitle>{p.title}</ResearchTitle>
                  <ResearchAuthors>{p.authors}</ResearchAuthors>
                </Table.TH>
              </NavLink>
            </Table.TR>
          );
        })}
      </Table.Body>
    </Table>
  </Section>
);

export default Research;
