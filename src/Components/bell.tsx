import { BellIcon } from "@chakra-ui/icons";
import { Box, IconButton } from "@chakra-ui/react";
import { css } from "@emotion/react";

export const NotificationBell = ({ count }: { count: number }) => {
  return (
    <IconButton
      css={css`
        position: relative !important;
      `}
      py={"2"}
      variant="ghost"
      aria-label={"Notifications"}
      icon={
        <>
          <BellIcon w="28px" h="28px" color={"gray.750"} />
          {count > 0 && (
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
              {count}
            </Box>
          )}
        </>
      }
    />
  );
};
