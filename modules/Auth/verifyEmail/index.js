import {
  Box,
  Button,
  HStack,
  PinInput,
  PinInputField,
  Stack,
  Text,
  useToast,
  Link,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import verifyemail from "./api/verifyemail";
import CountdownTimer from "./components/CountdownTimer";

const VerifyEmail = () => {
  const router = useRouter();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(true);

  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");

  useEffect(() => {
    const emailLocal = Cookies.get("email");

    if (emailLocal) {
      setEmail(emailLocal);
    } else {
      router.push("/");
    }

    if ((otp1 != "", otp2 != "", otp3 != "", otp4 != "")) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [router, otp1, otp2, otp3, otp4]);

  const code_otp = otp1 + otp2 + otp3 + otp4;

  const handleAktivasiAkun = async (e) => {
    e.preventDefault();
    try {
      const forgot = Cookies.get("_forgot");
      const verified = Cookies.get("_verified");

      const res = await verifyemail(email, code_otp);

      if (res.status === 200 && res.message === "Aktivasi Berhasil") {
        if (forgot && verified) {
          toast({
            title: "Aktivasi Akun Berhasil!",
            description: "Silahkan perbarui password",
            status: "success",
            duration: 5000,
            position: "top",
            isClosable: true,
          });
          router.push("/updatepassword");
        } else if (forgot) {
          toast({
            title: "Verifikasi Email Berhasil!",
            description: "Silahkan perbarui password",
            status: "success",
            duration: 5000,
            position: "top",
            isClosable: true,
          });
          router.push("/updatepassword");
        } else {
          Cookies.remove("email");
          Cookies.remove("_verified");
          Cookies.remove("_forgot");
          toast({
            title: "Aktivasi Akun Berhasil!",
            description: "Silahkan melakukan login",
            status: "success",
            duration: 5000,
            position: "top",
            isClosable: true,
          });
          router.push("/aktivasiakun");
        }
      } else {
        toast({
          title: "Aktivasi Akun Gagal!",
          description: "Kode OTP yang anda masukkan salah",
          status: "error",
          duration: 5000,
          position: "top",
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      w="350px"
      h="max-content"
      bgColor="#393D43"
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
          <Text textAlign="center" fontSize="13px" color="#FFFFFF" mt="10px">
            Kami telah mengirimkan kode OTP ke email {email}
          </Text>
        </Box>
        <form onSubmit={handleAktivasiAkun}>
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
                <CountdownTimer totalSec={30 * 1000} email={email} />
              </Text>
            </Box>
            <Box>
              <Button
                mt="10px"
                colorScheme="messenger"
                isDisabled={disabled}
                type="submit"
              >
                Kirim
              </Button>
            </Box>
            <Box>
              <Link
                fontSize="13px"
                color="#FF9567"
                onClick={() => {
                  router.push("/updateemailverify");
                }}
              >
                Perbarui email
              </Link>
            </Box>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};

export default VerifyEmail;
