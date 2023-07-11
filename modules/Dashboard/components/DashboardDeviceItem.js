import {
  Badge,
  Box,
  Center,
  GridItem,
  Switch,
  Text,
  VStack,
  Icon,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  useDisclosure,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import unmuteaudio from "@/assets/images/streamplay.png";
import muteaudio from "@/assets/images/streamstop.png";
import qrcode from "@/assets/images/QRCode.png";
import mqttpublish from "../api/mqttpublish";
import mqttsubscribe from "../api/mqttsubscribe";
import { useRouter } from "next/router";
import QRCodeModal from "./Modal/QRCodeModal";
import { useMutation } from "@tanstack/react-query";
import updatecodeakses from "../api/updatecodeakses";
import generator from "generate-password";
import matchcodeakses from "../api/matchcodeakses";
import { postFetcherWT } from "@/common/utils/axios";

const DashboardDeviceItem = ({
  type,
  bgColor,
  colSpan,
  image,
  label,
  control,
  satuan,
  maxValue,
  minValue,
  gapValue,
  topic,
  turnOn,
  turnOff,
  defaultValue,
  idKelas,
}) => {
  const toast = useToast();
  const { pathname } = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [open, setOpen] = useState(false);

  const isActive = "/dashboard" === pathname ? true : false;

  const [power, setPower] = useState(false);
  const [value, setValue] = useState(Number(defaultValue));
  const [mute, setMute] = useState(false);

  const [showTooltip, setShowTooltip] = React.useState(false);

  const { mutate: mutateUpdateCodeAkses, isLoading: isLoadingUpdateCodeAkses } =
    useMutation(updatecodeakses);

  const { mutate: mutateMatchCodeAkses, isLoading: isLoadingMatchCodeAkses } =
    useMutation(matchcodeakses);

  useEffect(() => {
    setInterval(() => {
      if (type == "PINTU") {
        const generateQR = generator.generate({
          length: 6,
          numbers: true,
        });

        mutateUpdateCodeAkses({
          id: idKelas,
          code_akses: `Pindad-${generateQR}`,
        });
      }
    }, 10 * 1000);
  }, []);

  const handleQR = async () => {
    onOpen();
    const getCode = await mqttsubscribe({
      topic: `${topic}/${label.replace(" ", "-")}`,
    });
    if (getCode?.status == 200) {
      mutateMatchCodeAkses(
        {
          id: idKelas,
          code_akses: getCode?.message,
        },
        {
          onSuccess: async (res) => {
            if (res?.status == 200) {
              const postOpen = await mqttpublish({
                topic: `${topic}/${label.replace(" ", "-")}`,
                message: turnOn,
              });
              toast({
                title: "Berhasil Membuka Pintu",
                description: "Silahkan untuk segera masuk",
                status: "success",
                duration: 5000,
                position: "top",
                isClosable: true,
              });
              setOpen(true);
              setTimeout(() => {
                setOpen(false);
              }, 10000);
              onClose();
            } else {
              onClose();
              toast({
                title: "Maaf, QR Code Salah / Kadaluwarsa",
                description: "Silahkan coba lagi",
                status: "error",
                duration: 5000,
                position: "top",
                isClosable: true,
              });
            }
          },
        }
      );
    }
  };

  const handleSliderLampu = async (e) => {
    setValue(e);

    try {
      await mqttpublish({
        topic: `${topic}/${label.replace(" ", "-")}`,
        message: e.toString(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [intervalSubscribe, setIntervalSubscribe] = useState("");

  // useEffect(() => {
  //   if (type != "PINTU" && pathname == "/dashboard") {
  //     setIntervalSubscribe(
  //       setInterval(async () => {
  //         await postFetcherWT("/mqtt/subscribe", {
  //           topic: `${topic}/${label.replace(" ", "-")}/CALLBACK`,
  //         }).then((res) => {
  //           if (res?.message == turnOff) {
  //             setPower(false);
  //           } else {
  //             setPower(true);
  //           }
  //         });
  //       }, 1 * 1000)
  //     );
  //     intervalSubscribe;
  //   } else {
  //     clearInterval(intervalSubscribe);
  //   }
  // }, [type, pathname]);

  const handleUp = async () => {
    if (value == maxValue) {
      setValue(maxValue);
      try {
        await mqttpublish({
          topic: `${topic}/${label.replace(" ", "-")}`,
          message: value.toString(),
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      const upValue = value + gapValue;
      setValue(upValue);
      try {
        await mqttpublish({
          topic: `${topic}/${label.replace(" ", "-")}`,
          message: upValue.toString(),
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDown = async () => {
    if (value == minValue) {
      setValue(minValue);
      try {
        await mqttpublish({
          topic: `${topic}/${label.replace(" ", "-")}`,
          message: value.toString(),
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      const downValue = value - gapValue;
      setValue(downValue);
      try {
        await mqttpublish({
          topic: `${topic}/${label.replace(" ", "-")}`,
          message: downValue.toString(),
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [disabledPower, setDisabledPower] = useState(false);

  const handlePower = async () => {
    setPower(!power);
    setDisabledPower(true);
    setValue(defaultValue);

    try {
      await mqttpublish({
        topic: `${topic}/${label.replace(" ", "-")}`,
        message: !power ? turnOn : turnOff,
      });
      setTimeout(() => {
        setDisabledPower(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMute = () => {
    setMute(true);
  };

  const handleUnMute = () => {
    setMute(false);
  };

  return (
    <GridItem
      colSpan={colSpan}
      w="100%"
      h={{ base: "40", md: "44", xl: "48" }}
      color="black"
      bgColor={bgColor}
      borderRadius="30px"
      p={4}
    >
      <QRCodeModal isOpen={isOpen} onClose={onClose} id={idKelas} />
      <Box display="flex" justifyContent="space-between">
        {type === "PINTU" ? (
          <Text fontSize="15px" fontWeight="500">
            <Badge colorScheme={open ? "green" : "red"} borderRadius="10px">
              {open ? "Open" : "Close"}
            </Badge>
          </Text>
        ) : (
          <Text fontSize="15px" fontWeight="500">
            <Badge colorScheme={power ? "green" : "red"} borderRadius="10px">
              {power ? "ON" : "OFF"}
            </Badge>
          </Text>
        )}
        {type === "PINTU" ? (
          ""
        ) : (
          <Switch
            colorScheme="purple"
            isChecked={power}
            isDisabled={disabledPower}
            onChange={handlePower}
          />
        )}
      </Box>
      <Center h="70%">
        {type === "SPEAKER" && power == true ? (
          <VStack w="25px">
            <Box
              w="40px"
              onClick={mute ? handleUnMute : handleMute}
              cursor="pointer"
              ml={3}
            >
              <Image
                src={mute ? muteaudio : unmuteaudio}
                alt={mute ? "mute" : "unmute"}
              />
            </Box>
          </VStack>
        ) : (
          ""
        )}
        <Image src={image} alt={label} style={{ width: "65%" }} />
        {type === "PINTU" ? (
          <VStack w="25px">
            <Box
              w={{ base: "40px", md: "50px", xl: "60px" }}
              onClick={handleQR}
              cursor="pointer"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Image src={qrcode} alt="qrcode" />
              <Text fontSize={{ base: 8, md: 9, md: 10 }} fontWeight="bold">
                QR Code
              </Text>
            </Box>
          </VStack>
        ) : (
          ""
        )}
        {type === "LAMPU DIMMER" && power == true ? (
          <Slider
            aria-label="slider-ex-3"
            defaultValue={value}
            min={minValue}
            max={maxValue}
            step={gapValue}
            orientation="vertical"
            h="20"
            colorScheme={"purple"}
            ms={2}
            onChange={(e) => {
              handleSliderLampu(e);
            }}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <Tooltip
              hasArrow
              color="white"
              placement="top"
              isOpen={showTooltip}
              label={`${value}%`}
              bg="purple.500"
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
        ) : (
          ""
        )}
        {control == true && power == true && (
          <VStack mt={2} w="30px">
            <Icon
              as={MdOutlineKeyboardArrowUp}
              boxSize={6}
              bgColor="#AD4ED980"
              color="white"
              borderRadius="50%"
              _hover={{ bgColor: "purple.500" }}
              onClick={handleUp}
              cursor="pointer"
            />
            <Text fontWeight="500">
              {value}
              {satuan}
            </Text>
            <Icon
              as={MdOutlineKeyboardArrowDown}
              boxSize={6}
              bgColor="#AD4ED980"
              color="white"
              borderRadius="50%"
              _hover={{ bgColor: "purple.500" }}
              onClick={handleDown}
              cursor="pointer"
            />
          </VStack>
        )}
      </Center>
      <Center>
        <Text
          fontSize="13px"
          fontWeight="semibold"
          mt={{ base: "1", md: "1.5", xl: "2" }}
        >
          {label}
        </Text>
      </Center>
    </GridItem>
  );
};

export default DashboardDeviceItem;
