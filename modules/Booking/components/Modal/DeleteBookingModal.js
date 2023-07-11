import {
  Button,
  DarkMode,
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
import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import deletebooking from "../../api/deletebooking";

const DeleteBookingModal = ({
  onClose,
  isOpen,
  refetch,
  data,
  onCloseDetailBooking,
}) => {
  const toast = useToast();

  const [id, setId] = useState("");
  const [user, setUser] = useState("");
  const [unit, setUnit] = useState("");
  const [kelas, setKelas] = useState("");
  const [waktuMulai, setWaktuMulai] = useState("");
  const [waktuSelesai, setWaktuSelesai] = useState("");
  const [waktuPemesanan, setWaktuPemesanan] = useState("");

  const { mutate: mutateDeleteBooking, isLoading: isLoadingDeleteBooking } =
    useMutation(deletebooking);

  useEffect(() => {
    if (data?.status == 200) {
      setId(data?.data?.id);
      setUser(data?.data?.user?.nama);
      setUnit(data?.data?.classroom?.unit?.nama);
      setKelas(data?.data?.classroom?.nama);
      setWaktuPemesanan(data?.data?.waktu_pemesanan);
      setWaktuMulai(data?.data?.waktu?.time_start);
      setWaktuSelesai(data?.data?.waktu?.time_end);
    }
  }, [data]);

  const handleDeleteBooking = (e) => {
    e.preventDefault();

    mutateDeleteBooking(
      {
        id: id,
      },
      {
        onSuccess: (res) => {
          if (res?.status === 200) {
            refetch();
            onClose();
            onCloseDetailBooking();
            toast({
              title: "Delete Booking Berhasil!",
              status: "success",
              duration: 5000,
              position: "top",
              isClosable: true,
            });
          } else {
            toast({
              title: "Delete Booking Gagal!",
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
    <DarkMode>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent color="white" m={2}>
          <ModalHeader>DELETE BOOKING</ModalHeader>
          <ModalCloseButton />
          <LightMode>
            <form onSubmit={handleDeleteBooking}>
              <ModalBody>
                <Text>
                  Apakah anda yakin ingin menghapus booking atas nama {user} di{" "}
                  {kelas} unit {unit} pada tanggal {waktuPemesanan} pukul{" "}
                  {waktuMulai.substring(0, 5)} - {waktuSelesai.substring(0, 5)}?
                </Text>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  colorScheme={"red"}
                  isLoading={isLoadingDeleteBooking}
                >
                  Delete
                </Button>
              </ModalFooter>
            </form>
          </LightMode>
        </ModalContent>
      </Modal>
    </DarkMode>
  );
};

export default DeleteBookingModal;
