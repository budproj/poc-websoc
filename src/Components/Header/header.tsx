import { Container, Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { NotificationBell } from "../bell";

export interface NotificationEventType {
  notificationCount: number;
}

declare global {
  interface WindowEventMap {
    notification: CustomEvent<NotificationEventType>;
  }
}

export const dispatchNotificationEvent = (notificationCount: number) => {
  const notificationEvent = new CustomEvent("notification", {
    detail: { notificationCount },
  });
  window.dispatchEvent(notificationEvent);
};

export const Header = () => {
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const notificationListener = (
      event: CustomEvent<NotificationEventType>
    ) => {
      if (event.detail.notificationCount) {
        setNotificationCount(
          (prevAmout) => prevAmout + event.detail.notificationCount
        );
      }
    };

    window.addEventListener("notification", notificationListener);
  }, []);

  return (
    <Container>
      <Flex>
        <Heading>WebSoc POC</Heading>
        <NotificationBell count={notificationCount} />
      </Flex>
    </Container>
  );
};
