import useAuthUserStore from "@/common/hooks/store/useAuthUserStore ";
import repeatsendverifyemail from "@/modules/Auth/verifyEmail/api/repeatsendverifyemail";
import {
  Box,
  Button,
  DarkMode,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
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
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { GrMail } from "react-icons/gr";
import validator from "validator";
import sendverifyemailauth from "../../api/sendverifyemailauth";

const EditEmailModal = ({ onClose, isOpen, onOpenVerifyEmail }) => {
  const toast = useToast();

  const session = useAuthUserStore((state) => state.session);

  const [oldEmail, setOldEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [focusEmail, setFocusEmail] = useState(false);
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [msgErrorEmail, setMsgErrorEmail] = useState("");
  const isEmail = validator.isEmail(newEmail);

  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setOldEmail(session?.data?.email);

    if (newEmail != "" && isEmail == true) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }

    if (focusEmail === true && newEmail === "") {
      setIsErrorEmail(true);
      setMsgErrorEmail("Email harus diisi");
    } else if (focusEmail === true && isEmail == false) {
      setIsErrorEmail(true);
      setMsgErrorEmail("Email tidak valid");
    } else {
      setIsErrorEmail(false);
      setMsgErrorEmail("");
    }
  }, [focusEmail, isEmail, newEmail, session]);

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    const res = await sendverifyemailauth(newEmail, oldEmail);
    if (res.status === 200) {
      Cookies.set("email", newEmail, { expires: 1 });
      toast({
        title: "Code OTP Terkirim!",
        description: "Silahkan cek email baru anda untuk verifikasi email",
        status: "success",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
    } else {
      toast({
        title: "Code OTP Gagal Terkirim!",
        description: "Silahkan lakukan kembali",
        status: "error",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
    }
    onClose();
    onOpenVerifyEmail();
    setNewEmail("");
    setFocusEmail(false);
  };
  return (
    <DarkMode>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent color="#FFFFFF" m={2}>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <LightMode>
            <ModalBody>
              <Box
                w="full"
                h="max-content"
                bgColor="#212121"
                borderRadius="40px"
                px="20px"
                py="30px"
              >
                <Stack direction="column" alignItems="center">
                  <Text
                    fontSize="25px"
                    color="#FFFFFF"
                    mt="10px"
                    fontWeight="700"
                  >
                    Ganti Email
                  </Text>
                  <Text fontSize="13px" color="#FFFFFF" mt="33px">
                    Silahkan masukkan email baru anda
                  </Text>
                </Stack>
                <Box mt="20px">
                  <form onSubmit={handleUpdateEmail}>
                    <Box>
                      <FormControl isInvalid={isErrorEmail}>
                        <Tooltip
                          label={msgErrorEmail}
                          placement="bottom-end"
                          bg="red.600"
                          isOpen={isErrorEmail}
                        >
                          <InputGroup>
                            <InputLeftElement
                              fontSize="20px"
                              color="gray.300"
                              pointerEvents="none"
                              children={<GrMail />}
                            />
                            <Input
                              type="email"
                              placeholder="Email Address"
                              variant="flushed"
                              color="gray.300"
                              value={newEmail}
                              onChange={(e) => {
                                setNewEmail(e.target.value);
                              }}
                              onBlur={() => {
                                setFocusEmail(true);
                              }}
                            />
                          </InputGroup>
                        </Tooltip>
                      </FormControl>
                    </Box>
                    <Box w="100%" mt="20px">
                      <Button
                        w="100%"
                        colorScheme="messenger"
                        type="submit"
                        isDisabled={disabled}
                        isLoading={isLoading}
                      >
                        Kirim
                      </Button>
                    </Box>
                  </form>
                </Box>
              </Box>
            </ModalBody>
          </LightMode>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </DarkMode>
  );
};

export default EditEmailModal;
