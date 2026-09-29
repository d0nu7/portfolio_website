import React from "react";

import { Section, SectionDivider, SectionTitle } from "../../styles/GlobalComponents";
import { services } from "../../constants/constants";
import { Card, CardLink, CardList, CardText, CardTitle, Grid } from "./WhatIDoStyles";

const WhatIDo = () => (
  <Section id="work">
    <SectionDivider divider />
    <SectionTitle>What I do</SectionTitle>
    <Grid>
      {services.map((s) => (
        <Card key={s.id}>
          <CardTitle>{s.title}</CardTitle>
          <CardText>{s.text}</CardText>
          <CardList>
            {s.items.map((item) => <li key={item}>{item}</li>)}
          </CardList>
          {s.link && <CardLink href={s.link.href}>{s.link.label} &rarr;</CardLink>}
        </Card>
      ))}
    </Grid>
  </Section>
);

export default WhatIDo;
