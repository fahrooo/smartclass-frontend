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
import deletemember from "../../api/deleteoperator";

const DeleteMemberModal = ({ onClose, isOpen, refetch, data, idMember }) => {
  const toast = useToast();

  const [id, setId] = useState("");
  const [nama, setNama] = useState("");

  const { mutate: mutateDeleteMember, isLoading: isLoadingDeleteMember } =
    useMutation(deletemember);

  useEffect(() => {
    if (data?.status == 200) {
      setId(data?.data?.id);
      setNama(data?.data?.nama);
    }
  }, [data]);

  const handleDeleteMember = (e) => {
    e.preventDefault();

    mutateDeleteMember(
      {
        id: idMember,
      },
      {
        onSuccess: (res) => {
          if (res?.status === 200) {
            refetch();
            onClose();
            toast({
              title: "Delete Member Berhasil!",
              status: "success",
              duration: 5000,
              position: "top",
              isClosable: true,
            });
          } else {
            toast({
              title: "Delete Member Gagal!",
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
          <ModalHeader>DELETE MEMBER</ModalHeader>
          <ModalCloseButton />
          <LightMode>
            <form onSubmit={handleDeleteMember}>
              <ModalBody>
                <Text>
                  Apakah anda yakin ingin menghapus {nama} sebagai member?
                </Text>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  colorScheme={"red"}
                  isLoading={isLoadingDeleteMember}
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

export default DeleteMemberModal;
