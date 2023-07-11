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

const TableItemOperator = ({
  item,
  handleModalEditOperator,
  handleModalDeleteOperator,
  handleModalDetailOperator,
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
        py={{ base: 2, md: 2 }}
        h="max-content"
        mt={"0.5"}
        alignItems="center"
        onClick={() => {
          handleModalDetailOperator(item?.id);
        }}
        _hover={{ cursor: { base: "pointer", md: "auto" } }}
        color={"black"}
      >
        <GridItem textAlign="center" overflow="hidden">
          <Text fontSize="sm">{item?.user?.nama}</Text>
        </GridItem>
        <GridItem textAlign="center" overflow="hidden">
          <Text fontSize="sm">{item?.classroom?.nama}</Text>
        </GridItem>
        <GridItem textAlign="center" overflow="hidden" hidden={hidden}>
          <Text fontSize="sm">
            {item?.classroom?.unit == null
              ? "-"
              : item?.classroom?.unit?.nama.toUpperCase()}
          </Text>
        </GridItem>
        <GridItem textAlign="center" overflow="hidden" hidden={hidden}>
          <HStack spacing={1} justifyContent="center">
            <IconButton
              colorScheme="messenger"
              aria-label="Call Segun"
              icon={<MdEdit />}
              size="sm"
              onClick={() => {
                handleModalEditOperator(item?.id);
              }}
            />
            <IconButton
              colorScheme="red"
              aria-label="Call Segun"
              icon={<MdDelete />}
              size="sm"
              onClick={() => {
                handleModalDeleteOperator(item?.id);
              }}
            />
          </HStack>
        </GridItem>
      </Grid>
    </>
  );
};

export default TableItemOperator;
