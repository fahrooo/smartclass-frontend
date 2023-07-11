import useAuthUserStore from "@/common/hooks/store/useAuthUserStore ";
import {
  Box,
  Button,
  DarkMode,
  FormControl,
  Input,
  LightMode,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import checkpassword from "../../api/checkpassword";

const CheckPasswordModal = ({ onClose, isOpen, onOpenEditPassword }) => {
  const toast = useToast();
  const session = useAuthUserStore((state) => state.session);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusPassword, setFocusPassword] = useState("");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setEmail(session?.data?.email);
  }, [session]);

  useEffect(() => {
    if (password != "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password]);

  const isErrorPassword = focusPassword == true && password == "";

  const handleMatchPassword = async (e) => {
    e.preventDefault();

    const res = await checkpassword(email, password);

    if (res?.status === 200) {
      setPassword("");
      setFocusPassword(false);
      toast({
        title: "Password Benar!",
        description: "Silahkan ganti password anda",
        status: "success",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
      onClose();
      onOpenEditPassword();
    } else {
      toast({
        title: "Password Salah!",
        description: "Silahkan coba kembali",
        status: "error",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
    }
  };

  return (
    <DarkMode>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent color="#FFFFFF" m={2}>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <LightMode>
              <form onSubmit={handleMatchPassword}>
                <Box
                  w="full"
                  h="max-content"
                  bgColor="#212121"
                  borderRadius="40px"
                  p="20px"
                >
                  <Stack direction="column" alignItems="center">
                    <Box>
                      <Text fontSize="27px" color="#FFFFFF" fontWeight="700">
                        Masukkan Password
                      </Text>
                    </Box>
                    <Box>
                      <Text
                        textAlign="center"
                        fontSize="13px"
                        color="#FFFFFF"
                        mt="10px"
                      >
                        Untuk mengamankan akunmu, silahkan verifikasi identitas
                        dengan memasukkan password.
                      </Text>
                      <Box mt={4}>
                        <FormControl isInvalid={isErrorPassword}>
                          <Tooltip
                            label="Password harus diisi"
                            placement="bottom-end"
                            bg="red.600"
                            isOpen={isErrorPassword}
                          >
                            <Input
                              type="password"
                              variant="flushed"
                              placeholder="Password saat ini"
                              onChange={(e) => {
                                setPassword(e.target.value);
                              }}
                              onBlur={() => {
                                setFocusPassword(true);
                              }}
                            />
                          </Tooltip>
                        </FormControl>
                      </Box>
                    </Box>
                    <Box w="100%">
                      <Button
                        w="100%"
                        mt="10px"
                        colorScheme="messenger"
                        isDisabled={disabled}
                        type="submit"
                      >
                        Lanjut
                      </Button>
                    </Box>
                  </Stack>
                </Box>
              </form>
            </LightMode>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </DarkMode>
  );
};

export default CheckPasswordModal;
