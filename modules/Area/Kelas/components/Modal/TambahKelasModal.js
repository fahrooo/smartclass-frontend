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
  Select,
  Tooltip,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import postkelas from "../../api/postkelas";
import useAuthUserStore from "@/common/hooks/store/useAuthUserStore ";

const TambahKelasModal = ({
  onClose,
  isOpen,
  refetch,
  dataUnits,
  disabledUnit,
}) => {
  const toast = useToast();
  const formTambahKelas = useRef();

  const session = useAuthUserStore((state) => state.session);

  const [disabled, setDisabled] = useState(true);

  const [nama, setNama] = useState("");
  const [topic, setTopic] = useState("");
  const [unit, setUnit] = useState("");

  const { mutate: mutatePostKelas, isLoading: isLoadingPostKelas } =
    useMutation(postkelas);

  const [focusNama, setFocusNama] = useState(false);
  const [focusTopic, setFocusTopic] = useState(false);
  const [focusUnit, setFocusUnit] = useState(false);

  const isErrorNama = focusNama === true && nama === "";
  const isErrorTopic = focusTopic === true && topic === "";
  const isErrorUnit = focusUnit === true && unit === "";

  useEffect(() => {
    if (disabledUnit == true) {
      setUnit(session?.data?.id_unit);
    } else {
      setUnit("");
    }
  }, [session, disabledUnit]);

  useEffect(() => {
    nama != "" && topic != "" && unit != ""
      ? setDisabled(false)
      : setDisabled(true);
  }, [nama, topic, unit]);

  const handleTambahKelas = (e) => {
    e.preventDefault();

    mutatePostKelas(
      {
        nama: nama.toUpperCase(),
        topic: topic.toUpperCase(),
        id_unit: Number(unit),
      },
      {
        onSuccess: (res) => {
          if (res?.status === 200) {
            refetch();
            toast({
              title: "Tambah Kelas Berhasil!",
              status: "success",
              duration: 5000,
              position: "top",
              isClosable: true,
            });
            onClose();
            formTambahKelas.current?.reset();
            setNama("");
            setTopic("");
            setUnit("");
            setFocusNama(false);
            setFocusTopic(false);
            setFocusUnit(false);
          } else {
            toast({
              title: "Tambah Kelas Gagal!",
              description: "Kelas sudah ada",
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
          <ModalHeader>TAMBAH KELAS</ModalHeader>
          <ModalCloseButton />
          <LightMode>
            <form ref={formTambahKelas} onSubmit={handleTambahKelas}>
              <ModalBody>
                <VStack spacing={4}>
                  <FormControl isInvalid={isErrorNama}>
                    <FormLabel fontSize="15px" color="#FFFFFF" fontWeight="400">
                      Nama Kelas
                    </FormLabel>
                    <Tooltip
                      label="Nama Kelas harus diisi"
                      placement="bottom-end"
                      bg="red.600"
                      isOpen={isErrorNama}
                    >
                      <Input
                        variant="flushed"
                        type="text"
                        h="35px"
                        color="#FFFFFF"
                        placeholder="Nama Kelas"
                        onChange={(e) => {
                          setNama(e.target.value);
                        }}
                        onBlur={() => {
                          setFocusNama(true);
                        }}
                      />
                    </Tooltip>
                  </FormControl>
                  <FormControl isInvalid={isErrorTopic}>
                    <FormLabel fontSize="15px" color="#FFFFFF" fontWeight="400">
                      Topic
                    </FormLabel>
                    <Tooltip
                      label="Topic harus diisi"
                      placement="bottom-end"
                      bg="red.600"
                      isOpen={isErrorTopic}
                    >
                      <Input
                        variant="flushed"
                        type="text"
                        h="35px"
                        color="#FFFFFF"
                        placeholder="Topic"
                        onChange={(e) => {
                          setTopic(e.target.value);
                        }}
                        onBlur={() => {
                          setFocusTopic(true);
                        }}
                      />
                    </Tooltip>
                  </FormControl>
                  <FormControl isInvalid={isErrorUnit}>
                    <FormLabel fontSize="15px" color="#FFFFFF" fontWeight="400">
                      Unit
                    </FormLabel>
                    <Tooltip
                      label="Unit harus diisi"
                      placement="bottom-end"
                      bg="red.600"
                      isOpen={isErrorUnit}
                    >
                      <Select
                        variant="flushed"
                        h="35px"
                        color={unit != "" ? "#FFFFFF" : "#718096"}
                        onChange={(e) => {
                          setUnit(e.target.value);
                        }}
                        onBlur={() => {
                          setFocusUnit(true);
                        }}
                        value={unit}
                        isDisabled={disabledUnit}
                      >
                        <option
                          style={{
                            color: "white",
                            backgroundColor: "#4A5568",
                            width: "200px",
                          }}
                          value=""
                        >
                          Select Unit
                        </option>
                        {dataUnits?.data.map((item, index) => (
                          <option
                            style={{
                              color: "white",
                              backgroundColor: "#4A5568",
                              width: "200px",
                            }}
                            key={index}
                            value={item?.id}
                          >
                            {item?.nama}
                          </option>
                        ))}
                      </Select>
                    </Tooltip>
                  </FormControl>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  colorScheme={"messenger"}
                  isLoading={isLoadingPostKelas}
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

export default TambahKelasModal;
