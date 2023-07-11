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
import deleteunits from "../../api/deleteunits";

const DeleteUnitModal = ({ onClose, isOpen, refetch, data }) => {
  const toast = useToast();

  const [id, setId] = useState("");
  const [nama, setNama] = useState("");

  const { mutate: mutateDeleteUnit, isLoading: isLoadingDeleteUnit } =
    useMutation(deleteunits);

  useEffect(() => {
    if (data?.status == 200) {
      setId(data?.data?.id);
      setNama(data?.data?.nama);
    }
  }, [data]);

  const handleDeleteUnit = (e) => {
    e.preventDefault();

    mutateDeleteUnit(
      {
        id: id,
      },
      {
        onSuccess: (res) => {
          if (res?.status === 200) {
            refetch();
            onClose();
            toast({
              title: "Delete Unit Berhasil!",
              status: "success",
              duration: 5000,
              position: "top",
              isClosable: true,
            });
          } else {
            toast({
              title: "Delete Unit Gagal!",
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
          <ModalHeader>DELETE UNIT</ModalHeader>
          <ModalCloseButton />
          <LightMode>
            <form onSubmit={handleDeleteUnit}>
              <ModalBody>
                <Text>Apakah anda yakin ingin menghapus unit {nama}?</Text>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  colorScheme={"red"}
                  isLoading={isLoadingDeleteUnit}
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

export default DeleteUnitModal;
