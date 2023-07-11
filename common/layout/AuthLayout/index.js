import { Box, Stack, Text } from "@chakra-ui/react";
import background from "@/assets/images/background.png";
import logo from "@/assets/images/logo.png";
import Image from "next/image";

const urlBackground = `url('${background.src}')`;

const AuthLayout = ({ children }) => {
  return (
    <Box>
      <Box
        w="100%"
        h="100vh"
        bgGradient="linear(to-b, #355D77 20%, rgba(150, 155, 158, 0.389207), rgba(91, 118, 136, 0))"
        position="absolute"
        borderBottomRadius="50%"
        filter="auto"
        blur="1px"
        top="-20px"
      />
      <Box
        bgImage={urlBackground}
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        h="100vh"
        display="flex"
        pt={"14"}
        justifyContent="center"
      >
        <Box position="absolute">
          <Box mb="50px" display="flex" justifyContent="center">
            <Stack direction="column" alignItems="center">
              <Image src={logo} alt="logo" priority />
              <Text fontSize="15px" color="#FFFFFF" fontWeight="bold">
                Innovation Connect
              </Text>
            </Stack>
          </Box>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
