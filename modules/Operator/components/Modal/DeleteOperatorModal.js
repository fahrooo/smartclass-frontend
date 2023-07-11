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
import deleteoperator from "../../api/deleteoperator";

const DeleteOperatorModal = ({
  onClose,
  isOpen,
  refetch,
  data,
  onCloseDetailOperator,
}) => {
  const toast = useToast();

  const [id, setId] = useState("");
  const [operator, setOperator] = useState("");
  const [kelas, setKelas] = useState("");
  const [unit, setUnit] = useState("");

  const { mutate: mutateDeleteOperator, isLoading: isLoadingDeleteOperator } =
    useMutation(deleteoperator);

  useEffect(() => {
    if (data?.status == 200) {
      setId(data?.data?.id);
      setOperator(data?.data?.user?.nama);
      setKelas(data?.data?.classroom?.nama);
      setUnit(data?.data?.classroom?.unit?.nama);
    }
  }, [data]);

  const handleDeleteOperator = (e) => {
    e.preventDefault();

    mutateDeleteOperator(
      {
        id: id,
      },
      {
        onSuccess: (res) => {
          if (res?.status === 200) {
            refetch();
            onClose();
            onCloseDetailOperator();
            toast({
              title: "Delete Operator Berhasil!",
              status: "success",
              duration: 5000,
              position: "top",
              isClosable: true,
            });
          } else {
            toast({
              title: "Delete Operator Gagal!",
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
          <ModalHeader>DELETE OPERATOR</ModalHeader>
          <ModalCloseButton />
          <LightMode>
            <form onSubmit={handleDeleteOperator}>
              <ModalBody>
                <Text>
                  Apakah anda yakin ingin menghapus {operator} sebagai operator{" "}
                  {kelas} unit {unit}?
                </Text>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  colorScheme={"red"}
                  isLoading={isLoadingDeleteOperator}
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

export default DeleteOperatorModal;
