import {
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
  Tooltip,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import putunits from "../../api/putunits";

const EditUnitModal = ({ onClose, isOpen, refetch, data }) => {
  const toast = useToast();
  const formTambahUnit = useRef();

  const [disabled, setDisabled] = useState(true);

  const [id, setId] = useState("");
  const [nama, setNama] = useState("");

  const { mutate: mutateEditUnit, isLoading: isLoadingEditUnit } =
    useMutation(putunits);

  const [focusNama, setFocusNama] = useState(false);

  const isErrorNama = focusNama === true && nama === "";

  useEffect(() => {
    if (data?.status == 200) {
      setId(data?.data?.id);
      setNama(data?.data?.nama);
    }
  }, [data]);

  useEffect(() => {
    nama != "" ? setDisabled(false) : setDisabled(true);
  }, [nama]);

  const handleEditUnit = (e) => {
    e.preventDefault();

    mutateEditUnit(
      {
        id: id,
        nama: nama.toUpperCase(),
      },
      {
        onSuccess: (res) => {
          if (res?.status === 200) {
            refetch();
            toast({
              title: "Edit Unit Berhasil!",
              status: "success",
              duration: 5000,
              position: "top",
              isClosable: true,
            });
            onClose();
          } else {
            toast({
              title: "Edit Unit Gagal!",
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
          <ModalHeader>EDIT UNIT</ModalHeader>
          <ModalCloseButton />
          <LightMode>
            <form ref={formTambahUnit} onSubmit={handleEditUnit}>
              <ModalBody>
                <VStack spacing={4}>
                  <FormControl isInvalid={isErrorNama}>
                    <FormLabel fontSize="15px" color="#FFFFFF" fontWeight="400">
                      Nama Unit
                    </FormLabel>
                    <Tooltip
                      label="Nama Unit harus diisi"
                      placement="bottom-end"
                      bg="red.600"
                      isOpen={isErrorNama}
                    >
                      <Input
                        variant="flushed"
                        type="text"
                        h="35px"
                        color="#FFFFFF"
                        placeholder="Nama Unit"
                        value={nama}
                        onChange={(e) => {
                          setNama(e.target.value);
                        }}
                        onBlur={() => {
                          setFocusNama(true);
                        }}
                      />
                    </Tooltip>
                  </FormControl>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  colorScheme={"messenger"}
                  isLoading={isLoadingEditUnit}
                >
                  Simpan
                </Button>
              </ModalFooter>
            </form>
          </LightMode>
        </ModalContent>
      </Modal>
    </DarkMode>
  );
};

export default EditUnitModal;
