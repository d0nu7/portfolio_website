import React from "react";

import useHomeCopy from "../../i18n/useHomeCopy";
import { ButtonLink, ButtonRow } from "../../styles/GlobalComponents";
import { Box, Text, Title } from "./ContactStyles";

const Contact = () => {
  const { t } = useHomeCopy();
  return (
    <Box id="contact" data-reveal="">
      <Title>{t.contact.title}</Title>
      <Text>{t.contact.text}</Text>
      <ButtonRow>
        <ButtonLink href="mailto:contact@radi.solutions">contact@radi.solutions</ButtonLink>
        <ButtonLink href="/ki-schulungen/" variant="secondary">{t.contact.training}</ButtonLink>
      </ButtonRow>
    </Box>
  );
};

export default Contact;
