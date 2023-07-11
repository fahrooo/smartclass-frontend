import useAuthUserStore from "@/common/hooks/store/useAuthUserStore ";
import { Box, Text, Icon, useDisclosure, HStack } from "@chakra-ui/react";
import { formatDate } from "node-format-date";
import React, { useEffect, useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import { BsCalendarWeek, BsHeadset } from "react-icons/bs";
import Operator from "@/modules/Operator";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Booking from "@/modules/Booking";

const DashboardNavbar = () => {
  const router = useRouter();
  const {
    isOpen: isOpenOperator,
    onOpen: onOpenOperator,
    onClose: onCloseOperator,
  } = useDisclosure();
  const {
    isOpen: isOpenBooking,
    onOpen: onOpenBooking,
    onClose: onCloseBooking,
  } = useDisclosure();

  const session = useAuthUserStore((state) => state.session);

  const [nama, setNama] = useState("");
  const [disabledAdmin, setDisabledAdmin] = useState(true);

  const [now, setNow] = useState(new Date());
  const getDate = formatDate(now);
  const getHours = now.getHours();
  const getMinutes = now.getMinutes();

  const [date, setDate] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");

  useEffect(() => {
    setNama(session?.data?.nama);
    if (session?.data?.role == "super admin" || session?.data?.role == "admin") {
      setDisabledAdmin(false);
    } else {
      setDisabledAdmin(true);
    }
  }, [session]);

  useEffect(() => {
    setInterval(() => {
      setNow(new Date(), 3000);
    });
    setDate(getDate);
    setHours(getHours);
    setMinutes(getMinutes);
  }, [getDate, getHours, getMinutes]);
  return (
    <Box
      h={{ base: "20%", md: "15%" }}
      w={{ base: "100%", md: "60%" }}
      display="flex"
      justifyContent="space-between"
      flexDirection={{ base: "column", md: "row" }}
      gap={{ base: 0, md: 4 }}
    >
      <Box
        w={{ base: "100%", md: "60%", xl: "70%" }}
        h="100%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        py={4}
      >
        <Text
          color="#FFFFFF"
          fontSize={{ base: "md", md: "xl" }}
          fontWeight="700"
          mt={2}
        >
          HAI {nama}
        </Text>
        <HStack
          bgColor="#393D43"
          h={6}
          w="100%"
          borderRadius="15px"
          display="flex"
          justifyContent="end"
          alignItems="center"
          px={2}
          spacing={4}
        >
          {disabledAdmin == false && (
            <Icon
              as={BsHeadset}
              color="white"
              boxSize={"5"}
              _hover={{ bgColor: "#FFFFFF", color: "#393D43" }}
              cursor="pointer"
              borderRadius="xl"
              onClick={() => {
                onOpenOperator();
              }}
            />
          )}
          {disabledAdmin == false && (
            <Icon
              as={BsCalendarWeek}
              color="white"
              boxSize={"5"}
              _hover={{ bgColor: "#FFFFFF", color: "#393D43" }}
              cursor="pointer"
              onClick={() => {
                onOpenBooking();
              }}
            />
          )}
        </HStack>
      </Box>
      <Box w={{ base: "100%", md: "40%", xl: "25%" }} h="100%" py={2}>
        <Box
          bgColor="#393D43"
          h="100%"
          borderRadius="30px"
          textAlign="center"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Text color="#FFFFFF" fontSize="25px" fontWeight="700">
            {hours}:{minutes < 10 ? "0" + minutes : minutes}{" "}
            {hours >= 12 ? "PM" : "AM"}
          </Text>
          <Text color="#FFFFFF" fontSize="20px" fontWeight="400">
            {date}
          </Text>
        </Box>
      </Box>
      <Operator isOpen={isOpenOperator} onClose={onCloseOperator} />
      <Booking isOpen={isOpenBooking} onClose={onCloseBooking} />
    </Box>
  );
};

export default DashboardNavbar;
