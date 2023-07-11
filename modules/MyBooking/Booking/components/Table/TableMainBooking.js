import MessageNotFoundData from "@/common/utils/error/MessageNotFoundData";
import { Box, Skeleton, Stack } from "@chakra-ui/react";
import React from "react";
import TableItemBooking from "./TableItemBooking";

const TableMainBooking = ({
  items,
  isLoading,
  refetch,
  isActive,
  handleModalOpenMember,
  handleModalEditBooking,
  handleModalDeleteBooking,
  handleModalDetailBooking,
}) => {
  const now = new Date();
  const time = now.toLocaleTimeString();
  const date = now.toLocaleDateString();

  const todayWithTimeBooking =
    items?.status == 200 &&
    items?.data.filter(
      (data) =>
        data.status == "approved" &&
        new Date(data?.waktu_pemesanan).toLocaleDateString() == date &&
        data?.waktu?.time_start.substring(0, 2) == time.substring(0, 2)
    );

  return (
    <Box h={{ base: "270px", md: "270px" }} overflowY="scroll" mb={4}>
      {items?.status == 404 && isActive == true && <MessageNotFoundData />}
      {isLoading && (
        <Stack>
          <Skeleton height="50px" />
          <Skeleton height="50px" />
          <Skeleton height="50px" />
          <Skeleton height="50px" />
          <Skeleton height="50px" />
        </Stack>
      )}
      {todayWithTimeBooking.length == 0 && isActive == false && (
        <MessageNotFoundData />
      )}
      {items?.status == 200 &&
        isActive == false &&
        todayWithTimeBooking.map((item, index) => (
          <TableItemBooking
            key={index}
            item={item}
            refetch={refetch}
            handleModalOpenMember={handleModalOpenMember}
            handleModalDetailBooking={handleModalDetailBooking}
            handleModalEditBooking={handleModalEditBooking}
            handleModalDeleteBooking={handleModalDeleteBooking}
          />
        ))}
      {items?.status == 200 &&
        isActive == true &&
        items?.data.map((item, index) => (
          <TableItemBooking
            key={index}
            item={item}
            refetch={refetch}
            handleModalOpenMember={handleModalOpenMember}
            handleModalDetailBooking={handleModalDetailBooking}
            handleModalEditBooking={handleModalEditBooking}
            handleModalDeleteBooking={handleModalDeleteBooking}
          />
        ))}
    </Box>
  );
};

export default TableMainBooking;
