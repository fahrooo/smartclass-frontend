import {
  Flex,
  Grid,
  GridItem,
  SimpleGrid,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";

const TableHeaderUsers = () => {
  const hidden = useBreakpointValue({ base: true, md: false });
  return (
    <Grid
      w="full"
      bgColor="#262A2D"
      color="white"
      rounded="lg"
      p="4"
      h={{ base: "8%", md: "10%" }}
      templateColumns={{
        base: "repeat(2, 1fr)",
        md: `repeat(6, 1fr)`,
      }}
      gap={6}
      mb={"0.5"}
    >
      <GridItem textAlign="center" alignSelf="center" hidden={hidden}>
        <Text fontSize="md" fontWeight="semibold">
          NIK
        </Text>
      </GridItem>
      <GridItem textAlign="center" alignSelf="center">
        <Text fontSize="md" fontWeight="semibold">
          NAMA
        </Text>
      </GridItem>
      <GridItem textAlign="center" alignSelf="center" hidden={hidden}>
        <Text fontSize="md" fontWeight="semibold">
          UNIT
        </Text>
      </GridItem>
      <GridItem textAlign="center" alignSelf="center">
        <Text fontSize="md" fontWeight="semibold">
          ROLE
        </Text>
      </GridItem>
      <GridItem textAlign="center" alignSelf="center" hidden={hidden}>
        <Text fontSize="md" fontWeight="semibold">
          STATUS
        </Text>
      </GridItem>
      <GridItem textAlign="center" alignSelf="center" hidden={hidden}>
        <Text fontSize="md" fontWeight="semibold">
          ACTION
        </Text>
      </GridItem>
    </Grid>
  );
};

export default TableHeaderUsers;
