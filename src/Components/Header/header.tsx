import { Container, Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { useSocket } from "../../socket";

import { NotificationBell } from "../bell";

export const Header = () => {
  const [notificationCount, setNotificationCount] = useState(0);

  const addNotification = (data: unknown) => {
    setNotificationCount((prevCount) => prevCount + (data as number));
  };

  useEffect(useSocket("notification", addNotification), []);

  return (
    <Container>
      <Flex justifyContent="space-between">
        <Heading>WebSoc POC</Heading>
        <NotificationBell count={notificationCount} />
      </Flex>
    </Container>
  );
};
