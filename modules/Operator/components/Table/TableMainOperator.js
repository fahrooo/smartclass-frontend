import MessageNotFoundData from "@/common/utils/error/MessageNotFoundData";
import { Box, Skeleton, Stack } from "@chakra-ui/react";
import React from "react";
import TableItemOperator from "./TableItemOperator";

const TableMainOperator = ({
  items,
  isLoading,
  refetch,
  handleModalEditOperator,
  handleModalDeleteOperator,
  handleModalDetailOperator,
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
          <TableItemOperator
            key={index}
            item={item}
            refetch={refetch}
            handleModalDetailOperator={handleModalDetailOperator}
            handleModalEditOperator={handleModalEditOperator}
            handleModalDeleteOperator={handleModalDeleteOperator}
          />
        ))}
    </Box>
  );
};

export default TableMainOperator;
