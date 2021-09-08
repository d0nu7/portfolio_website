import React from 'react';

import { BlogCard, CardInfo, ExternalLinks, GridContainer, HeaderThree, Hr, Tag, TagList, TitleContent, UtilityList, Img } from './ProjectsStyles';
import { Section, SectionDivider, SectionTitle } from '../../styles/GlobalComponents';
import { projects } from '../../constants/constants';

const Projects = () => (
  <Section noPadding id="projects">
    <SectionDivider />
    <SectionTitle main>Projects</SectionTitle>
    <GridContainer>
      {projects.map((p, i) => {
        return (
          <a href={p.source}>
          <BlogCard key={i} >
          <Img src={p.image} />
            <TitleContent>
              <HeaderThree isTSitle>{p.title}</HeaderThree>
              <Hr />
            </TitleContent>
            <CardInfo className="card-info">{p.description}</CardInfo>
            <div>
              <TagList>
                {p.tags.map((t, i) => {
                  return <Tag key={i}>{t}</Tag>;
                })}
              </TagList>
            </div>
            {/* <UtilityList>
              {<ExternalLinks href={p.visit}>Code</ExternalLinks> }
              <ExternalLinks href={p.source}>Visit</ExternalLinks>
            </UtilityList> */}
          </BlogCard>
          </a>
        );
      })}
    </GridContainer>
  </Section>
);

export default Projects;