import {
  Box,
  Button,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { GrMail } from "react-icons/gr";
import { FaLock } from "react-icons/fa";
import { useEffect, useState } from "react";
import validator from "validator";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import login from "./api/login";
import sendverifyemail from "./api/sendverifyemail";
import useAuthUserStore from "@/common/hooks/store/useAuthUserStore ";

const Login = () => {
  const toast = useToast();
  const router = useRouter();

  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);

  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [msgErrorEmail, setMsgErrorEmail] = useState("");
  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const [msgErrorPassword, setMsgErrorPassword] = useState("");

  const isEmail = validator.isEmail(email);

  useEffect(() => {
    // setTimeout(() => {
    //   Cookies.remove("_id");
    //   Cookies.remove("email");
    //   Cookies.remove("_verified");
    //   Cookies.remove("_forgot");
    //   Cookies.remove("isLogin");
    // }, 1000);

    if (email != "" && isEmail == true && password != "") {
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

    if (focusPassword === true && password === "") {
      setIsErrorPassword(true);
      setMsgErrorPassword("Password harus diisi");
    } else {
      setIsErrorPassword(false);
      setMsgErrorPassword("");
    }
  }, [email, focusEmail, isEmail, focusPassword, password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setDisabled(true);

      const res = await login(email, password);

      if (res.status === 404 && res.message === "Email not found") {
        setIsLoading(false);
        setDisabled(false);
        toast({
          title: "Email Tidak Terdaftar",
          description: "Silahkan lakukan registrasi",
          status: "error",
          duration: 5000,
          position: "top",
          isClosable: true,
        });
      }

      if (res.status === 400 && res.message === "Email is not verified") {
        setIsLoading(false);
        setDisabled(false);
        toast({
          title: "Email Belum Terverifikasi",
          description: "Silahkan cek email anda untuk verifikasi email",
          status: "error",
          duration: 5000,
          position: "top",
          isClosable: true,
        });
        try {
          const res = await sendverifyemail(email);

          if (res.status === 200 && res.message === "Email sent successfully") {
            Cookies.set("email", email, { expires: 1 });
            router.push("/verifyemail");
          } else {
            toast({
              title: "Email Verifikasi Gagal Terkirim",
              description: "Silahkan lakukan kembali verifikasi email",
              status: "error",
              duration: 5000,
              position: "top",
              isClosable: true,
            });
          }
        } catch (error) {
          toast({
            title: "Gagal",
            description: error.message,
            status: "error",
            duration: 5000,
            position: "top",
            isClosable: true,
          });
        }
      }

      if (res.status === 400 && res.message === "Wrong Password") {
        setIsLoading(false);
        setDisabled(false);
        toast({
          title: "Login Gagal!",
          description: "Email atau password salah",
          status: "error",
          duration: 5000,
          position: "top",
          isClosable: true,
        });
      }

      if (res.status === 200 && res.message === "Berhasil Login") {
        Cookies.set("_id", res.data?.id, { expires: 1 });
        Cookies.set("isLogin", true, { expires: 1 });
        useAuthUserStore
          .getState()
          // .fetch(`https://qa-smartclass.pindad.co.id/be/me/${res.data?.id}`);
        .fetch(`http://103.155.246.50:5000/me/${res.data?.id}`);
        setIsLoading(false);
        setDisabled(false);
        toast({
          title: "Login Berhasil!",
          status: "success",
          duration: 5000,
          position: "top",
          isClosable: true,
        });
        router.push("/dashboard");
      }
    } catch (error) {
      setDisabled(false);
      setIsLoading(false);
    }
  };

  return (
    <Box
      w="350px"
      h="max-content"
      bgColor="#393D43"
      borderRadius="40px"
      py="5px"
    >
      <Box display="flex" justifyContent="center">
        <Text fontSize="27px" color="#FFFFFF" mt="33px" fontWeight="700">
          Login
        </Text>
      </Box>
      <Box m="25px">
        <form onSubmit={handleLogin}>
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
          <Box mt="20px">
            <FormControl isInvalid={isErrorPassword}>
              <Tooltip
                label={msgErrorPassword}
                placement="bottom-end"
                bg="red.600"
                isOpen={isErrorPassword}
              >
                <InputGroup>
                  <InputLeftElement
                    fontSize="20px"
                    color="gray.300"
                    pointerEvents="none"
                    children={<FaLock />}
                  />
                  <Input
                    type="password"
                    placeholder="********"
                    variant="flushed"
                    color="gray.300"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    onBlur={() => {
                      setFocusPassword(true);
                    }}
                  />
                </InputGroup>
              </Tooltip>
            </FormControl>
          </Box>
          <Box mt="20px" display="flex" justifyContent="end">
            <Text fontSize="13px" color="#FFFFFF">
              <Link
                onClick={() => {
                  router.push("/forgotpassword");
                }}
              >
                Lupa Password?
              </Link>
            </Text>
          </Box>
          <Box w="100%" mt="20px">
            <Button
              type="submit"
              w="100%"
              colorScheme="messenger"
              isDisabled={disabled}
              isLoading={isLoading}
            >
              Login
            </Button>
          </Box>
        </form>
        <Box mt="20px" display="flex" justifyContent="center">
          <Text fontSize="13px" color="#FFFFFF">
            Belum memiliki akun?{" "}
            <Link
              color="#FF9567"
              onClick={() => {
                router.push("registrasi");
              }}
            >
              Silahkan Register
            </Link>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
