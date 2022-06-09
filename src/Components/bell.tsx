import { BellIcon } from "@chakra-ui/icons";
import { Box, IconButton, Text } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { useState, useEffect, useMemo } from "react";

export interface Notification {
  id: string;
  message: string;
}

export interface NotificationBellProps {
  notifications: Notification[];
}

export const NotificationBell = ({ notifications }: NotificationBellProps) => {
  const [ignoredNotifications, setIgnoredNotifications] = useState<
    Notification["id"][]
  >([]);
  const [isOpen, setIsOpen] = useState(false);

  const removeNotification = (id: Notification["id"]) =>
    setIgnoredNotifications((prevIgnored) => [...prevIgnored, id]);

  const filterIgnored = (notification: Notification) =>
    !ignoredNotifications.includes(notification.id);

  const filteredNotifications = useMemo(
    () => notifications.filter(filterIgnored),
    [notifications, ignoredNotifications]
  );

  const notificationCount = filteredNotifications.length;

  useEffect(() => {
    if (filteredNotifications.length === 0) {
      setIsOpen(false);
    }
  }, [filteredNotifications]);

  return (
    <Box position="relative">
      <IconButton
        css={css`
          position: relative !important;
        `}
        py={"2"}
        variant="ghost"
        aria-label={"Notifications"}
        onClick={() => filteredNotifications.length > 0 && setIsOpen(!isOpen)}
        icon={
          <>
            <BellIcon w="28px" h="28px" color={"gray.750"} />
            {notificationCount > 0 && (
              <Box
                as={"span"}
                color={"white"}
                position={"absolute"}
                bottom={"3px"}
                right={"0px"}
                fontSize={"10px"}
                bgColor={"red"}
                borderRadius="15px"
                p={"3px"}
                minW="17px"
              >
                {notificationCount}
              </Box>
            )}
          </>
        }
      />
      {isOpen && filteredNotifications.length > 0 && (
        <Box
          position="absolute"
          border="1px solid lightgray"
          width="300px"
          maxHeight={"300px"}
          overflowY={"auto"}
          right={0}
          borderRadius="md"
          bgColor="white"
          zIndex={2}
        >
          {filteredNotifications.map((notification) => (
            <Text
              key={notification.id}
              fontSize={14}
              onClick={() => removeNotification(notification.id)}
              cursor="pointer"
              py={1}
              px={2}
              _hover={{
                bgColor: "gray.100",
              }}
            >
              {notification.message}
            </Text>
          ))}
        </Box>
      )}
    </Box>
  );
};
