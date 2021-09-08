import React from 'react';

import { ResearchTitle,ResearchAuthors, ResearchYear } from './ResearchStyles';
import { Section, SectionDivider, SectionTitle } from '../../styles/GlobalComponents';
import { projects } from '../../constants/constants';
import { Table } from "../Table/Table.js";

const Research = () => (
  <Section nopadding id="research">
    <SectionDivider />
    <SectionTitle main >Publications
    </SectionTitle>

    <Table>
      <Table.Head>
        <Table.TR>
          <Table.TH>Year</Table.TH>
          <Table.TH>Reference</Table.TH>
        </Table.TR>
      </Table.Head>
      <Table.Body>
        <Table.TR>
          <Table.TH>
            <ResearchYear>
            2021

            </ResearchYear>
            </Table.TH>
          <Table.TH>
          <ResearchTitle>


            Awsome Research 
            </ResearchTitle>
            <ResearchAuthors>
              Radi, Radi, Radi
            </ResearchAuthors>

            </Table.TH>
        </Table.TR>
      </Table.Body>
    </Table>

  </Section>
);

export default Research;