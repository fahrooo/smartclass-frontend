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
import deletekelas from "../../api/deletekelas";

const DeleteKelasModal = ({
  onClose,
  isOpen,
  refetch,
  data,
  onCloseDetail,
}) => {
  const toast = useToast();

  const [id, setId] = useState("");
  const [nama, setNama] = useState("");
  const [unit, setUnit] = useState("");

  const { mutate: mutateDeleteKelas, isLoading: isLoadingDeleteKelas } =
    useMutation(deletekelas);

  useEffect(() => {
    if (data?.status == 200) {
      setId(data?.data?.id);
      setNama(data?.data?.nama);
      setUnit(data?.data?.unit?.nama);
    }
  }, [data]);

  const handleDeleteKelas = (e) => {
    e.preventDefault();

    mutateDeleteKelas(
      {
        id: id,
      },
      {
        onSuccess: (res) => {
          if (res?.status === 200) {
            refetch();
            onClose();
            onCloseDetail();
            toast({
              title: "Delete Kelas Berhasil!",
              status: "success",
              duration: 5000,
              position: "top",
              isClosable: true,
            });
          } else {
            toast({
              title: "Delete Kelas Gagal!",
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
          <ModalHeader>DELETE KELAS</ModalHeader>
          <ModalCloseButton />
          <LightMode>
            <form onSubmit={handleDeleteKelas}>
              <ModalBody>
                <Text>
                  Apakah anda yakin ingin menghapus {nama} dari {unit}?
                </Text>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  colorScheme={"red"}
                  isLoading={isLoadingDeleteKelas}
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

export default DeleteKelasModal;
