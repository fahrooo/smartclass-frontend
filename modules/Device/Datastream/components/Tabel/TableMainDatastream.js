import MessageNotFoundData from "@/common/utils/error/MessageNotFoundData";
import { Box, Skeleton, Stack } from "@chakra-ui/react";
import React from "react";
import TableItemDatastream from "./TableItemDatastream";

const TableMainDatastream = ({
  items,
  isLoading,
  refetch,
  handleModalEditDatastream,
  handleModalDeleteDatastream,
  handleModalDetailDatastream,
}) => {
  return (
    <Box h={{ base: "320px", md: "270px" }} overflowY="scroll" mb={3}>
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
          <TableItemDatastream
            key={index}
            item={item}
            refetch={refetch}
            handleModalDetailDatastream={handleModalDetailDatastream}
            handleModalEditDatastream={handleModalEditDatastream}
            handleModalDeleteDatastream={handleModalDeleteDatastream}
          />
        ))}
    </Box>
  );
};

export default TableMainDatastream;
