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
import deletedatastream from "../../api/deletedatastream";

const DeleteDataStreamModal = ({
  onClose,
  isOpen,
  refetch,
  data,
  onCloseDetailDatastream,
}) => {
  const toast = useToast();

  const [id, setId] = useState("");
  const [nama, setNama] = useState("");

  const {
    mutate: mutateDeleteDatastream,
    isLoading: isLoadingDeleteDatastream,
  } = useMutation(deletedatastream);

  useEffect(() => {
    if (data?.status == 200) {
      setId(data?.data?.id);
      setNama(data?.data?.nama);
    }
  }, [data]);

  const handleDeleteDatastream = (e) => {
    e.preventDefault();

    mutateDeleteDatastream(
      {
        id: id,
      },
      {
        onSuccess: (res) => {
          if (res?.status === 200) {
            refetch();
            onClose();
            onCloseDetailDatastream();
            toast({
              title: "Delete Datastream Berhasil!",
              status: "success",
              duration: 5000,
              position: "top",
              isClosable: true,
            });
          } else {
            toast({
              title: "Delete Datastream Gagal!",
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
          <ModalHeader>DELETE DATASTREAM</ModalHeader>
          <ModalCloseButton />
          <LightMode>
            <form onSubmit={handleDeleteDatastream}>
              <ModalBody>
                <Text>
                  Apakah anda yakin ingin menghapus datastream {nama}?
                </Text>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  colorScheme={"red"}
                  isLoading={isLoadingDeleteDatastream}
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

export default DeleteDataStreamModal;
