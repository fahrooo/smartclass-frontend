import MessageNotFoundData from "@/common/utils/error/MessageNotFoundData";
import { Box, Skeleton, Stack } from "@chakra-ui/react";
import React from "react";
import TableItemBooking from "./TableItemBooking";

const TableMainBooking = ({
  items,
  isLoading,
  refetch,
  handleModalOpenMember,
  handleModalEditBooking,
  handleModalDeleteBooking,
  handleModalDetailBooking,
}) => {
  return (
    <Box h={{ base: "280px", md: "300px" }} overflowY="scroll" mb={4}>
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
        items?.data?.map((item, index) => (
          <TableItemBooking
            key={index}
            item={item}
            refetch={refetch}
            handleModalDetailBooking={handleModalDetailBooking}
            handleModalEditBooking={handleModalEditBooking}
            handleModalDeleteBooking={handleModalDeleteBooking}
          />
        ))}
    </Box>
  );
};

export default TableMainBooking;
