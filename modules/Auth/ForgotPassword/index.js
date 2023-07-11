/* eslint-disable react/no-children-prop */
import {
  Box,
  Button,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { GrMail } from "react-icons/gr";
import validator from "validator";
import sendverifyemail from "./api/sendverifyemail";

const ForgotPassword = () => {
  const router = useRouter();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [focusEmail, setFocusEmail] = useState(false);
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [msgErrorEmail, setMsgErrorEmail] = useState("");
  const isEmail = validator.isEmail(email);

  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (email != "" && isEmail == true) {
      setDisabled(false);
    } else {
      setDisabled(true);
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
  }, [router, focusEmail, isEmail, email]);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setDisabled(true);

      const res = await sendverifyemail(email);

      if (res.status === 200 && res.message === "Email verified") {
        Cookies.set("email", email, { expires: 1 });
        Cookies.set("_forgot", true, { expires: 1 });
        router.push("/verifyemail");
        toast({
          title: "Verifikasi Email!",
          description: "Silahkan verifikasi email untuk perbarui password",
          status: "success",
          duration: 5000,
          position: "top",
          isClosable: true,
        });
      }

      if (res.status === 200 && res.message === "Email sent successfully") {
        Cookies.set("email", email, { expires: 1 });
        Cookies.set("_forgot", true, { expires: 1 });
        Cookies.set("_verified", false, { expires: 1 });
        router.push("/verifyemail");
        toast({
          title: "Aktivasi Akun!",
          description: "Silahkan aktivasi akun untuk perbarui password",
          status: "success",
          duration: 5000,
          position: "top",
          isClosable: true,
        });
      }

      if (res.status === 404 && res.message === "Email not found") {
        setIsLoading(false);
        setDisabled(false);
        toast({
          title: "Email Tidak Terdaftar!",
          description: "Silahkan lakukan registrasi",
          status: "error",
          duration: 5000,
          position: "top",
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box
      w="350px"
      h="max-content"
      bgColor="#393D43"
      borderRadius="40px"
      px="20px"
      py="30px"
    >
      <Stack direction="column" alignItems="center">
        <Text fontSize="25px" color="#FFFFFF" mt="10px" fontWeight="700">
          Masukkan Email
        </Text>
        <Text
          fontSize="13px"
          color="#FFFFFF"
          mt="33px"
          px="20px"
          textAlign="center"
        >
          Silahkan masukkan email anda, untuk mendapatkan kode OTP
        </Text>
      </Stack>
      <Box mt="20px">
        <form onSubmit={handleForgotPassword}>
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
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
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
  );
};

export default ForgotPassword;
