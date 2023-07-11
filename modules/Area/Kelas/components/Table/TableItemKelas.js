import {
  Grid,
  GridItem,
  HStack,
  IconButton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { MdDelete, MdEdit } from "react-icons/md";

const TableItemKelas = ({
  item,
  handleModalDetailKelas,
  handleModalEditKelas,
  handleModalDeleteKelas,
}) => {
  const hidden = useBreakpointValue({ base: true, md: false });

  return (
    <>
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: `repeat(4, 1fr)`,
        }}
        gap={6}
        className="isiTabel"
        rounded="lg"
        px={4}
        py={1}
        h={{ base: "60px", md: "max-content" }}
        mt={"0.5"}
        alignItems="center"
        color={"black"}
        onClick={() => {
          handleModalDetailKelas(item?.id);
        }}
      >
        <GridItem textAlign="center" overflow="hidden">
          <Text fontSize="sm">{item?.nama}</Text>
        </GridItem>
        <GridItem textAlign="center" overflow="hidden">
          <Text fontSize="sm">{item?.topic}</Text>
        </GridItem>
        <GridItem textAlign="center" overflow="hidden" hidden={hidden}>
          <Text fontSize="sm">{item?.unit?.nama}</Text>
        </GridItem>
        <GridItem textAlign="center" overflow="hidden" hidden={hidden}>
          <HStack spacing={1} justifyContent="center">
            <IconButton
              colorScheme="messenger"
              aria-label="Call Segun"
              icon={<MdEdit />}
              size="sm"
              onClick={() => {
                handleModalEditKelas(item?.id);
              }}
            />
            <IconButton
              colorScheme="red"
              aria-label="Call Segun"
              icon={<MdDelete />}
              size="sm"
              onClick={() => {
                handleModalDeleteKelas(item?.id);
              }}
            />
          </HStack>
        </GridItem>
      </Grid>
    </>
  );
};

export default TableItemKelas;
