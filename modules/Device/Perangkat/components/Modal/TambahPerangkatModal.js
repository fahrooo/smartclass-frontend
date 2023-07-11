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
import getkelas from "@/modules/Area/Kelas/api/getkelas";
import postperangkatkelas from "../../api/postperangkatkelas";
import getdatastream from "@/modules/Device/Datastream/api/getdatastream";
import useAuthUserStore from "@/common/hooks/store/useAuthUserStore ";

const TambahPerangkatModal = ({
  onClose,
  isOpen,
  refetch,
  dataUnits,
  dataPerangkat,
  disabledUnit,
}) => {
  const toast = useToast();
  const formTambahPerangkat = useRef();

  const session = useAuthUserStore((state) => state.session);

  const [disabled, setDisabled] = useState(true);
  const [disabledFilterKelas, setDisabledFilterKelas] = useState(true);
  const [disabledFilterDatastream, setDisabledFilterDatastream] =
    useState(true);

  const [filterPerangkat, setFilterPerangkat] = useState(false);
  const [filterUnit, setFilterUnit] = useState(false);
  const [perangkat, setPerangkat] = useState("");
  const [datastream, setDatastream] = useState("");
  const [kelas, setKelas] = useState("");
  const [unit, setUnit] = useState("");
  const [nama, setNama] = useState("");

  const {
    mutate: mutatePostPerangkatKelas,
    isLoading: isLoadingPostPerangkatKelas,
  } = useMutation(postperangkatkelas);

  const {
    data: resKelas,
    isLoading: isLoadingKelas,
    refetch: refetchGetKelas,
  } = getkelas({
    filter_nama: false,
    filter_unit: filterUnit,
    nama: "",
    id_unit: Number(unit),
    page: 1,
    limit: 9999,
  });

  const {
    data: resDatastream,
    isLoading: isLoadingDatastream,
    refetch: refetchGetDatastream,
  } = getdatastream({
    filter_nama: false,
    filter_perangkat: filterPerangkat,
    nama: "",
    id_perangkat: Number(perangkat),
    page: 1,
    limit: 9999,
  });

  const [focusKelas, setFocusKelas] = useState(false);
  const [focusUnit, setFocusUnit] = useState(false);
  const [focusPerangkat, setFocusPerangkat] = useState(false);
  const [focusDatastream, setFocusDatastream] = useState(false);
  const [focusNama, setFocusNama] = useState(false);

  const isErrorKelas = focusKelas === true && kelas === "";
  const isErrorUnit = focusUnit === true && unit === "";
  const isErrorPerangkat = focusPerangkat === true && perangkat === "";
  const isErrorDatastream = focusDatastream === true && datastream === "";
  const isErrorNama = focusNama === true && nama === "";

  useEffect(() => {
    if (disabledUnit == true) {
      setUnit(session?.data?.id_unit);
    } else {
      setUnit("");
    }
  }, [session, disabledUnit]);

  useEffect(() => {
    kelas != "" && datastream != "" && nama != ""
      ? setDisabled(false)
      : setDisabled(true);

    if (unit != "") {
      setFilterUnit(true);
      setDisabledFilterKelas(false);
    } else {
      setFilterUnit(false);
      setDisabledFilterKelas(true);
    }

    if (perangkat != "") {
      setFilterPerangkat(true);
      setDisabledFilterDatastream(false);
    } else {
      setFilterPerangkat(false);
      setDisabledFilterDatastream(true);
    }

    if (resKelas?.status == 200 && unit != "") {
      setDisabledFilterKelas(false);
    } else {
      setKelas("");
      setDisabledFilterKelas(true);
    }

    if (resDatastream?.status == 200 && perangkat != "") {
      setDisabledFilterDatastream(false);
    } else {
      setDatastream("");
      setDisabledFilterDatastream(true);
    }
  }, [kelas, unit, perangkat, nama, resDatastream, resKelas]);

  const handleTambahPerangkat = (e) => {
    e.preventDefault();

    mutatePostPerangkatKelas(
      {
        id_kelas: Number(kelas),
        id_datastream: Number(datastream),
        nama: nama.toUpperCase(),
      },
      {
        onSuccess: (res) => {
          if (res?.status === 200) {
            refetch();
            toast({
              title: "Tambah Device Berhasil!",
              status: "success",
              duration: 5000,
              position: "top",
              isClosable: true,
            });
            setDisabledFilterDatastream(true);
            setDisabledFilterKelas(true);
            onClose();
            formTambahPerangkat.current?.reset();
            if (disabledUnit == false) {
              setUnit("");
              setFocusUnit(false);
            }
            setDatastream("");
            setKelas("");
            setNama("");
            setPerangkat("");
            setFocusDatastream(false);
            setFocusKelas(false);
            setFocusNama(false);
            setFocusPerangkat(false);
          } else {
            toast({
              title: "Tambah Device Gagal!",
              description: "Device sudah ada di kelas tersebut",
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
          <ModalHeader>TAMBAH DEVICE</ModalHeader>
          <ModalCloseButton />
          <LightMode>
            <form ref={formTambahPerangkat} onSubmit={handleTambahPerangkat}>
              <ModalBody>
                <VStack spacing={4}>
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
                        value={
                          disabledUnit == false ? unit : session?.data?.id_unit
                        }
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
                        {dataUnits?.status == 200 &&
                          dataUnits?.data.map((item, index) => (
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
                  <FormControl isInvalid={isErrorKelas}>
                    <FormLabel fontSize="15px" color="#FFFFFF" fontWeight="400">
                      Kelas
                    </FormLabel>
                    <Tooltip
                      label={
                        disabledFilterKelas
                          ? "Tidak ada kelas"
                          : "Kelas harus diisi"
                      }
                      placement="bottom-end"
                      bg="red.600"
                      isOpen={isErrorKelas}
                    >
                      <Select
                        variant="flushed"
                        h="35px"
                        color={kelas != "" ? "#FFFFFF" : "#718096"}
                        onChange={(e) => {
                          setKelas(e.target.value);
                        }}
                        isDisabled={disabledFilterKelas}
                        onBlur={() => {
                          setFocusKelas(true);
                        }}
                      >
                        <option
                          style={{
                            color: "white",
                            backgroundColor: "#4A5568",
                            width: "200px",
                          }}
                          value=""
                        >
                          Select Kelas
                        </option>
                        {resKelas?.status == 200 &&
                          resKelas?.data.map((item, index) => (
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
                  <FormControl isInvalid={isErrorPerangkat}>
                    <FormLabel fontSize="15px" color="#FFFFFF" fontWeight="400">
                      Type Device
                    </FormLabel>
                    <Tooltip
                      label={"Type Device harus diisi"}
                      placement="bottom-end"
                      bg="red.600"
                      isOpen={isErrorPerangkat}
                    >
                      <Select
                        variant="flushed"
                        h="35px"
                        color={perangkat != "" ? "#FFFFFF" : "#718096"}
                        onChange={(e) => {
                          setPerangkat(e.target.value);
                        }}
                        onBlur={() => {
                          setFocusPerangkat(true);
                        }}
                      >
                        <option
                          style={{
                            color: "white",
                            backgroundColor: "#4A5568",
                            width: "200px",
                          }}
                          value=""
                        >
                          Select Type Device
                        </option>
                        {dataPerangkat?.status == 200 &&
                          dataPerangkat?.data.map((item, index) => (
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
                  <FormControl isInvalid={isErrorDatastream}>
                    <FormLabel fontSize="15px" color="#FFFFFF" fontWeight="400">
                      Datastream
                    </FormLabel>
                    <Tooltip
                      label={
                        disabledFilterDatastream
                          ? "Tidak ada Datastream"
                          : "Datastream harus diisi"
                      }
                      placement="bottom-end"
                      bg="red.600"
                      isOpen={isErrorDatastream}
                    >
                      <Select
                        variant="flushed"
                        h="35px"
                        color={datastream != "" ? "#FFFFFF" : "#718096"}
                        onChange={(e) => {
                          setDatastream(e.target.value);
                        }}
                        isDisabled={disabledFilterDatastream}
                        onBlur={() => {
                          setFocusDatastream(true);
                        }}
                      >
                        <option
                          style={{
                            color: "white",
                            backgroundColor: "#4A5568",
                            width: "200px",
                          }}
                          value=""
                        >
                          Select Datastream
                        </option>
                        {resDatastream?.status == 200 &&
                          resDatastream?.data.map((item, index) => (
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
                  <FormControl isInvalid={isErrorNama}>
                    <FormLabel fontSize="15px" color="#FFFFFF" fontWeight="400">
                      Nama Device
                    </FormLabel>
                    <Tooltip
                      label="Nama Device harus diisi"
                      placement="bottom-end"
                      bg="red.600"
                      isOpen={isErrorNama}
                    >
                      <Input
                        variant="flushed"
                        type="text"
                        h="35px"
                        color="#FFFFFF"
                        placeholder="Nama Device"
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
                  isLoading={isLoadingPostPerangkatKelas}
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

export default TambahPerangkatModal;
