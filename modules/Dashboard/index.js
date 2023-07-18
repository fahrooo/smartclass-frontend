import {
  Box,
  Center,
  Flex,
  Grid,
  SimpleGrid,
  Text,
  useToast,
  Icon,
  useDisclosure,
  Select,
  Skeleton,
  HStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import cctv from "@/assets/images/cctv.jpg";
import pintu from "@/assets/images/door.png";
import lampu from "@/assets/images/lamp.png";
import lampudimmer from "@/assets/images/lampudimmer.png";
import ac from "@/assets/images/ac.png";
import tv from "@/assets/images/tv.png";
import speaker from "@/assets/images/speaker.png";
import proyektor from "@/assets/images/proyektor.png";
import { IoMdNotifications } from "react-icons/io";
import { SiGoogleclassroom } from "react-icons/si";
import {
  BsChevronCompactDown,
  BsCalendarWeek,
  BsHeadset,
} from "react-icons/bs";
import { formatDate } from "node-format-date";
import MicrophoneStream from "microphone-stream";
import getUserMedia from "get-user-media-promise";
import DashboardSidebar from "@/common/components/Dashboard/DashboardSidebar";
import DashboardDeviceItem from "./components/DashboardDeviceItem";
import DashboardKelasItem from "./components/DashboardKelasItem";
import useAuthUserStore from "@/common/hooks/store/useAuthUserStore ";
import mqttpublish from "./api/mqttpublish";
import mqttsubscribe from "./api/mqttsubscribe";
import DashboardBottomBar from "@/common/components/Dashboard/DashboardBottomBar";
import Operator from "../Operator";
import getunits from "../Area/Units/api/getunits";
import getkelas from "../Area/Kelas/api/getkelas";
import getperangkatkelas from "../Device/Perangkat/api/getperangkatkelas";
import MessageNotFoundKelas from "@/common/utils/error/MessageNotFoundKelas";
import MessageNotFoundDevice from "@/common/utils/error/MessageNotFoundDevice";
import Cookies from "js-cookie";
import Booking from "../Booking";
import getoperator from "../Operator/api/getoperator";
import generateSidebarAdminItems from "@/common/utils/sidebarAdmin";
import generateSidebarOperatorItems from "@/common/utils/sidebarOperator";
import moment from "moment";
import getperangkatkelasbyschedule from "./api/getperangkatkelasbyschedule";

const Dashboard = () => {
  const router = useRouter();
  const toast = useToast();

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

  const [sidebar, setSidebar] = useState();

  useEffect(() => {
    let sidebar =
      session?.data?.role == "super admin" || session?.data?.role == "admin"
        ? setSidebar(generateSidebarAdminItems())
        : session?.data?.role == "operator"
        ? setSidebar(generateSidebarOperatorItems())
        : session?.data?.role == "peserta"
        ? setSidebar(generateSidebarPesertaItems())
        : null;
  }, [session?.data?.role]);

  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("");
  const [labelKelas, setLabelKelas] = useState("");
  const [unit, setUnit] = useState(session?.data?.id_unit);
  const [disabled, setDisabled] = useState(true);
  const [disabledOperator, setDisabledOperator] = useState(true);

  const { data: dataUnits, isLoading: isLoadingUnits } = getunits({
    filter_nama: false,
    nama: "",
    page: 1,
    limit: 9999,
  });

  const {
    data: resKelas,
    isLoading: isLoadingKelas,
    refetch: refetchGetKelas,
  } = getkelas({
    filter_nama: false,
    filter_unit: true,
    nama: "",
    id_unit: Number(unit),
    page: 1,
    limit: 9999,
  });

  const {
    data: resKelasOperator,
    isLoadingKelasOperator,
    refetch: refetchGetKelasOperator,
  } = getoperator({
    filter_nama: true,
    filter_unit: true,
    filter_kelas: false,
    nama: nama.toUpperCase(),
    id_unit: Number(unit),
    id_kelas: 0,
    page: 1,
    limit: 9999,
  });

  useEffect(() => {
    if (disabledOperator == false && resKelas?.status == 200) {
      setKelas(resKelas?.data[0].id);
      setLabelKelas(resKelas?.data[0].nama);
    }

    if (disabledOperator == true && resKelasOperator?.status == 200) {
      setKelas(resKelasOperator?.data[0]?.classroom?.id);
      setLabelKelas(resKelasOperator?.data[0]?.classroom?.nama);
    }
  }, [resKelas, resKelasOperator, disabledOperator]);

  const [now, setNow] = useState(new Date());
  const getDate = formatDate(now);
  const getHours = now.getHours();
  const getMinutes = now.getMinutes();

  const [date, setDate] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");

  useEffect(() => {
    setNama(session?.data?.nama);
    setUnit(session?.data?.id_unit);

    if (session?.data?.role == "super admin") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }

    if (session?.data?.role == "operator") {
      setDisabledOperator(true);
    } else {
      setDisabledOperator(false);
    }

    setInterval(() => {
      setNow(new Date(), 3000);
    });
    setDate(getDate);
    setHours(getHours);
    setMinutes(getMinutes);
  }, [getDate, getHours, getMinutes, session]);

  // const [stream, setStream] = useState(false);

  // const [stremMic, setStreamMic] = useState("");

  // const handlePlayStreamMic = () => {
  //   setStream(true);
  //   const micStream = new MicrophoneStream();
  //   getUserMedia({ video: false, audio: true })
  //     .then(function (stream) {
  //       setStreamMic(stream);
  //       micStream.setStream(stream);
  //       console.log("stream", stream);
  //       micStream.on("data", async function (chunk) {
  //         const raw = MicrophoneStream.toRaw(chunk);
  //         const buffer = new Uint8Array(raw.buffer);
  //         await mqttpublish({ topic: "BANGTI", message: buffer.toString() });
  //       });
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  // const handleStopStreamMic = () => {
  //   const micStream = new MicrophoneStream();
  //   micStream.setStream(stremMic);
  //   micStream.stop();
  //   setStream(false);
  // };

  const {
    data: resPerangkatKelas,
    isLoading: isLoadingPerangkatKelas,
    refetch: refetchGetPerangkatKelas,
  } = getperangkatkelas({
    filter_nama: false,
    filter_unit: true,
    filter_kelas: true,
    nama: "",
    id_unit: Number(unit),
    id_kelas: Number(kelas),
    page: 1,
    limit: 9999,
  });

  const imageDevice = (item) => {
    if (item == "PINTU") {
      return pintu;
    }

    if (item == "LAMPU") {
      return lampu;
    }

    if (item == "LAMPU DIMMER") {
      return lampudimmer;
    }

    if (item == "AC") {
      return ac;
    }

    if (item == "TV") {
      return tv;
    }

    if (item == "SPEAKER") {
      return speaker;
    }

    if (item == "PROYEKTOR") {
      return proyektor;
    }
  };

  const tglShcedule = moment().format("YYYY-MM-DD");
  const timeShcedule = moment().add(15, "m").format("HH:mm");

  const {
    data: resPerangkatKelasBySchedule,
    isLoading: isLoadingPerangkatKelasBySchedule,
    refetch: refetchGetPerangkatKelasBySchedule,
  } = getperangkatkelasbyschedule({
    waktu_pemesanan: tglShcedule,
    time_start: timeShcedule.substring(0, 2) + ":" + "00",
  });

  useEffect(() => {
    if (resPerangkatKelasBySchedule?.status == 200) {
      for (const perangkat of resPerangkatKelasBySchedule?.data) {
        try {
          mqttpublish({
            topic: `${perangkat?.topic}/${perangkat?.nama_perangkat.replace(
              " ",
              "-"
            )}`,
            message: `${perangkat?.turn_on}`,
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  }, [resPerangkatKelasBySchedule?.status]);

  return (
    <>
      <Flex
        maxH={{ base: "max-content", md: "100vh" }}
        minH={{ base: "max-content", md: "100vh" }}
        bgGradient="linear(to-bl, #5B7688, #F3D5C1 80%)"
        p={{ base: "10px", md: "35px" }}
        gap="40px"
        mb={{ base: "10", md: "0" }}
      >
        <DashboardSidebar items={sidebar} />
        <Box
          bgColor="#262A2D"
          w="100%"
          minH={{ base: "max-content", md: "100%" }}
          borderRadius="55px"
          px={{ base: "15px", md: "30px" }}
          py={{ base: "30px", md: "30px" }}
        >
          <Box
            display="flex"
            flexDirection={{ base: "column-reverse", md: "row" }}
            w="100%"
            h={{ base: "max-content", md: "100%" }}
            gap={4}
          >
            <Box
              w={{ base: "100%", md: "70%" }}
              h={{ base: "max-content", md: "100%" }}
            >
              <Box
                display={{ base: "none", md: "flex" }}
                w="100%"
                h="15%"
                gap={4}
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
                    {disabledOperator == false && (
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
                    {disabledOperator == false && (
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
              </Box>
              <Box w="100%">
                {isLoadingPerangkatKelas && (
                  <Skeleton mb={4} h="10" w="32" borderRadius="lg" />
                )}
                {resKelas?.status == 200 && !isLoadingPerangkatKelas && (
                  <Text
                    mb={4}
                    color="#FFFFFF"
                    fontSize="2xl"
                    fontWeight="semibold"
                  >
                    {labelKelas.toUpperCase()}
                  </Text>
                )}
                {isLoadingPerangkatKelas && (
                  <Grid
                    h={{ base: "max-content", md: "85%", xl: "85%" }}
                    overflowY="auto"
                    py={2}
                    templateColumns={{
                      base: "repeat(2, 1fr)",
                      md: "repeat(3, 1fr)",
                      xl: "repeat(4, 1fr)",
                    }}
                    gap={4}
                  >
                    <Skeleton
                      h={{ base: "40", md: "44", xl: "48" }}
                      w="100%"
                      borderRadius="30px"
                    />
                    <Skeleton
                      h={{ base: "40", md: "44", xl: "48" }}
                      w="100%"
                      borderRadius="30px"
                    />
                    <Skeleton
                      h={{ base: "40", md: "44", xl: "48" }}
                      w="100%"
                      borderRadius="30px"
                    />
                    <Skeleton
                      h={{ base: "40", md: "44", xl: "48" }}
                      w="100%"
                      borderRadius="30px"
                    />
                    <Skeleton
                      h={{ base: "40", md: "44", xl: "48" }}
                      w="100%"
                      borderRadius="30px"
                    />
                    <Skeleton
                      h={{ base: "40", md: "44", xl: "48" }}
                      w="100%"
                      borderRadius="30px"
                    />
                    <Skeleton
                      h={{ base: "40", md: "44", xl: "48" }}
                      w="100%"
                      borderRadius="30px"
                    />
                    <Skeleton
                      h={{ base: "40", md: "44", xl: "48" }}
                      w="100%"
                      borderRadius="30px"
                    />
                  </Grid>
                )}
                {resPerangkatKelas?.status == 404 && (
                  <Box mt={{ base: "4", md: "48" }}>
                    <MessageNotFoundDevice />
                  </Box>
                )}
                {resPerangkatKelas?.status == 200 && (
                  <Grid
                    h={{ base: "max-content", md: "85%", xl: "85%" }}
                    overflowY="auto"
                    py={2}
                    templateColumns={{
                      base: "repeat(2, 1fr)",
                      md: "repeat(3, 1fr)",
                      xl: "repeat(4, 1fr)",
                    }}
                    gap={4}
                  >
                    {resPerangkatKelas?.data.map((item, index) => (
                      <DashboardDeviceItem
                        key={index}
                        bgColor={
                          item?.datastream?.perangkat?.nama == "AC" ||
                          item?.datastream?.perangkat?.nama == "LAMPU" ||
                          item?.datastream?.perangkat?.nama == "LAMPU DIMMER"
                            ? "#7A95A9"
                            : "#EEEAFF"
                        }
                        colSpan={
                          item?.datastream?.perangkat?.nama == "AC" ? 2 : 1
                        }
                        image={imageDevice(item?.datastream?.perangkat?.nama)}
                        label={item?.nama}
                        control={
                          item?.datastream?.perangkat?.nama == "AC" ||
                          item?.datastream?.perangkat?.nama == "SPEAKER"
                            ? true
                            : false
                        }
                        satuan={
                          item?.datastream?.perangkat?.nama == "AC" ? "°C" : "%"
                        }
                        defaultValue={item?.datastream?.default_value}
                        maxValue={item?.datastream?.max_value}
                        minValue={item?.datastream?.min_value}
                        gapValue={
                          item?.datastream?.perangkat?.nama == "AC" ? 1 : 10
                        }
                        type={item?.datastream?.perangkat?.nama}
                        topic={item?.classroom?.topic}
                        turnOn={item?.datastream?.turn_on}
                        turnOff={item?.datastream?.turn_off}
                        idKelas={item?.classroom?.id}
                      />
                    ))}
                  </Grid>
                )}
              </Box>
            </Box>
            <Box
              w={{ base: "100%", md: "30%" }}
              h="100%"
              py={{ base: "0", md: "2" }}
            >
              <Box
                bgColor="#7A95A9"
                w="100%"
                h={{ base: "max-content", md: "100%" }}
                borderRadius="30px"
                p="20px"
              >
                {isLoadingUnits && <Skeleton h="30px" borderRadius="md" />}
                {dataUnits?.status == 200 && (
                  <Select
                    variant="unstyled"
                    h="35px"
                    color={unit != "" ? "#FFFFFF" : "#718096"}
                    onChange={(e) => {
                      setUnit(e.target.value);
                    }}
                    value={unit}
                    size="lg"
                    fontWeight="semibold"
                    isDisabled={disabled}
                    _disabled={{ color: "white", opacity: "100%" }}
                  >
                    {dataUnits?.data.map((item, index) => (
                      <option
                        style={{
                          color: "white",
                          backgroundColor: "#4A5568",
                          width: "200px",
                        }}
                        key={index}
                        value={item?.id}
                      >
                        {item?.nama}
                      </option>
                    ))}
                  </Select>
                )}
                <Center py={5}>
                  <Image
                    src={cctv}
                    alt="cctv"
                    style={{ borderRadius: "30px" }}
                    priority
                  />
                </Center>
                {disabledOperator == false && (
                  <Text fontSize="20px" color="white" fontWeight="700" mb={6}>
                    {resKelas?.totalRows == null ? 0 : resKelas?.totalRows}{" "}
                    Kelas
                  </Text>
                )}
                {disabledOperator == true && (
                  <Text fontSize="20px" color="white" fontWeight="700" mb={6}>
                    {resKelasOperator?.totalRows == null
                      ? 0
                      : resKelasOperator?.totalRows}{" "}
                    Kelas
                  </Text>
                )}
                <Center
                  h={{ base: "195px", md: "280px", xl: "185px" }}
                  overflowY="auto"
                >
                  {disabledOperator == false && resKelas?.status == 404 && (
                    <MessageNotFoundKelas />
                  )}
                  {disabledOperator == false && isLoadingKelas && (
                    <SimpleGrid
                      columns={{ base: 3, md: 2, xl: 3 }}
                      spacingY={{ base: 5, md: 4, xl: 4 }}
                      spacingX={{ base: 5, md: 6, xl: 8 }}
                      py={2}
                    >
                      <Skeleton h="80px" w="80px" borderRadius="25px" />
                      <Skeleton h="80px" w="80px" borderRadius="25px" />
                      <Skeleton h="80px" w="80px" borderRadius="25px" />
                      <Skeleton h="80px" w="80px" borderRadius="25px" />
                      <Skeleton h="80px" w="80px" borderRadius="25px" />
                      <Skeleton h="80px" w="80px" borderRadius="25px" />
                    </SimpleGrid>
                  )}
                  {disabledOperator == true &&
                    resKelasOperator?.status == 404 && <MessageNotFoundKelas />}
                  {disabledOperator == true && isLoadingKelasOperator && (
                    <SimpleGrid
                      columns={{ base: 3, md: 2, xl: 3 }}
                      spacingY={{ base: 5, md: 4, xl: 4 }}
                      spacingX={{ base: 5, md: 6, xl: 8 }}
                      py={2}
                    >
                      <Skeleton h="80px" w="80px" borderRadius="25px" />
                      <Skeleton h="80px" w="80px" borderRadius="25px" />
                      <Skeleton h="80px" w="80px" borderRadius="25px" />
                      <Skeleton h="80px" w="80px" borderRadius="25px" />
                      <Skeleton h="80px" w="80px" borderRadius="25px" />
                      <Skeleton h="80px" w="80px" borderRadius="25px" />
                    </SimpleGrid>
                  )}
                  {disabledOperator == false && resKelas?.status == 200 && (
                    <SimpleGrid
                      columns={{ base: 3, md: 2, xl: 3 }}
                      spacingY={{ base: 5, md: 4, xl: 4 }}
                      spacingX={{ base: 5, md: 6, xl: 8 }}
                      h="full"
                    >
                      {disabledOperator == false &&
                        resKelas?.data.map((item, index) => (
                          <DashboardKelasItem
                            key={index}
                            label={item?.nama}
                            id={item?.id}
                            icon={SiGoogleclassroom}
                            kelas={kelas}
                            setKelas={setKelas}
                            setLabelKelas={setLabelKelas}
                          />
                        ))}
                    </SimpleGrid>
                  )}
                  {disabledOperator == true &&
                    resKelasOperator?.status == 200 && (
                      <SimpleGrid
                        columns={{ base: 3, md: 2, xl: 3 }}
                        spacingY={{ base: 5, md: 4, xl: 4 }}
                        spacingX={{ base: 5, md: 6, xl: 8 }}
                        h="full"
                      >
                        {disabledOperator == true &&
                          resKelasOperator?.data.map((item, index) => (
                            <DashboardKelasItem
                              key={index}
                              label={item?.classroom?.nama}
                              id={item?.classroom?.id}
                              icon={SiGoogleclassroom}
                              kelas={kelas}
                              setKelas={setKelas}
                              setLabelKelas={setLabelKelas}
                            />
                          ))}
                      </SimpleGrid>
                    )}
                </Center>
                {disabledOperator == false && resKelas?.totalRows > 6 && (
                  <Box display="flex" justifyContent="center" mt={2}>
                    <Icon as={BsChevronCompactDown} boxSize={8} color="white" />
                  </Box>
                )}
                {disabledOperator == true &&
                  resKelasOperator?.totalRows > 6 && (
                    <Box display="flex" justifyContent="center" mt={2}>
                      <Icon
                        as={BsChevronCompactDown}
                        boxSize={8}
                        color="white"
                      />
                    </Box>
                  )}
              </Box>
            </Box>
            <Box
              display={{ base: "block", md: "none" }}
              w="100%"
              h="15%"
              gap={4}
            >
              <Box
                w={{ base: "100%", md: "60%", xl: "75%" }}
                h="100%"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                py={2}
              >
                <Text
                  color="#FFFFFF"
                  fontSize={{ base: "md", md: "xl" }}
                  fontWeight="700"
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
                  {disabledOperator == false && (
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
                  {disabledOperator == false && (
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
            </Box>
          </Box>
        </Box>
        <Operator isOpen={isOpenOperator} onClose={onCloseOperator} />
        <Booking isOpen={isOpenBooking} onClose={onCloseBooking} />
      </Flex>
      <DashboardBottomBar items={sidebar} />
    </>
  );
};

export default Dashboard;
