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
import deleteperangkatkelas from "../../api/deletepeerangkatkelas";

const DeletePerangkatModal = ({
  onClose,
  isOpen,
  refetch,
  data,
  onCloseDetailPerangkatKelas,
}) => {
  const toast = useToast();

  const [id, setId] = useState("");
  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("");
  const [unit, setUnit] = useState("");

  const {
    mutate: mutateDeletePerangkatKelas,
    isLoading: isLoadingDeletePerangkatKelas,
  } = useMutation(deleteperangkatkelas);

  useEffect(() => {
    if (data?.status == 200) {
      setId(data?.data?.id);
      setNama(data?.data?.nama);
      setKelas(data?.data?.classroom?.nama);
      setUnit(data?.data?.classroom?.unit?.nama);
    }
  }, [data]);

  const handleDeletePerangkat = (e) => {
    e.preventDefault();

    mutateDeletePerangkatKelas(
      {
        id: id,
      },
      {
        onSuccess: (res) => {
          if (res?.status === 200) {
            refetch();
            onClose();
            onCloseDetailPerangkatKelas();
            toast({
              title: "Delete Device Berhasil!",
              status: "success",
              duration: 5000,
              position: "top",
              isClosable: true,
            });
          } else {
            toast({
              title: "Delete Device Gagal!",
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
          <ModalHeader>DELETE DEVICE</ModalHeader>
          <ModalCloseButton />
          <LightMode>
            <form onSubmit={handleDeletePerangkat}>
              <ModalBody>
                <Text>
                  Apakah anda yakin ingin menghapus {nama} dari {kelas} unit{" "}
                  {unit}?
                </Text>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  colorScheme={"red"}
                  isLoading={isLoadingDeletePerangkatKelas}
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

export default DeletePerangkatModal;
