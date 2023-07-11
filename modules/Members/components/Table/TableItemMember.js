import {
  Badge,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";

const TableItemMember = ({ item, handleModalDeleteMember }) => {
  const hidden = useBreakpointValue({ base: true, md: false });

  return (
    <>
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: `repeat(2, 1fr)`,
        }}
        gap={6}
        className="isiTabel"
        rounded="lg"
        px={4}
        py={{ base: 2, md: 2 }}
        h="max-content"
        mt={"0.5"}
        alignItems="center"
        _hover={{ cursor: { base: "pointer", md: "auto" } }}
        color={"black"}
      >
        <GridItem textAlign="center" overflow="hidden">
          <Text fontSize="sm">{item?.user?.nama}</Text>
        </GridItem>
        <GridItem textAlign="center" overflow="hidden">
          <HStack spacing={1} justifyContent="center">
            <IconButton
              colorScheme="red"
              aria-label="Call Segun"
              icon={<MdDelete />}
              size="sm"
              onClick={() => {
                handleModalDeleteMember(item?.user?.id, item?.id);
              }}
            />
          </HStack>
        </GridItem>
      </Grid>
    </>
  );
};

export default TableItemMember;
