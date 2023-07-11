import MessageNotFoundData from "@/common/utils/error/MessageNotFoundData";
import { Box, Skeleton, Stack } from "@chakra-ui/react";
import React from "react";
import TableItemOperator from "./TableItemMember";
import TableItemMember from "./TableItemMember";

const TableMainMember = ({
  items,
  isLoading,
  refetch,
  handleModalDeleteMember,
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
        items?.data.map((item, index) => (
          <TableItemMember
            key={index}
            item={item}
            refetch={refetch}
            handleModalDeleteMember={handleModalDeleteMember}
          />
        ))}
    </Box>
  );
};

export default TableMainMember;
