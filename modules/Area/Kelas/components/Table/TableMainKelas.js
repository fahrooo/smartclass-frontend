import MessageNotFoundData from "@/common/utils/error/MessageNotFoundData";
import { Box, Skeleton, Stack } from "@chakra-ui/react";
import React from "react";
import TableItemKelas from "./TableItemKelas";

const TableMainKelas = ({
  items,
  isLoading,
  refetch,
  handleModalDetailKelas,
  handleModalEditKelas,
  handleModalDeleteKelas,
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
          <TableItemKelas
            key={index}
            item={item}
            refetch={refetch}
            handleModalDetailKelas={handleModalDetailKelas}
            handleModalEditKelas={handleModalEditKelas}
            handleModalDeleteKelas={handleModalDeleteKelas}
          />
        ))}
    </Box>
  );
};

export default TableMainKelas;
