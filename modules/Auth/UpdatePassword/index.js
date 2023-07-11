import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import validator from "validator";
import updatepassword from "./api/updatepassword";

const UpdatePassword = () => {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const [focusPassword, setFocusPassword] = useState(false);
  const [focusConfPassword, setFocusConfPassword] = useState(false);

  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const [msgErrorPassword, setMsgErrorPassword] = useState("");

  const [isErrorConfPassword, setIsErrorConfPassword] = useState(false);
  const [msgErrorConfPassword, setMsgErrorConfPassword] = useState("");

  const isPassword = validator.isStrongPassword(password);

  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (
      password != "" &&
      confPassword != "" &&
      password.length >= 8 &&
      confPassword == password
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }

    if (focusPassword === true && password === "") {
      setIsErrorPassword(true);
      setMsgErrorPassword("Password harus diisi");
    } else if (focusPassword === true && password.length < 8) {
      setIsErrorPassword(true);
      setMsgErrorPassword("Password harus 8 karakter");
    } else if (focusPassword === true && isPassword == false) {
      setIsErrorPassword(true);
      setMsgErrorPassword(
        "Password harus terdapat 1 huruf besar, 1 huruf kecil, 1 angka dan 1 simbol"
      );
    } else {
      setIsErrorPassword(false);
      setMsgErrorPassword("");
    }

    if (focusConfPassword === true && confPassword === "") {
      setIsErrorConfPassword(true);
      setMsgErrorConfPassword("Confirm Password harus diisi");
    } else if (focusConfPassword === true && confPassword != password) {
      setIsErrorConfPassword(true);
      setMsgErrorConfPassword("Confirm Password tidak sama");
    } else {
      setIsErrorConfPassword(false);
      setMsgErrorConfPassword("");
    }
  }, [
    router,
    password,
    confPassword,
    focusConfPassword,
    focusPassword,
    isPassword,
  ]);

  const toast = useToast();

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    try {
      const email = Cookies.get("email");

      setIsLoading(true);
      setDisabled(true);

      const res = await updatepassword(email, password);

      if (
        res.status === 200 &&
        res.message === "Password updated successfully"
      ) {
        Cookies.remove("_forgot");
        Cookies.remove("email");
        toast({
          title: "Perbarui Password Berhasil!",
          description: "Silahkan melakukan login",
          status: "success",
          duration: 5000,
          position: "top",
          isClosable: true,
        });
        router.push("/");
      }

      if (res.status === 400 && res.message === "Password update failed") {
        setIsLoading(false);
        setDisabled(false);
        toast({
          title: "Perbarui Password Gagal!",
          description: "Silahkan coba kembali",
          status: "success",
          duration: 5000,
          position: "top",
          isClosable: true,
        });
      }
    } catch (error) {
      setIsLoading(false);
      setDisabled(false);
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
          Perbarui Password
        </Text>
        <Text
          fontSize="13px"
          color="#FFFFFF"
          mt="33px"
          px="20px"
          textAlign="center"
        >
          Silahkan masukkan password baru anda
        </Text>
      </Stack>
      <Box mt="20px">
        <form onSubmit={handleUpdatePassword}>
          <Box mt="15px">
            <FormControl isInvalid={isErrorPassword}>
              <FormLabel fontSize="15px" color="#FFFFFF" fontWeight="400">
                Password
              </FormLabel>
              <Tooltip
                label={msgErrorPassword}
                placement="bottom-end"
                bg="red.600"
                isOpen={isErrorPassword}
              >
                <Input
                  variant="flushed"
                  type="password"
                  h="35px"
                  color="#FFFFFF"
                  placeholder="********"
                  value={password}
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
          <Box mt="15px">
            <FormControl isInvalid={isErrorConfPassword}>
              <FormLabel fontSize="15px" color="#FFFFFF" fontWeight="400">
                Confirm Password
              </FormLabel>
              <Tooltip
                label={msgErrorConfPassword}
                placement="bottom-end"
                bg="red.600"
                isOpen={isErrorConfPassword}
              >
                <Input
                  variant="flushed"
                  type="password"
                  h="35px"
                  color="#FFFFFF"
                  placeholder="********"
                  value={confPassword}
                  onChange={(e) => {
                    setConfPassword(e.target.value);
                  }}
                  onBlur={() => {
                    setFocusConfPassword(true);
                  }}
                />
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

export default UpdatePassword;
