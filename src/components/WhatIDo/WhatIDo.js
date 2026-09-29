import React from "react";

import { Section, SectionDivider, SectionTitle } from "../../styles/GlobalComponents";
import { services } from "../../constants/constants";
import { tr } from "../../i18n/LanguageContext";
import useHomeCopy from "../../i18n/useHomeCopy";
import { Card, CardLink, CardList, CardText, CardTitle, Grid } from "./WhatIDoStyles";

const WhatIDo = () => {
  const { lang, t } = useHomeCopy();
  return (
    <Section id="work">
      <SectionDivider divider />
      <SectionTitle>{t.work.title}</SectionTitle>
      <Grid>
        {services.map((s) => (
          <Card key={s.id}>
            <CardTitle>{tr(s.title, lang)}</CardTitle>
            <CardText>{tr(s.text, lang)}</CardText>
            <CardList>
              {s.items.map((item) => <li key={tr(item, "en")}>{tr(item, lang)}</li>)}
            </CardList>
            {s.link && <CardLink href={s.link.href}>{tr(s.link.label, lang)} &rarr;</CardLink>}
          </Card>
        ))}
      </Grid>
    </Section>
  );
};

export default WhatIDo;
