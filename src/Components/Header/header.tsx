import { Container, Flex, Heading, StyleProps } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { useSocket } from "../../socket";

import { NotificationBell, Notification as NotificationType } from "../bell";

export const Header = (props: StyleProps) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const addNotification = (data: unknown) => {
    setNotifications((prevCount) => [...prevCount, data as NotificationType]);
  };

  useEffect(useSocket("notification", addNotification), []);

  return (
    <Container {...props}>
      <Flex justifyContent="space-between">
        <Heading>WebSoc POC</Heading>
        <NotificationBell notifications={notifications} />
      </Flex>
    </Container>
  );
};
