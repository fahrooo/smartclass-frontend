import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import validator from "validator";

const FormRegistrasi2 = ({
  setFormRegistrasi,
  setEmail,
  setPassword,
  setConfPassword,
  email,
  password,
  confPassword,
  isLoading,
  handleRegister,
  disabled,
  setDisabled,
}) => {
  const router = useRouter();

  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const [focusConfPassword, setFocusConfPassword] = useState(false);

  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [msgErrorEmail, setMsgErrorEmail] = useState("");
  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const [msgErrorPassword, setMsgErrorPassword] = useState("");
  const [isErrorConfPassword, setIsErrorConfPassword] = useState(false);
  const [msgErrorConfPassword, setMsgErrorConfPassword] = useState("");

  const isPassword = validator.isStrongPassword(password);
  const isEmail = validator.isEmail(email);

  useEffect(() => {
    email != "" &&
    isEmail == true &&
    password != "" &&
    confPassword != "" &&
    password.length >= 8 &&
    confPassword == password
      ? setDisabled(false)
      : setDisabled(true);

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
    email,
    password,
    confPassword,
    focusPassword,
    focusEmail,
    focusConfPassword,
    setDisabled,
    isEmail,
    isPassword,
  ]);

  return (
    <Box w="350px" h="465px" bgColor="#393D43" borderRadius="40px">
      <Box display="flex" justifyContent="center">
        <Stack alignItems="center" mt="20px">
          <Text fontSize="27px" color="#FFFFFF" fontWeight="700">
            Register
          </Text>
          <Text fontSize="15px" color="#FFFFFF" mt="0">
            Selamat datang! Silahkan isikan data diri
          </Text>
        </Stack>
      </Box>
      <Box mx="25px" mt="10px">
        <form onSubmit={handleRegister}>
          <Box>
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
          </Box>
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
              type="submit"
              w="100%"
              colorScheme="messenger"
              isDisabled={disabled}
              isLoading={isLoading}
            >
              Register
            </Button>
          </Box>
        </form>
        <Stack direction="column" mt="15px" alignItems="center">
          <Text fontSize="13px" color="#FFFFFF">
            <Link
              color="messenger.400"
              onClick={() => {
                setFormRegistrasi(true);
              }}
              display="flex"
              alignItems="center"
              gap="1"
            >
              <BsArrowLeft /> Kembali
            </Link>
          </Text>
          <Text fontSize="13px" color="#FFFFFF">
            Sudah memiliki akun?{" "}
            <Link
              color="#FF9567"
              onClick={() => {
                router.push("/");
              }}
            >
              Silahkan Log In
            </Link>
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};

export default FormRegistrasi2;
