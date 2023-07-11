import {
  Box,
  Button,
  HStack,
  IconButton,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import InfoPribadiModal from "./components/Modal/InfoPribadiModal";
import { getFetchcer } from "@/common/utils/axios";
import useAuthUserStore from "@/common/hooks/store/useAuthUserStore ";
import VerifyEmailModal from "./components/Modal/VerifyEmailModal";
import EditEmailModal from "./components/Modal/EditEmailModal";
import CheckPasswordModal from "./components/Modal/CheckPasswordModal";
import EditPasswordModal from "./components/Modal/EditPasswordModal";
import logout from "./api/logout";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import EditMqttModal from "./components/Modal/EditMqttModal";

const Settings = () => {
  const toast = useToast();
  const router = useRouter();

  const session = useAuthUserStore((state) => state.session);

  const [data, setData] = useState({});
  const [dataMqtt, setDataMqtt] = useState({});
  const [id, setId] = useState(0);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setId(Number(session?.data?.id));
    if (session?.data?.role == "super admin") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [session]);

  const {
    isOpen: isOpenInfoPribadiModal,
    onOpen: onOpenInfoPribadiModal,
    onClose: onCloseInfoPribadiModal,
  } = useDisclosure();

  const {
    isOpen: isOpenEditEmail,
    onOpen: onOpenEditEmail,
    onClose: onCloseEditEmail,
  } = useDisclosure();

  const {
    isOpen: isOpenVerifyEmail,
    onOpen: onOpenVerifyEmail,
    onClose: onCloseVerifyEmail,
  } = useDisclosure();

  const {
    isOpen: isOpenCheckPassword,
    onOpen: onOpenCheckPassword,
    onClose: onCloseCheckPassword,
  } = useDisclosure();

  const {
    isOpen: isOpenEditPassword,
    onOpen: onOpenEditPassword,
    onClose: onCloseEditPassword,
  } = useDisclosure();

  const {
    isOpen: isOpenEditMqtt,
    onOpen: onOpenEditMqtt,
    onClose: onCloseEditMqtt,
  } = useDisclosure();

  const handleModalEditInfoPribadi = () => {
    const url = `/users/${id}`;
    const res = getFetchcer(url).then((res) => setData(res));
    onOpenInfoPribadiModal();
  };

  const handleModalEditEmail = () => {
    onOpenEditEmail();
  };

  const handleModalEditPassword = () => {
    onOpenCheckPassword();
  };

  const handleModalEditMqtt = () => {
    const url = `/mqtt`;
    const res = getFetchcer(url).then((res) => setDataMqtt(res));
    onOpenEditMqtt();
  };

  const handleLogout = async (e) => {
    e.preventDefault();

    const res = await logout();

    if (res?.status === 200) {
      Cookies.remove("email");
      Cookies.remove("isLogin");
      Cookies.remove("_id");
      toast({
        title: "Logout Berhasil!",
        status: "success",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
      router.push("/");
      router.reload();
    } else {
      toast({
        title: "Logout Gagal!",
        description: "Silahkan coba lagi",
        status: "error",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
    }
  };

  return (
    <Box
      display="flex"
      flexDir="column"
      justifyContent={{ base: "normal", md: "space-between" }}
      h="full"
    >
      <Box w="full">
        <Text
          w="max-content"
          color="#e0e0e0"
          fontSize="2xl"
          fontWeight="semibold"
        >
          SETTINGS
        </Text>
        <Box py={4}>
          <Text w="max-content" color="#bdbdbd" fontSize="sm">
            Pengaturan Akun
          </Text>
          <Box w="full" py={2}>
            <Box w="full" color="#e0e0e0" bgColor="#212121" borderRadius="lg">
              <HStack
                justifyContent="space-between"
                h={10}
                _hover={{ bgColor: "#262A2D", borderRadius: "lg" }}
                cursor="pointer"
                onClick={handleModalEditInfoPribadi}
              >
                <Text fontSize="md" ml={2}>
                  Info Pribadi
                </Text>
                <Text fontSize="2xl">
                  <MdKeyboardArrowRight />
                </Text>
              </HStack>
            </Box>
          </Box>
          <Text w="max-content" color="#bdbdbd" fontSize="sm">
            Pengaturan Keamanan
          </Text>
          <Box w="full" py={2}>
            <Box w="full" color="#e0e0e0" bgColor="#212121" borderRadius="lg">
              <HStack
                justifyContent="space-between"
                h={10}
                _hover={{ bgColor: "#262A2D", borderRadius: "lg" }}
                cursor="pointer"
                onClick={handleModalEditEmail}
              >
                <Text fontSize="md" ml={2}>
                  Ganti Email
                </Text>
                <Text fontSize="2xl">
                  <MdKeyboardArrowRight />
                </Text>
              </HStack>
              <HStack
                justifyContent="space-between"
                h={10}
                _hover={{ bgColor: "#262A2D", borderRadius: "lg" }}
                cursor="pointer"
                onClick={handleModalEditPassword}
              >
                <Text fontSize="md" ml={2}>
                  Ganti Password
                </Text>
                <Text fontSize="2xl">
                  <MdKeyboardArrowRight />
                </Text>
              </HStack>
            </Box>
          </Box>
          {disabled == false && (
            <Box>
              <Text w="max-content" color="#bdbdbd" fontSize="sm">
                Pengaturan Koneksi
              </Text>
              <Box w="full" py={2}>
                <Box
                  w="full"
                  color="#e0e0e0"
                  bgColor="#212121"
                  borderRadius="lg"
                >
                  <HStack
                    justifyContent="space-between"
                    h={10}
                    _hover={{ bgColor: "#262A2D", borderRadius: "lg" }}
                    cursor="pointer"
                    onClick={handleModalEditMqtt}
                  >
                    <Text fontSize="md" ml={2}>
                      MQTT
                    </Text>
                    <Text fontSize="2xl">
                      <MdKeyboardArrowRight />
                    </Text>
                  </HStack>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      <Box py={4} display="flex" justifyContent="center">
        <Button colorScheme="red" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      <InfoPribadiModal
        isOpen={isOpenInfoPribadiModal}
        onClose={onCloseInfoPribadiModal}
        data={data}
      />
      <EditEmailModal
        isOpen={isOpenEditEmail}
        onClose={onCloseEditEmail}
        onOpenVerifyEmail={onOpenVerifyEmail}
      />
      <VerifyEmailModal
        isOpen={isOpenVerifyEmail}
        onClose={onCloseVerifyEmail}
      />
      <CheckPasswordModal
        isOpen={isOpenCheckPassword}
        onClose={onCloseCheckPassword}
        onOpenEditPassword={onOpenEditPassword}
      />
      <EditPasswordModal
        isOpen={isOpenEditPassword}
        onClose={onCloseEditPassword}
      />
      <EditMqttModal
        isOpen={isOpenEditMqtt}
        onClose={onCloseEditMqtt}
        data={dataMqtt}
      />
    </Box>
  );
};

export default Settings;
