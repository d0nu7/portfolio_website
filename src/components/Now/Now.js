import React from "react";

import { Section, SectionDivider, SectionText, SectionTitle } from "../../styles/GlobalComponents";
import { nowTopics } from "../../constants/constants";
import { tr } from "../../i18n/LanguageContext";
import useHomeCopy from "../../i18n/useHomeCopy";
import { Tile, TileText, TileTitle, Tiles } from "./NowStyles";

const Now = () => {
  const { lang, t } = useHomeCopy();
  return (
    <Section id="now">
      <SectionDivider divider />
      <SectionTitle>{t.now.title}</SectionTitle>
      <SectionText>{t.now.intro}</SectionText>
      <Tiles>
        {nowTopics.map((topic, i) => (
          <Tile key={tr(topic.title, "en")}>
            <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <TileTitle>{tr(topic.title, lang)}</TileTitle>
            <TileText>{tr(topic.text, lang)}</TileText>
          </Tile>
        ))}
      </Tiles>
    </Section>
  );
};

export default Now;
