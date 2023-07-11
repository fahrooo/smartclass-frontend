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
import { useMutation } from "@tanstack/react-query";
import { MdClose, MdDelete, MdDone, MdEdit, MdPeople } from "react-icons/md";
import putbooking from "../../api/putbooking";
import rejectbooking from "../../api/rejectbooking";

const TableItemBooking = ({
  item,
  refetch,
  handleModalOpenMember,
  handleModalEditBooking,
  handleModalDeleteBooking,
  handleModalDetailBooking,
}) => {
  const toast = useToast();
  const hidden = useBreakpointValue({ base: true, md: false });

  const { mutate: mutateApprovedBooking, isLoading: isLoadingApprovedBooking } =
    useMutation(putbooking);

  const { mutate: mutateRejectedBooking, isLoading: isLoadingRejectedBooking } =
    useMutation(putbooking);

  const { mutate: mutateRejectBooking, isLoading: isLoadingRejectBooking } =
    useMutation(rejectbooking);

  const handleApprovebooking = () => {
    mutateRejectBooking(
      {
        id_kelas: item?.id_kelas,
        id_waktu: item?.id_waktu,
        waktu_pemesanan: item?.waktu_pemesanan,
      },
      {
        onSuccess: (res) => {
          if (res?.status === 200) {
            mutateApprovedBooking(
              {
                id: item?.id,
                id_user: item?.id_user,
                id_kelas: item?.id_kelas,
                id_waktu: item?.id_waktu,
                waktu_pemesanan: item?.waktu_pemesanan,
                is_booking: true,
                status: "approved",
                keterangan: item?.keterangan,
              },
              {
                onSuccess: (res) => {
                  if (res?.status === 200) {
                    refetch();
                    toast({
                      title: "Approved Berhasil!",
                      status: "success",
                      duration: 5000,
                      position: "top",
                      isClosable: true,
                    });
                  } else {
                    toast({
                      title: "Approved Gagal!",
                      status: "error",
                      duration: 5000,
                      position: "top",
                      isClosable: true,
                    });
                  }
                },
              }
            );
          }
        },
      }
    );
  };

  const handleRejectbooking = () => {
    mutateRejectedBooking(
      {
        id: item?.id,
        id_user: item?.id_user,
        id_kelas: item?.id_kelas,
        id_waktu: item?.id_waktu,
        waktu_pemesanan: item?.waktu_pemesanan,
        is_booking: true,
        status: "rejected",
        keterangan: item?.keterangan,
      },
      {
        onSuccess: (res) => {
          if (res?.status === 200) {
            refetch();
            toast({
              title: "Rejected Berhasil!",
              status: "success",
              duration: 5000,
              position: "top",
              isClosable: true,
            });
          } else {
            toast({
              title: "Rejected Gagal!",
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

  const colorStatus = (status) => {
    if (status == "approved") {
      return "green";
    } else if (status == "waiting") {
      return "blue";
    } else if (status == "cancel") {
      return "orange";
    } else if (status == "rejected") {
      return "red";
    }
  };

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
          handleModalDetailBooking(item?.id);
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
          <Text fontSize="sm">{item?.waktu_pemesanan}</Text>
        </GridItem>
        <GridItem textAlign="center" overflow="hidden" hidden={hidden}>
          <Text fontSize="sm">{item?.waktu?.time_start.substring(0, 5)}</Text>
          <Text fontSize="sm">-</Text>
          <Text fontSize="sm">{item?.waktu?.time_end.substring(0, 5)}</Text>
        </GridItem>
        <GridItem textAlign="center" overflow="hidden" hidden={hidden}>
          <Badge colorScheme={colorStatus(item?.status)} borderRadius="lg">
            {item?.status.toUpperCase()}
          </Badge>
        </GridItem>
        <GridItem textAlign="center" overflow="hidden" hidden={hidden}>
          <Text fontSize="sm">{item?.keterangan.toUpperCase()}</Text>
        </GridItem>
        <GridItem textAlign="center" overflow="hidden" hidden={hidden}>
          {item?.status == "waiting" && (
            <HStack spacing={2} justifyContent="center">
              <IconButton
                colorScheme="green"
                aria-label="Call Segun"
                icon={<MdDone />}
                size="sm"
                variant={"outline"}
                rounded={"full"}
                isLoading={isLoadingApprovedBooking}
                onClick={() => {
                  handleApprovebooking();
                }}
              />
              <IconButton
                colorScheme="red"
                aria-label="Call Segun"
                icon={<MdClose />}
                size="sm"
                variant={"outline"}
                rounded={"full"}
                isLoading={isLoadingRejectedBooking}
                onClick={() => {
                  handleRejectbooking(item?.id);
                }}
              />
            </HStack>
          )}
          {item?.status != "waiting" && (
            <HStack spacing={1} justifyContent="center">
              <IconButton
                colorScheme="green"
                aria-label="Call Segun"
                icon={<MdPeople />}
                size="sm"
                onClick={() => {
                  handleModalOpenMember(item?.id);
                }}
                isDisabled={item?.status === "approved" ? false : true}
              />
              <IconButton
                colorScheme="messenger"
                aria-label="Call Segun"
                icon={<MdEdit />}
                size="sm"
                onClick={() => {
                  handleModalEditBooking(item?.id);
                }}
              />
              <IconButton
                colorScheme="red"
                aria-label="Call Segun"
                icon={<MdDelete />}
                size="sm"
                onClick={() => {
                  handleModalDeleteBooking(item?.id);
                }}
              />
            </HStack>
          )}
        </GridItem>
      </Grid>
    </>
  );
};

export default TableItemBooking;
