import {
  Badge,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { MdDelete, MdEdit } from "react-icons/md";

const TableItemPerangkat = ({
  item,
  handleModalEditPerangkatKelas,
  handleModalDeletePerangkatKelas,
  handleModalDetailPerangkatKelas,
}) => {
  const hidden = useBreakpointValue({ base: true, md: false });

  return (
    <>
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: `repeat(5, 1fr)`,
        }}
        gap={6}
        className="isiTabel"
        rounded="lg"
        px={4}
        py={{ base: 3, md: 1 }}
        h="max-content"
        mt={"0.5"}
        alignItems="center"
        onClick={() => {
          handleModalDetailPerangkatKelas(item?.id);
        }}
        _hover={{ cursor: { base: "pointer", md: "auto" } }}
        color={"black"}
      >
        <GridItem textAlign="center" overflow="hidden">
          <Text fontSize="sm">{item?.nama}</Text>
        </GridItem>
        <GridItem textAlign="center" overflow="hidden" hidden={hidden}>
          <Text fontSize="sm">{item?.datastream?.nama}</Text>
        </GridItem>
        <GridItem textAlign="center" overflow="hidden">
          <Text fontSize="sm">{item?.classroom?.nama}</Text>
        </GridItem>
        <GridItem textAlign="center" overflow="hidden" hidden={hidden}>
          <Text fontSize="sm">{item?.classroom?.unit?.nama}</Text>
        </GridItem>
        <GridItem textAlign="center" overflow="hidden" hidden={hidden}>
          <HStack spacing={1} justifyContent="center">
            <IconButton
              colorScheme="messenger"
              aria-label="Call Segun"
              icon={<MdEdit />}
              size="sm"
              onClick={() => {
                handleModalEditPerangkatKelas(item?.id);
              }}
            />
            <IconButton
              colorScheme="red"
              aria-label="Call Segun"
              icon={<MdDelete />}
              size="sm"
              onClick={() => {
                handleModalDeletePerangkatKelas(item?.id);
              }}
            />
          </HStack>
        </GridItem>
      </Grid>
    </>
  );
};

export default TableItemPerangkat;
