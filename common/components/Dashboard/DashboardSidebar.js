import { Box, Center, Text, VStack, Button } from "@chakra-ui/react";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import DashboardSidebarItem from "./DashboardSidebarItem";

const DashboardSidebar = ({ items }) => {
  const { pathname } = useRouter();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const result = await axios.delete("http://localhost:5000/logout");

      if (result?.status === 200) {
        Cookies.remove("email");
        Cookies.remove("role");
        Cookies.remove("nama");
        Cookies.remove("unit");
        Cookies.remove("isLogin");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      as="aside"
      display={{ base: "none", md: "block" }}
      bgColor="#262A2D"
      width="123px"
      borderRadius="40px"
    >
      <Center mt="31px" display="flex" flexDirection="column">
        <Box w="50px">
          <Image src={logo} alt="logo" priority />
        </Box>
        <Text
          fontSize="12px"
          color="#FFFFFF"
          fontWeight="bold"
          textAlign="center"
          mt="10px"
        >
          Innovation Connect
        </Text>
      </Center>
      <VStack mt="30px" textAlign="center" gap={3}>
        {items?.map((item, index) => (
          <DashboardSidebarItem key={index} item={item} pathname={pathname} />
        ))}
      </VStack>
    </Box>
  );
};

export default DashboardSidebar;
