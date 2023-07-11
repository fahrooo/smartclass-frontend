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
import postoperator from "../../api/postoperator";
import getusers from "@/modules/Users/api/getusers";
import getkelas from "@/modules/Area/Kelas/api/getkelas";
import useAuthUserStore from "@/common/hooks/store/useAuthUserStore ";

const TambahOperatorModal = ({
  onClose,
  isOpen,
  refetch,
  dataUnits,
  disabledUnit,
}) => {
  const toast = useToast();
  const formTambahOperator = useRef();

  const session = useAuthUserStore((state) => state.session);

  const [disabled, setDisabled] = useState(true);
  const [disabledFilterKelas, setDisabledFilterKelas] = useState(true);
  const [disabledFilterOperator, setDisabledFilterOperator] = useState(true);

  const [filterUnit, setFilterUnit] = useState(false);
  const [operator, setOperator] = useState("");
  const [kelas, setKelas] = useState("");
  const [unit, setUnit] = useState("");

  const { mutate: mutatePostOperator, isLoading: isLoadingPostOperator } =
    useMutation(postoperator);

  const {
    data: resUsers,
    isLoading,
    refetch: refetchGetUsers,
  } = getusers({
    filter_nama: false,
    filter_unit: filterUnit,
    filter_role: true,
    nama: "",
    id_unit: Number(unit),
    role: "operator",
    page: 1,
    limit: 9999,
  });

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

  const [focusOperator, setFocusOperator] = useState(false);
  const [focusKelas, setFocusKelas] = useState(false);
  const [focusUnit, setFocusUnit] = useState(false);

  const isErrorOperator = focusOperator === true && operator === "";
  const isErrorKelas = focusKelas === true && kelas === "";
  const isErrorUnit = focusUnit === true && unit === "";

  useEffect(() => {
    operator != "" && kelas != "" && unit != ""
      ? setDisabled(false)
      : setDisabled(true);

    if (unit != "") {
      setFilterUnit(true);
      setDisabledFilterKelas(false);
      setDisabledFilterOperator(false);
    } else {
      setFilterUnit(false);
      setDisabledFilterKelas(true);
      setDisabledFilterOperator(true);
    }

    if (resKelas?.status == 200 && unit != "") {
      setDisabledFilterKelas(false);
    } else {
      setKelas("");
      setDisabledFilterKelas(true);
    }

    if (resUsers?.status == 200 && unit != "") {
      setDisabledFilterOperator(false);
    } else {
      setOperator("");
      setDisabledFilterOperator(true);
    }
  }, [operator, kelas, unit, resKelas, resUsers]);

  useEffect(() => {
    if (disabledUnit == false) {
      setUnit("");
    } else {
      setUnit(session.data?.id_unit);
    }
  }, [disabledUnit]);

  const handleTambahOperator = (e) => {
    e.preventDefault();

    mutatePostOperator(
      {
        id_user: operator,
        id_kelas: kelas,
      },
      {
        onSuccess: (res) => {
          if (res?.status === 200) {
            refetch();
            toast({
              title: "Tambah Operator Berhasil!",
              status: "success",
              duration: 5000,
              position: "top",
              isClosable: true,
            });
            setDisabledFilterOperator(true);
            setDisabledFilterKelas(true);
            onClose();
            formTambahOperator.current?.reset();
            if (disabledUnit == false) {
              setUnit("");
              setFocusUnit(false);
            }
            setOperator("");
            setKelas("");
            setFocusOperator(false);
            setFocusKelas(false);
          } else {
            toast({
              title: "Tambah Operator Gagal!",
              description: "Sudah menjadi operator kelas tersebut",
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
          <ModalHeader>TAMBAH OPERATOR</ModalHeader>
          <ModalCloseButton />
          <LightMode>
            <form ref={formTambahOperator} onSubmit={handleTambahOperator}>
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
                        isDisabled={disabledUnit}
                        value={
                          disabledUnit == false ? unit : session?.data?.id_unit
                        }
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
                  <FormControl isInvalid={isErrorOperator}>
                    <FormLabel fontSize="15px" color="#FFFFFF" fontWeight="400">
                      Operator
                    </FormLabel>
                    <Tooltip
                      label={
                        disabledFilterOperator
                          ? "Tidak ada operator"
                          : "Operator harus diisi"
                      }
                      placement="bottom-end"
                      bg="red.600"
                      isOpen={isErrorOperator}
                    >
                      <Select
                        variant="flushed"
                        h="35px"
                        color={operator != "" ? "#FFFFFF" : "#718096"}
                        onChange={(e) => {
                          setOperator(e.target.value);
                        }}
                        isDisabled={disabledFilterOperator}
                        onBlur={() => {
                          setFocusOperator(true);
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
                          Select Operator
                        </option>
                        {resUsers?.status == 200 &&
                          resUsers?.data.map((item, index) => (
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
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  colorScheme={"messenger"}
                  isLoading={isLoadingPostOperator}
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

export default TambahOperatorModal;
