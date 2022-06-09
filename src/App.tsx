import {
  FormControl,
  FormLabel,
  Textarea,
  Button,
  Container,
} from "@chakra-ui/react";

import { Header, dispatchNotificationEvent } from "./Components/Header/header";

export const App = () => {
  const sendNotification = () => {
    dispatchNotificationEvent(1);
  };

  return (
    <>
      <Header />
      <Container>
        <FormControl>
          <FormLabel htmlFor="comment">Write your comment</FormLabel>
          <Textarea id="comment" />
        </FormControl>

        <Button mt={4} float="right" onClick={sendNotification}>
          Enviar comentário
        </Button>
      </Container>
    </>
  );
};
