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
import updateemailverify from "./api/updateemailverify";

const UpdateEmailVerify = () => {
  const router = useRouter();

  const [oldEmail, setOldEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [focusEmail, setFocusEmail] = useState(false);
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [msgErrorEmail, setMsgErrorEmail] = useState("");
  const isEmail = validator.isEmail(newEmail);

  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const oldemail = Cookies.get("email");
    if (oldemail) {
      setOldEmail(oldemail);
    } else {
      router.push("/");
    }

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
  }, [router, focusEmail, isEmail, newEmail]);

  const toast = useToast();

  const handleUpdateEmail = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setDisabled(true);

      const res = await updateemailverify(newEmail, oldEmail);

      if (res.status === 200 && res.message === "Email updated successfuly") {
        Cookies.set("email", newEmail, { expires: 1 });
        router.push("/verifyemail");
        toast({
          title: "Verifikasi Email!",
          description: "Silahkan verifikasi email",
          status: "success",
          duration: 5000,
          position: "top",
          isClosable: true,
        });
      } else {
        toast({
          title: "Perbarui Email Gagal!",
          description: "Silahkan kirimkan email baru anda kembali",
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
          Perbarui Email
        </Text>
        <Text fontSize="13px" color="#FFFFFF" mt="33px">
          Silahkan masukkan email anda
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
  );
};

export default UpdateEmailVerify;
