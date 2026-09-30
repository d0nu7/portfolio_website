import React from "react";

import { ROUTES } from "../../i18n/routes";
import useHomeCopy from "../../i18n/useHomeCopy";
import { ButtonLink, ButtonRow } from "../../styles/GlobalComponents";
import { Box, Text, Title } from "./ContactStyles";

const Contact = () => {
  const { lang, t } = useHomeCopy();
  return (
    <Box id="contact" data-reveal="">
      <Title>{t.contact.title}</Title>
      <Text>{t.contact.text}</Text>
      <ButtonRow>
        <ButtonLink href="mailto:contact@radi.solutions">contact@radi.solutions</ButtonLink>
        <ButtonLink href={ROUTES.training[lang]} variant="secondary">{t.contact.training}</ButtonLink>
      </ButtonRow>
    </Box>
  );
};

export default Contact;
