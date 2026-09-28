import React from 'react';

import { Section, SectionDivider, SectionTitle } from '../../styles/GlobalComponents';
import { projects } from '../../constants/constants';
import { CardBody, CardInfo, CardLink, GridContainer, HeaderThree, Img, ImgFrame, Tag, TagList } from './ProjectsStyles';

const Projects = () => (
  <Section id="projects">
    <SectionDivider divider />
    <SectionTitle>Projects</SectionTitle>
    <GridContainer>
      {projects.map((p) => (
        <li key={p.id}>
          <CardLink href={p.source} target="_blank" rel="noopener noreferrer">
            <ImgFrame>
              <Img src={p.image} alt={p.imageAlt || `${p.title} project screenshot`} width="400" height="225" loading="lazy" decoding="async" />
            </ImgFrame>
            <CardBody>
              <HeaderThree>{p.title}</HeaderThree>
              <CardInfo>{p.description}</CardInfo>
              <TagList aria-label="Tags">
                {p.tags.map((t) => <Tag key={t}>{t}</Tag>)}
              </TagList>
            </CardBody>
          </CardLink>
        </li>
      ))}
    </GridContainer>
  </Section>
);

export default Projects;
