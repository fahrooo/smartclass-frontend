import {
  Box,
  Button,
  DarkMode,
  FormControl,
  FormLabel,
  Input,
  LightMode,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Text,
  Textarea,
  Tooltip,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useAuthUserStore from "@/common/hooks/store/useAuthUserStore ";
import postbooking from "@/modules/Booking/api/postbooking";
import getwaktubooking from "../../api/getwaktubooking";

const TambahBookingModal = ({
  onClose,
  isOpen,
  refetch,
  idKelas,
  kelas,
  waktuPemesanan,
}) => {
  const toast = useToast();
  const formTambahBooking = useRef();

  const session = useAuthUserStore((state) => state.session);

  const [disabled, setDisabled] = useState(true);

  const [waktu, setWaktu] = useState("");
  const [keterangan, setKeterangan] = useState("");

  const { mutate: mutatePostBooking, isLoading: isLoadingPostBooking } =
    useMutation(postbooking);

  const { data: resWaktu, isLoading: isLoadingWaktu } = getwaktubooking({
    id_kelas: Number(idKelas),
    waktu_pemesanan: waktuPemesanan,
  });

  const [focusKeterangan, setFocusKeterangan] = useState(false);

  const isErrorKeterangan = focusKeterangan === true && keterangan === "";

  useEffect(() => {
    if (waktu != "" && keterangan != "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [waktu, keterangan]);

  const handleTambahBooking = (e) => {
    e.preventDefault();

    mutatePostBooking(
      {
        id_user: session.data?.id,
        id_kelas: idKelas,
        id_waktu: waktu,
        waktu_pemesanan: waktuPemesanan,
        is_booking: true,
        status: "waiting",
        keterangan: keterangan,
      },
      {
        onSuccess: (res) => {
          if (res?.status === 200) {
            refetch();
            toast({
              title: "Tambah Booking Berhasil!",
              status: "success",
              duration: 5000,
              position: "top",
              isClosable: true,
            });
            onClose();
            formTambahBooking.current?.reset();
            setWaktu("");
            setKeterangan("");
            setFocusKeterangan(false);
          } else {
            toast({
              title: "Tambah Booking Gagal!",
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

  const now = new Date();
  const time = now.toLocaleTimeString();
  const date = now.toLocaleDateString();

  const disabledWaktuBooking = (
    tglPesan,
    tglNow,
    waktuMulai,
    waktuNow,
    isBooking
  ) => {
    if (tglPesan.toLocaleDateString() == tglNow) {
      if (waktuMulai.substring(0, 2) < waktuNow.substring(0, 2)) {
        return true;
      } else if (isBooking == true) {
        return true;
      } else {
        return false;
      }
    } else {
      if (isBooking == true) {
        return true;
      } else {
        return false;
      }
    }
  };

  return (
    <DarkMode>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent color="white" m={2}>
          <ModalHeader>BOOKING</ModalHeader>
          <ModalCloseButton />
          <LightMode>
            <form ref={formTambahBooking} onSubmit={handleTambahBooking}>
              <ModalBody>
                <Text fontSize={"lg"} color={"white"} mb={4}>
                  Room : {kelas.toUpperCase()}
                </Text>
                <VStack spacing={4}>
                  <FormControl isInvalid={isErrorKeterangan}>
                    <FormLabel fontSize="15px" color="#FFFFFF" fontWeight="400">
                      Pilih Waktu
                    </FormLabel>
                    <SimpleGrid columns={3} spacing={2}>
                      {resWaktu?.status == 200 &&
                        resWaktu?.data.map((item, index) => (
                          <Button
                            key={index}
                            variant={"solid"}
                            bgColor={item?.id == waktu ? "white" : "gray.600"}
                            color={item?.id == waktu ? "black" : "white"}
                            size={"sm"}
                            borderRadius={"full"}
                            _hover={{ color: "black", bgColor: "white" }}
                            isDisabled={disabledWaktuBooking(
                              waktuPemesanan,
                              date,
                              item?.time_start,
                              time,
                              item?.is_booking
                            )}
                            onClick={() => {
                              setWaktu(item?.id);
                            }}
                          >
                            {item?.time_start} - {item?.time_end}
                          </Button>
                        ))}
                    </SimpleGrid>
                  </FormControl>
                  <FormControl isInvalid={isErrorKeterangan}>
                    <FormLabel fontSize="15px" color="#FFFFFF" fontWeight="400">
                      Keterangan
                    </FormLabel>
                    <Tooltip
                      label="Keterangan harus diisi"
                      placement="bottom-end"
                      bg="red.600"
                      isOpen={isErrorKeterangan}
                    >
                      <Textarea
                        placeholder="Keterangan penggunaan kelas"
                        resize={"none"}
                        onChange={(e) => {
                          setKeterangan(e.target.value);
                        }}
                        onBlur={() => {
                          setFocusKeterangan(true);
                        }}
                        value={keterangan}
                      />
                    </Tooltip>
                  </FormControl>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  colorScheme={"messenger"}
                  isLoading={isLoadingPostBooking}
                  isDisabled={disabled}
                >
                  Submit
                </Button>
              </ModalFooter>
            </form>
          </LightMode>
        </ModalContent>
      </Modal>
    </DarkMode>
  );
};

export default TambahBookingModal;
