import MessageNotFoundData from "@/common/utils/error/MessageNotFoundData";
import { Box, Skeleton, Stack } from "@chakra-ui/react";
import React from "react";
import TableItemUnits from "./TableItemUnits";

const TableMainUnits = ({
  items,
  isLoading,
  refetch,
  handleModalEditUnit,
  handleModalDeleteUnit,
}) => {
  return (
    <Box h={{ base: "360px", md: "270px" }} overflowY="scroll" mb={3}>
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
          <TableItemUnits
            key={index}
            item={item}
            refetch={refetch}
            handleModalEditUnit={handleModalEditUnit}
            handleModalDeleteUnit={handleModalDeleteUnit}
          />
        ))}
    </Box>
  );
};

export default TableMainUnits;
