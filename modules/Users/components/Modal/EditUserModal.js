import {
  Box,
  Button,
  Checkbox,
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
  Text,
  Tooltip,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import parsenik from "parsenik";
import validator from "validator";
import putusers from "../../api/putusers";
import { useMutation } from "@tanstack/react-query";
import resetpassword from "../../api/resetpassword";
import useAuthUserStore from "@/common/hooks/store/useAuthUserStore ";
import Cookies from "js-cookie";

const EditUserModal = ({
  onClose,
  isOpen,
  refetch,
  data,
  dataUnits,
  onCloseDetailUser,
  disabledUnit,
}) => {
  const toast = useToast();
  const formTambahUser = useRef();

  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [id, setId] = useState("");
  const [nama, setNama] = useState("");
  const [nik, setNik] = useState("");
  const [unit, setUnit] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [isActive, setIsActive] = useState(true);

  const { mutate: mutateEditUser, isLoading: isLoadingEditUser } =
    useMutation(putusers);

  const { mutate: mutateResetPassword, isLoading: isLoadingResetPassword } =
    useMutation(resetpassword);

  const [focusEmail, setFocusEmail] = useState(false);

  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [msgErrorEmail, setMsgErrorEmail] = useState("");

  const isEmail = validator.isEmail(email);

  const [focusNama, setFocusNama] = useState(false);
  const [focusNik, setFocusNik] = useState(false);
  const [focusRole, setFocusRole] = useState(false);

  const [isErrorNik, setIsErrorNik] = useState(false);
  const [msgErrorNik, setMsgErrorNik] = useState("");

  const isNik = parsenik.isValid(Number(nik));

  const isErrorNama = focusNama === true && nama === "";
  const isErrorRole = focusRole === true && role === "";

  useEffect(() => {
    nama != "" &&
    nik != "" &&
    isNik != false &&
    role != "" &&
    email != "" &&
    isEmail == true
      ? setDisabled(false)
      : setDisabled(true);

    if (focusNik === true && nik === "") {
      setIsErrorNik(true);
      setMsgErrorNik("NIK harus diisi");
    } else if (focusNik === true && nik.length < 16) {
      setIsErrorNik(true);
      setMsgErrorNik("NIK harus 16 angka");
    } else if (focusNik === true && isNik === false) {
      setIsErrorNik(true);
      setMsgErrorNik("NIK tidak valid");
    } else {
      setIsErrorNik(false);
      setMsgErrorNik("");
    }

    if (focusEmail === true && email === "") {
      setIsErrorEmail(true);
      setMsgErrorEmail("Email harus diisi");
    } else if (focusEmail === true && isEmail == false) {
      setIsErrorEmail(true);
      setMsgErrorEmail("Email tidak valid");
    } else {
      setIsErrorEmail(false);
      setMsgErrorEmail("");
    }
  }, [
    nama,
    nik,
    unit,
    focusNik,
    email,
    role,
    focusEmail,
    setDisabled,
    isEmail,
    isNik,
  ]);

  useEffect(() => {
    if (data?.status == 200) {
      setId(data?.data?.id);
      setNik(data?.data?.nik);
      setNama(data?.data?.nama);
      setEmail(data?.data?.email);
      setUnit(data?.data?.id_unit);
      setRole(data?.data?.role);
      setIsActive(data?.data?.is_active);
    }
  }, [data]);

  const handleEditUser = (e) => {
    e.preventDefault();

    mutateEditUser(
      {
        id: id,
        nik: nik,
        nama: nama.toUpperCase(),
        email: email,
        role: role,
        id_unit: Number(unit),
        is_active: isActive,
      },
      {
        onSuccess: (res) => {
          if (res?.status === 200) {
            const idLogin = Cookies.get("_id");
            if (idLogin == id) {
              useAuthUserStore
                .getState()
                .fetch(`http://localhost:5000/me/${idLogin}`);
            }
            refetch();
            toast({
              title: "Edit User Berhasil!",
              status: "success",
              duration: 5000,
              position: "top",
              isClosable: true,
            });
            onClose();
            onCloseDetailUser();
          }

          if (res?.status === 400 && res?.message === "NIK already exist") {
            toast({
              title: "Edit User Gagal!",
              description: "NIK sudah ada",
              status: "error",
              duration: 5000,
              position: "top",
              isClosable: true,
            });
          }

          if (res?.status === 400 && res?.message === "Email already exist") {
            toast({
              title: "Edit User Gagal!",
              description: "Email sudah ada",
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

  const handleResetPassword = (e) => {
    e.preventDefault();

    mutateResetPassword(
      {
        email: email,
      },
      {
        onSuccess: (res) => {
          if (res?.status === 200) {
            refetch();
            toast({
              title: "Reset Password Berhasil!",
              status: "success",
              duration: 5000,
              position: "top",
              isClosable: true,
            });
          } else {
            toast({
              title: "Reset Password Gagal!",
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
          <ModalHeader>EDIT USER</ModalHeader>
          <ModalCloseButton />
          <LightMode>
            <form ref={formTambahUser} onSubmit={handleEditUser}>
              <ModalBody>
                <VStack spacing={4}>
                  <FormControl isInvalid={isErrorNik}>
                    <FormLabel fontSize="15px" color="#FFFFFF" fontWeight="400">
                      NIK
                    </FormLabel>
                    <Tooltip
                      label={msgErrorNik}
                      placement="bottom-end"
                      bg="red.600"
                      isOpen={isErrorNik}
                    >
                      <Input
                        variant="flushed"
                        type="number"
                        h="35px"
                        color="#FFFFFF"
                        placeholder="NIK"
                        value={nik}
                        onChange={(e) => {
                          setNik(e.target.value);
                        }}
                        onBlur={() => {
                          setFocusNik(true);
                        }}
                      />
                    </Tooltip>
                  </FormControl>
                  <FormControl isInvalid={isErrorNama}>
                    <FormLabel fontSize="15px" color="#FFFFFF" fontWeight="400">
                      Nama Lengkap
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
                        placeholder="Nama Lengkap"
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
                  <FormControl isInvalid={isErrorEmail}>
                    <FormLabel fontSize="15px" color="#FFFFFF" fontWeight="400">
                      Email
                    </FormLabel>
                    <Tooltip
                      label={msgErrorEmail}
                      placement="bottom-end"
                      bg="red.600"
                      isOpen={isErrorEmail}
                    >
                      <Input
                        variant="flushed"
                        type="email"
                        h="35px"
                        color="#FFFFFF"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        onBlur={() => {
                          setFocusEmail(true);
                        }}
                      />
                    </Tooltip>
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="15px" color="#FFFFFF" fontWeight="400">
                      Unit
                    </FormLabel>
                    <Select
                      variant="flushed"
                      h="35px"
                      color={unit != "" ? "#FFFFFF" : "#718096"}
                      value={unit}
                      onChange={(e) => {
                        setUnit(e.target.value);
                      }}
                      isDisabled={disabledUnit}
                    >
                      <option
                        style={{
                          color: "white",
                          backgroundColor: "#4A5568",
                          width: "200px",
                        }}
                        value="0"
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
                  </FormControl>
                  <FormControl isInvalid={isErrorRole}>
                    <FormLabel fontSize="15px" color="#FFFFFF" fontWeight="400">
                      Role
                    </FormLabel>
                    <Tooltip
                      label="Role harus diisi"
                      placement="bottom-end"
                      bg="red.600"
                      isOpen={isErrorRole}
                    >
                      <Select
                        variant="flushed"
                        h="35px"
                        color={role != "" ? "#FFFFFF" : "#718096"}
                        value={role}
                        onChange={(e) => {
                          setRole(e.target.value);
                        }}
                      >
                        <option
                          style={{
                            color: "white",
                            backgroundColor: "#4A5568",
                            width: "200px",
                          }}
                          value=""
                          disabled
                        >
                          Select Role
                        </option>
                        {disabledUnit == false && (
                          <option
                            style={{
                              color: "white",
                              backgroundColor: "#4A5568",
                              width: "200px",
                            }}
                            value="super admin"
                          >
                            Super Admin
                          </option>
                        )}
                        {disabledUnit == false && (
                          <option
                            style={{
                              color: "white",
                              backgroundColor: "#4A5568",
                              width: "200px",
                            }}
                            value="admin"
                          >
                            Admin
                          </option>
                        )}
                        <option
                          style={{
                            color: "white",
                            backgroundColor: "#4A5568",
                            width: "200px",
                          }}
                          value="operator"
                        >
                          Operator
                        </option>
                        <option
                          style={{
                            color: "white",
                            backgroundColor: "#4A5568",
                            width: "200px",
                          }}
                          value="peserta"
                        >
                          Peserta
                        </option>
                      </Select>
                    </Tooltip>
                  </FormControl>
                  <FormControl display="flex" gap={2}>
                    <Checkbox
                      isChecked={isActive}
                      onChange={() => {
                        setIsActive(!isActive);
                      }}
                      colorScheme="teal"
                    ></Checkbox>
                    <Text>Active</Text>
                  </FormControl>
                  <Button
                    size={"sm"}
                    type="button"
                    onClick={handleResetPassword}
                    colorScheme={"red"}
                    isLoading={isLoadingResetPassword}
                  >
                    Reset Password
                  </Button>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  colorScheme={"messenger"}
                  isLoading={isLoadingEditUser}
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

export default EditUserModal;
