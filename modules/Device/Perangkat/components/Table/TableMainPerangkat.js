import MessageNotFoundData from "@/common/utils/error/MessageNotFoundData";
import { Box, Skeleton, Stack } from "@chakra-ui/react";
import React from "react";
import TableItemPerangkat from "./TableItemPerangkat";

const TableMainPerangkat = ({
  items,
  isLoading,
  refetch,
  handleModalEditPerangkatKelas,
  handleModalDeletePerangkatKelas,
  handleModalDetailPerangkatKelas,
}) => {
  return (
    <Box h={{ base: "270px", md: "270px" }} overflowY="scroll" mb={3}>
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
          <TableItemPerangkat
            key={index}
            item={item}
            refetch={refetch}
            handleModalDetailPerangkatKelas={handleModalDetailPerangkatKelas}
            handleModalEditPerangkatKelas={handleModalEditPerangkatKelas}
            handleModalDeletePerangkatKelas={handleModalDeletePerangkatKelas}
          />
        ))}
    </Box>
  );
};

export default TableMainPerangkat;
