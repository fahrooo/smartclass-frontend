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

const TableItemDatastream = ({
  item,
  handleModalEditDatastream,
  handleModalDeleteDatastream,
  handleModalDetailDatastream,
}) => {
  const hidden = useBreakpointValue({ base: true, md: false });

  return (
    <>
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: `repeat(8, 1fr)`,
        }}
        gap={6}
        className="isiTabel"
        rounded="lg"
        px={4}
        py={{ base: 4, md: 2 }}
        h="max-content"
        mt={"0.5"}
        alignItems="center"
        onClick={() => {
          handleModalDetailDatastream(item?.id);
        }}
        _hover={{ cursor: { base: "pointer", md: "auto" } }}
        color={"black"}
      >
        <GridItem textAlign="center" overflow="hidden">
          <Text fontSize="sm">{item?.perangkat?.nama}</Text>
        </GridItem>
        <GridItem textAlign="center" overflow="hidden">
          <Text fontSize="sm">{item?.nama}</Text>
        </GridItem>
        <GridItem textAlign="center" overflow="hidden" hidden={hidden}>
          <Text fontSize="sm">{item?.turn_on}</Text>
        </GridItem>
        <GridItem textAlign="center" overflow="hidden" hidden={hidden}>
          <Text fontSize="sm">{item?.turn_off}</Text>
        </GridItem>
        <GridItem textAlign="center" overflow="hidden" hidden={hidden}>
          <Text fontSize="sm">
            {item?.default_value == null ? "-" : item?.default_value}
          </Text>
        </GridItem>
        <GridItem textAlign="center" overflow="hidden" hidden={hidden}>
          <Text fontSize="sm">
            {item?.max_value == null ? "-" : item?.max_value}
          </Text>
        </GridItem>
        <GridItem textAlign="center" overflow="hidden" hidden={hidden}>
          <Text fontSize="sm">
            {item?.min_value == null ? "-" : item?.min_value}
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
                handleModalEditDatastream(item?.id);
              }}
            />
            <IconButton
              colorScheme="red"
              aria-label="Call Segun"
              icon={<MdDelete />}
              size="sm"
              onClick={() => {
                handleModalDeleteDatastream(item?.id);
              }}
            />
          </HStack>
        </GridItem>
      </Grid>
    </>
  );
};

export default TableItemDatastream;
