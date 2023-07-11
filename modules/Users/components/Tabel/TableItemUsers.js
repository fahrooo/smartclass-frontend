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

const TableItemUsers = ({
  item,
  handleModalEditUser,
  handleModalDeleteUser,
  handleModalDetailUser,
  disabledUnit,
}) => {
  const hidden = useBreakpointValue({ base: true, md: false });

  return (
    <>
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: `repeat(6, 1fr)`,
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
          handleModalDetailUser(item?.id);
        }}
        _hover={{ cursor: { base: "pointer", md: "auto" } }}
        color={"black"}
      >
        <GridItem textAlign="center" overflow="hidden" hidden={hidden}>
          <Text fontSize="sm">{item?.nik}</Text>
        </GridItem>
        <GridItem textAlign="center" overflow="hidden">
          <Text fontSize="sm">{item?.nama}</Text>
        </GridItem>
        <GridItem textAlign="center" overflow="hidden" hidden={hidden}>
          <Text fontSize="sm">
            {item?.unit == null ? "-" : item?.unit?.nama.toUpperCase()}
          </Text>
        </GridItem>
        <GridItem textAlign="center" overflow="hidden">
          <Text fontSize="sm">{item?.role.toUpperCase()}</Text>
        </GridItem>
        <GridItem textAlign="center" overflow="hidden" hidden={hidden}>
          {item?.is_active === true ? (
            <Badge colorScheme="green">Active</Badge>
          ) : (
            <Badge colorScheme="red">InActive</Badge>
          )}
        </GridItem>
        <GridItem textAlign="center" overflow="hidden" hidden={hidden}>
          <HStack spacing={1} justifyContent="center">
            <IconButton
              colorScheme="messenger"
              aria-label="Call Segun"
              icon={<MdEdit />}
              size="sm"
              onClick={() => {
                handleModalEditUser(item?.id);
              }}
              isDisabled={
                (disabledUnit == true && item?.role == "super admin") ||
                (disabledUnit == true && item?.role == "admin")
                  ? true
                  : false
              }
            />
            <IconButton
              colorScheme="red"
              aria-label="Call Segun"
              icon={<MdDelete />}
              size="sm"
              onClick={() => {
                handleModalDeleteUser(item?.id);
              }}
              isDisabled={
                (disabledUnit == true && item?.role == "super admin") ||
                (disabledUnit == true && item?.role == "admin")
                  ? true
                  : false
              }
            />
          </HStack>
        </GridItem>
      </Grid>
    </>
  );
};

export default TableItemUsers;
