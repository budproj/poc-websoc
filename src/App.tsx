import {
  FormControl,
  FormLabel,
  Textarea,
  Button,
  Container,
} from "@chakra-ui/react";
import { useState } from "react";

import { Header } from "./Components/Header/header";
import { emitSocketMessage } from "./socket";

export const App = () => {
  const [message, setMessage] = useState("");

  const sendNotification = () => {
    if (message) {
      emitSocketMessage("comment", message);
      setMessage("");
    }
  };

  return (
    <>
      <Header />
      <Container>
        <FormControl>
          <FormLabel htmlFor="comment">Write your comment</FormLabel>
          <Textarea
            id="comment"
            value={message}
            placeholder="Digite seu comentário"
            onChange={(e) => setMessage(e.target.value)}
          />
        </FormControl>

        <Button mt={4} float="right" onClick={sendNotification}>
          Enviar comentário
        </Button>
      </Container>
    </>
  );
};
