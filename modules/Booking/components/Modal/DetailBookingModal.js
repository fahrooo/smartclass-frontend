import {
  Badge,
  Button,
  DarkMode,
  HStack,
  IconButton,
  LightMode,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { MdClose, MdDelete, MdDone, MdEdit, MdPeople } from "react-icons/md";
import rejectbooking from "../../api/rejectbooking";
import { useMutation } from "@tanstack/react-query";
import putbooking from "../../api/putbooking";

const DetailBookingModal = ({
  isOpen,
  onClose,
  refetch,
  data,
  handleModalOpenMember,
  handleModalEditBooking,
  handleModalDeleteBooking,
}) => {
  const toast = useToast();

  const { mutate: mutateApprovedBooking, isLoading: isLoadingApprovedBooking } =
    useMutation(putbooking);

  const { mutate: mutateRejectedBooking, isLoading: isLoadingRejectedBooking } =
    useMutation(putbooking);

  const { mutate: mutateRejectBooking, isLoading: isLoadingRejectBooking } =
    useMutation(rejectbooking);

  const handleApprovebooking = () => {
    mutateRejectBooking(
      {
        id_kelas: data?.data?.id_kelas,
        id_waktu: data?.data?.id_waktu,
        waktu_pemesanan: data?.data?.waktu_pemesanan,
      },
      {
        onSuccess: (res) => {
          if (res?.status === 200) {
            mutateApprovedBooking(
              {
                id: data?.data?.id,
                id_user: data?.data?.id_user,
                id_kelas: data?.data?.id_kelas,
                id_waktu: data?.data?.id_waktu,
                waktu_pemesanan: data?.data?.waktu_pemesanan,
                is_booking: true,
                status: "approved",
                keterangan: data?.data?.keterangan,
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
                    onClose();
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
        id: data?.data?.id,
        id_user: data?.data?.id_user,
        id_kelas: data?.data?.id_kelas,
        id_waktu: data?.data?.id_waktu,
        waktu_pemesanan: data?.data?.waktu_pemesanan,
        is_booking: true,
        status: "rejected",
        keterangan: data?.data?.keterangan,
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
            onClose();
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
    <DarkMode>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent m={2}>
          <ModalHeader color="white">DETAIL BOOKING</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody color="white">
            <HStack>
              <Text w="30%">NAMA</Text>
              <Text>: {data?.data?.user?.nama}</Text>
            </HStack>
            <HStack>
              <Text w="30%">KELAS</Text>
              <Text>: {data?.data?.classroom?.nama}</Text>
            </HStack>
            <HStack>
              <Text w="30%">UNIT</Text>
              <Text>: {data?.data?.classroom?.unit?.nama.toUpperCase()}</Text>
            </HStack>
            <HStack>
              <Text w="30%">TANGGAL</Text>
              <Text>: {data?.data?.waktu_pemesanan}</Text>
            </HStack>
            <HStack>
              <Text w="30%">WAKTU</Text>
              <Text>
                : {data?.data?.waktu?.time_start.substring(0, 5)} -{" "}
                {data?.data?.waktu?.time_end.substring(0, 5)}
              </Text>
            </HStack>
            <HStack>
              <Text w="30%">STATUS</Text>
              <Text>
                :{" "}
                <Badge
                  colorScheme={colorStatus(data?.data?.status)}
                  borderRadius="lg"
                >
                  {data?.data?.status.toUpperCase()}
                </Badge>
              </Text>
            </HStack>
            <HStack>
              <Text w="30%">KETERANGAN</Text>
              <Text>: {data?.data?.keterangan.toUpperCase()}</Text>
            </HStack>
          </ModalBody>
          <ModalFooter>
            <LightMode>
              {data?.data?.status == "waiting" && (
                <HStack spacing={2} justifyContent="center">
                  <IconButton
                    colorScheme="green"
                    aria-label="Call Segun"
                    icon={<MdDone />}
                    size="sm"
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
                    rounded={"full"}
                    isLoading={isLoadingRejectedBooking}
                    onClick={() => {
                      handleRejectbooking();
                    }}
                  />
                </HStack>
              )}
              {data?.data?.status != "waiting" && (
                <HStack spacing={1} justifyContent="center">
                  <IconButton
                    colorScheme="green"
                    aria-label="Call Segun"
                    icon={<MdPeople />}
                    size="sm"
                    onClick={() => {
                      handleModalOpenMember(data?.data?.id);
                    }}
                    isDisabled={
                      data?.data?.status === "approved" ? false : true
                    }
                  />
                  <IconButton
                    colorScheme="messenger"
                    aria-label="Call Segun"
                    icon={<MdEdit />}
                    size="sm"
                    onClick={() => {
                      handleModalEditBooking(data?.data?.id);
                    }}
                  />
                  <IconButton
                    colorScheme="red"
                    aria-label="Call Segun"
                    icon={<MdDelete />}
                    size="sm"
                    onClick={() => {
                      handleModalDeleteBooking(data?.data?.id);
                    }}
                  />
                </HStack>
              )}
            </LightMode>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </DarkMode>
  );
};

export default DetailBookingModal;
