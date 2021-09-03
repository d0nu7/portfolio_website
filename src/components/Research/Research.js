import React from 'react';

import { ResearchTitle,ResearchAuthors } from './ResearchStyles';
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
            <ResearchTitle>
            2021

            </ResearchTitle>
            </Table.TH>
          <Table.TH>
          <ResearchTitle>


            Awsome Research 
            </ResearchTitle>
            <ResearchAuthors>
              Radi
            </ResearchAuthors>

            </Table.TH>
        </Table.TR>
      </Table.Body>
    </Table>

  </Section>
);

export default Research;