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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  MdClose,
  MdDelete,
  MdDone,
  MdEdit,
  MdPeople,
  MdQrCode2,
} from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import putbooking from "@/modules/Booking/api/putbooking";
import rejectbooking from "@/modules/Booking/api/rejectbooking";
import QRCodeModal from "@/modules/Dashboard/components/Modal/QRCodeModal";
import matchcodeakses from "@/modules/Dashboard/api/matchcodeakses";
import mqttsubscribe from "@/modules/Dashboard/api/mqttsubscribe";
import mqttpublish from "@/modules/Dashboard/api/mqttpublish";

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

  const handleRejectbooking = () => {
    mutateRejectedBooking(
      {
        id: data?.data?.id,
        id_user: data?.data?.id_user,
        id_kelas: data?.data?.id_kelas,
        id_waktu: data?.data?.id_waktu,
        waktu_pemesanan: data?.data?.waktu_pemesanan,
        is_booking: true,
        status: "cancel",
        keterangan: data?.data?.keterangan,
      },
      {
        onSuccess: (res) => {
          if (res?.status === 200) {
            refetch();
            toast({
              title: "Cancel Booking Berhasil!",
              status: "success",
              duration: 5000,
              position: "top",
              isClosable: true,
            });
            onClose();
          } else {
            toast({
              title: "Cancel Booking Gagal!",
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

  const [idBooking, setIdBooking] = useState(0);

  const now = new Date();
  const time = now.toLocaleTimeString();
  const date = now.toLocaleDateString();

  const {
    isOpen: isOpenQRCode,
    onOpen: onOpenQRCode,
    onClose: onCloseQRCode,
  } = useDisclosure();

  const { mutate: mutateMatchCodeAkses, isLoading: isLoadingMatchCodeAkses } =
    useMutation(matchcodeakses);

  const handleQR = async () => {
    setIdBooking(data?.data?.classroom?.id);
    onOpenQRCode();
    const getCode = await mqttsubscribe({
      topic: `${data?.data?.classroom?.topic}/PINTU-UTAMA`,
    });
    if (getCode?.status == 200) {
      mutateMatchCodeAkses(
        {
          id: data?.data?.id_kelas,
          code_akses: getCode?.message,
        },
        {
          onSuccess: async (res) => {
            if (res?.status == 200) {
              const postOpen = await mqttpublish({
                topic: `${data?.data?.classroom?.topic}/PINTU-UTAMA`,
                message: "OPEN",
              });
              toast({
                title: "Berhasil Membuka Pintu",
                description: "Silahkan untuk segera masuk",
                status: "success",
                duration: 5000,
                position: "top",
                isClosable: true,
              });
              onCloseQRCode();
            } else {
              onCloseQRCode();
              toast({
                title: "Maaf, QR Code Salah / Kadaluwarsa",
                description: "Silahkan coba lagi",
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
              <HStack spacing={1} justifyContent="center">
                {data?.data?.status != "waiting" && (
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
                )}
                {data?.data?.status == "approved" &&
                  new Date(data?.data?.waktu_pemesanan).toLocaleDateString() ==
                    date &&
                  data?.data?.waktu?.time_start.substring(0, 2) ==
                    time.substring(0, 2) && (
                    <IconButton
                      colorScheme="purple"
                      aria-label="Call Segun"
                      icon={<MdQrCode2 />}
                      size="sm"
                      onClick={handleQR}
                    />
                  )}
              </HStack>
            </LightMode>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <QRCodeModal
        isOpen={isOpenQRCode}
        onClose={onCloseQRCode}
        id={idBooking}
      />
    </DarkMode>
  );
};

export default DetailBookingModal;
