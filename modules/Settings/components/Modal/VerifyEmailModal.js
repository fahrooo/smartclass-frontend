import useAuthUserStore from "@/common/hooks/store/useAuthUserStore ";
import updateemailverify from "@/modules/Auth/UpdateEmailVerify/api/updateemailverify";
import verifyemail from "@/modules/Auth/verifyEmail/api/verifyemail";
import CountdownTimer from "@/modules/Auth/verifyEmail/components/CountdownTimer";
import {
  Box,
  Button,
  DarkMode,
  HStack,
  LightMode,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  PinInput,
  PinInputField,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const VerifyEmailModal = ({ onClose, isOpen }) => {
  const toast = useToast();
  const session = useAuthUserStore((state) => state.session);

  const [oldEmail, setOldEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [disabled, setDisabled] = useState(true);

  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");

  useEffect(() => {
    setOldEmail(session?.data?.email);

    const email = Cookies.get("email");
    if (email) {
      setNewEmail(email);
    }

    if ((otp1 != "", otp2 != "", otp3 != "", otp4 != "")) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [otp1, otp2, otp3, otp4, session]);

  const code_otp = otp1 + otp2 + otp3 + otp4;

  const handleVerifyEmail = async (e) => {
    e.preventDefault();

    const res = await verifyemail(oldEmail, code_otp);
    if (res.status === 200 && res.message === "Aktivasi Berhasil") {
      const res = await updateemailverify(newEmail, oldEmail);
      if (res.status === 200 && res.message === "Email updated successfuly") {
        toast({
          title: "Ganti Email Berhasil!",
          status: "success",
          duration: 5000,
          position: "top",
          isClosable: true,
        });
        Cookies.remove("email");
        onClose();
      } else {
        toast({
          title: "Ganti Email Gagal!",
          description: "Kode OTP yang anda masukkan salah",
          status: "error",
          duration: 5000,
          position: "top",
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Ganti Email Gagal!",
        description: "Kode OTP yang anda masukkan salah",
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
          <ModalHeader>Verifikasi Email</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
                    Masukkan Kode OTP
                  </Text>
                </Box>
                <Box>
                  <Text
                    textAlign="center"
                    fontSize="13px"
                    color="#FFFFFF"
                    mt="10px"
                  >
                    Kami telah mengirimkan kode OTP ke email {newEmail}
                  </Text>
                </Box>
                <form onSubmit={handleVerifyEmail}>
                  <Stack direction="column" alignItems="center">
                    <Box>
                      <HStack mt="10px">
                        <PinInput>
                          <PinInputField
                            color="#FFFFFF"
                            onChange={(e) => {
                              setOtp1(e.target.value);
                            }}
                          />
                          <PinInputField
                            color="#FFFFFF"
                            onChange={(e) => {
                              setOtp2(e.target.value);
                            }}
                          />
                          <PinInputField
                            color="#FFFFFF"
                            onChange={(e) => {
                              setOtp3(e.target.value);
                            }}
                          />
                          <PinInputField
                            color="#FFFFFF"
                            onChange={(e) => {
                              setOtp4(e.target.value);
                            }}
                          />
                        </PinInput>
                      </HStack>
                    </Box>
                    <Box>
                      <Text fontSize="13px" color="#FFFFFF" mt="10px">
                        Belum mendapat email kode OTP?{" "}
                        <CountdownTimer
                          totalSec={30 * 1000}
                          email={newEmail}
                          oldEmail={oldEmail}
                        />
                      </Text>
                    </Box>
                    <Box>
                      <LightMode>
                        <Button
                          mt="10px"
                          colorScheme="messenger"
                          isDisabled={disabled}
                          type="submit"
                        >
                          Kirim
                        </Button>
                      </LightMode>
                    </Box>
                  </Stack>
                </form>
              </Stack>
            </Box>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </DarkMode>
  );
};

export default VerifyEmailModal;
