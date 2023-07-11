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
import postunits from "../../api/postunits";

const TambahUnitModal = ({ onClose, isOpen, refetch }) => {
  const toast = useToast();
  const formTambahUnit = useRef();

  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [nama, setNama] = useState("");

  const { mutate: mutatePostUnit, isLoading: isLoadingPostUnit } =
    useMutation(postunits);

  const [focusNama, setFocusNama] = useState(false);

  const isErrorNama = focusNama === true && nama === "";

  useEffect(() => {
    nama != "" ? setDisabled(false) : setDisabled(true);
  }, [nama]);

  const handleTambahUnit = (e) => {
    e.preventDefault();

    mutatePostUnit(
      {
        nama: nama.toUpperCase(),
      },
      {
        onSuccess: (res) => {
          if (res?.status === 200) {
            refetch();
            toast({
              title: "Tambah Unit Berhasil!",
              status: "success",
              duration: 5000,
              position: "top",
              isClosable: true,
            });
            onClose();
            formTambahUnit.current?.reset();
            setNama("");
            setFocusNama(false);
          } else {
            toast({
              title: "Tambah Unit Gagal!",
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
          <ModalHeader>TAMBAH UNIT</ModalHeader>
          <ModalCloseButton />
          <LightMode>
            <form ref={formTambahUnit} onSubmit={handleTambahUnit}>
              <ModalBody>
                <VStack spacing={4}>
                  <FormControl isInvalid={isErrorNama}>
                    <FormLabel fontSize="15px" color="#FFFFFF" fontWeight="400">
                      Nama Unit
                    </FormLabel>
                    <Tooltip
                      label="Nama Lengkap harus diisi"
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
                  isLoading={isLoadingPostUnit}
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

export default TambahUnitModal;
