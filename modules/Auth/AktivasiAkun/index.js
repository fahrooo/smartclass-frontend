import { Box, Stack, Text, Button } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import success from "@/assets/images/success.png";

const AktivasiAkun = () => {
  const router = useRouter();

  return (
    <Box
      w="350px"
      h="max-content"
      bgColor="#393D43"
      borderRadius="40px"
      p="20px"
    >
      <Stack direction="column" alignItems="center">
        <Box w="100px" h="100px">
          <Image src={success} alt="success" />
        </Box>
        <Box>
          <Text fontSize="27px" color="#FFFFFF" fontWeight="700">
            Selamat!
          </Text>
        </Box>
        <Box>
          <Text fontSize="15px" color="#FFFFFF">
            Aktivasi Akun Berhasil, Silahkan Login
          </Text>
        </Box>
        <Box>
          <Button
            mt="10px"
            w="100%"
            colorScheme="messenger"
            onClick={() => {
              router.push("/");
            }}
          >
            Login
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default AktivasiAkun;
