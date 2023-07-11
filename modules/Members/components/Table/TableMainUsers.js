import MessageNotFoundData from "@/common/utils/error/MessageNotFoundData";
import { Box, Skeleton, Stack } from "@chakra-ui/react";
import React from "react";
import TableItemUsers from "./TableItemUsers";

const TableMainUsers = ({ items, isLoading, refetch, idBooking }) => {
  return (
    <Box h={{ base: "290px", md: "290px" }} overflowY="scroll" mb={3}>
      {items?.status == 404 && <MessageNotFoundData />}
      {isLoading && (
        <Stack>
          <Skeleton height="50px" />
          <Skeleton height="50px" />
          <Skeleton height="50px" />
          <Skeleton height="50px" />
          <Skeleton height="50px" />
        </Stack>
      )}
      {items?.status == 200 &&
        items?.data.map((item, index) => (
          <TableItemUsers
            key={index}
            item={item}
            refetch={refetch}
            idBooking={idBooking}
          />
        ))}
    </Box>
  );
};

export default TableMainUsers;
