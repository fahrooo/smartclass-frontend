import {
  Badge,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Text,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import postmember from "../../api/postmember";
import { useMutation } from "@tanstack/react-query";

const TableItemUsers = ({ item, refetch, idBooking }) => {
  const toast = useToast();

  const { mutate: mutatePostMember, isLoading: isLoadingPostMember } =
    useMutation(postmember);

  const handleTambahMember = (idUser) => {
    mutatePostMember(
      {
        id_user: idUser,
        id_booking: idBooking,
      },
      {
        onSuccess: (res) => {
          if (res?.status === 200) {
            refetch();
            toast({
              title: "Tambah Member Berhasil!",
              status: "success",
              duration: 5000,
              position: "top",
              isClosable: true,
            });
          } else {
            toast({
              title: "Tambah Member Gagal!",
              description: "User sudah menjadi member booking tersebut",
              status: "error",
              duration: 5000,
              position: "top",
              isClosable: true,
            });
          }
        },
      }
    );
  };

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
          <Text fontSize="sm">{item?.nama}</Text>
        </GridItem>
        <GridItem textAlign="center" overflow="hidden">
          <HStack spacing={1} justifyContent="center">
            <IconButton
              colorScheme="green"
              aria-label="Call Segun"
              icon={<MdAdd />}
              size="sm"
              onClick={() => {
                handleTambahMember(item?.id);
              }}
              isLoading={isLoadingPostMember}
            />
          </HStack>
        </GridItem>
      </Grid>
    </>
  );
};

export default TableItemUsers;
