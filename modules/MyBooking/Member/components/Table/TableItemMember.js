import putbooking from "@/modules/Booking/api/putbooking";
import rejectbooking from "@/modules/Booking/api/rejectbooking";
import matchcodeakses from "@/modules/Dashboard/api/matchcodeakses";
import mqttsubscribe from "@/modules/Dashboard/api/mqttsubscribe";
import updatecodeakses from "@/modules/Dashboard/api/updatecodeakses";
import {
  Badge,
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Text,
  VStack,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  MdClose,
  MdDelete,
  MdDone,
  MdEdit,
  MdPeople,
  MdQrCode2,
} from "react-icons/md";
import generator from "generate-password";
import QRCodeModal from "@/modules/Dashboard/components/Modal/QRCodeModal";
import mqttpublish from "@/modules/Dashboard/api/mqttpublish";

const TableItemMember = ({
  item,
  refetch,
  handleModalOpenMember,
  handleModalEditBooking,
  handleModalDeleteBooking,
  handleModalDetailBooking,
}) => {
  const toast = useToast();
  const hidden = useBreakpointValue({ base: true, md: false });

  const { mutate: mutateApprovedBooking, isLoading: isLoadingApprovedBooking } =
    useMutation(putbooking);

  const { mutate: mutateRejectedBooking, isLoading: isLoadingRejectedBooking } =
    useMutation(putbooking);

  const { mutate: mutateRejectBooking, isLoading: isLoadingRejectBooking } =
    useMutation(rejectbooking);

  const handleRejectbooking = () => {
    mutateRejectedBooking(
      {
        id: item?.booking?.id,
        id_user: item?.booking?.id_user,
        id_kelas: item?.booking?.id_kelas,
        id_waktu: item?.booking?.id_waktu,
        waktu_pemesanan: item?.booking?.waktu_pemesanan,
        is_booking: true,
        status: "cancel",
        keterangan: item?.booking?.keterangan,
      },
      {
        onSuccess: (res) => {
          if (res?.status === 200) {
            refetch();
            toast({
              title: "Cancel Booking Berhasil!",
              status: "success",
              duration: 5000,
              position: "top",
              isClosable: true,
            });
          } else {
            toast({
              title: "Cancel Booking Gagal!",
              status: "error",
              duration: 5000,
              position: "top",
              isClosable: true,
            });
          }
        },
      }
    );
  };

  const colorStatus = (status) => {
    if (status == "approved") {
      return "green";
    } else if (status == "waiting") {
      return "blue";
    } else if (status == "cancel") {
      return "orange";
    } else if (status == "rejected") {
      return "red";
    }
  };

  const now = new Date();
  const time = now.toLocaleTimeString();
  const date = now.toLocaleDateString();

  const {
    isOpen: isOpenQRCode,
    onOpen: onOpenQRCode,
    onClose: onCloseQRCode,
  } = useDisclosure();

  const { mutate: mutateUpdateCodeAkses, isLoading: isLoadingUpdateCodeAkses } =
    useMutation(updatecodeakses);

  const { mutate: mutateMatchCodeAkses, isLoading: isLoadingMatchCodeAkses } =
    useMutation(matchcodeakses);

  useEffect(() => {
    setInterval(() => {
      if (
        item?.booking?.status == "approved" &&
        item?.booking?.waktu?.time_start.substring(0, 2) == time.substring(0, 2)
      ) {
        const generateQR = generator.generate({
          length: 6,
          numbers: true,
        });

        mutateUpdateCodeAkses({
          id: item?.booking?.id_kelas,
          code_akses: `Pindad-${generateQR}`,
        });
      }
    }, 10 * 1000);
  }, []);

  const handleQR = async () => {
    onOpenQRCode();
    const getCode = await mqttsubscribe({
      topic: `${item?.booking?.classroom?.topic}/PINTU-UTAMA`,
    });
    if (getCode?.status == 200) {
      mutateMatchCodeAkses(
        {
          id: item?.booking?.id_kelas,
          code_akses: getCode?.message,
        },
        {
          onSuccess: async (res) => {
            if (res?.status == 200) {
              const postOpen = await mqttpublish({
                topic: `${item?.booking?.classroom?.topic}/PINTU-UTAMA`,
                message: "OPEN",
              });
              toast({
                title: "Berhasil Membuka Pintu",
                description: "Silahkan untuk segera masuk",
                status: "success",
                duration: 5000,
                position: "top",
                isClosable: true,
              });
              onCloseQRCode();
            } else {
              onCloseQRCode();
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

  return (
    <>
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: `repeat(8, 1fr)`,
        }}
        gap={6}
        className="isiTabel"
        rounded="lg"
        px={4}
        py={{ base: 4, md: 2 }}
        h="max-content"
        mt={"0.5"}
        alignItems="center"
        onClick={() => {
          handleModalDetailBooking(item?.booking?.id);
        }}
        _hover={{ cursor: { base: "pointer", md: "auto" } }}
        color={"black"}
      >
        <GridItem textAlign="center" overflow="hidden">
          <Text fontSize="sm">{item?.user?.nama}</Text>
        </GridItem>
        <GridItem textAlign="center" overflow="hidden">
          <Text fontSize="sm">{item?.booking?.classroom?.nama}</Text>
        </GridItem>
        <GridItem textAlign="center" overflow="hidden" hidden={hidden}>
          <Text fontSize="sm">
            {item?.booking?.classroom?.unit == null
              ? "-"
              : item?.booking?.classroom?.unit?.nama.toUpperCase()}
          </Text>
        </GridItem>
        <GridItem textAlign="center" overflow="hidden" hidden={hidden}>
          <Text fontSize="sm">{item?.booking?.waktu_pemesanan}</Text>
        </GridItem>
        <GridItem textAlign="center" overflow="hidden" hidden={hidden}>
          <Text fontSize="sm">
            {item?.booking?.waktu?.time_start.substring(0, 5)}
          </Text>
          <Text fontSize="sm">-</Text>
          <Text fontSize="sm">
            {item?.booking?.waktu?.time_end.substring(0, 5)}
          </Text>
        </GridItem>
        <GridItem textAlign="center" overflow="hidden" hidden={hidden}>
          <Badge
            colorScheme={colorStatus(item?.booking?.status)}
            borderRadius="lg"
          >
            {item?.booking?.status.toUpperCase()}
          </Badge>
        </GridItem>
        <GridItem textAlign="center" overflow="hidden" hidden={hidden}>
          <Text fontSize="sm">{item?.booking?.keterangan.toUpperCase()}</Text>
        </GridItem>
        <GridItem textAlign="center" overflow="hidden" hidden={hidden}>
          <HStack spacing={2} justifyContent="center">
            {item?.booking?.status == "waiting" && (
              <IconButton
                colorScheme="red"
                aria-label="Call Segun"
                icon={<MdClose />}
                size="sm"
                variant={"outline"}
                rounded={"full"}
                isLoading={isLoadingRejectedBooking}
                onClick={() => {
                  handleRejectbooking(item?.booking?.id);
                }}
              />
            )}
            {item?.booking?.status == "approved" &&
              new Date(item?.booking?.waktu_pemesanan).toLocaleDateString() ==
                date &&
              item?.booking?.waktu?.time_start.substring(0, 2) ==
                time.substring(0, 2) && (
                <IconButton
                  colorScheme="purple"
                  aria-label="Call Segun"
                  icon={<MdQrCode2 />}
                  size="sm"
                  onClick={handleQR}
                />
              )}
            {item?.booking?.status == "approved" &&
              new Date(item?.booking?.waktu_pemesanan).toLocaleDateString() !=
                date && <Text fontSize={"2xl"}>-</Text>}
          </HStack>
          {item?.booking?.status == "rejected" && (
            <Text fontSize={"2xl"}>-</Text>
          )}
          {item?.booking?.status == "cancel" && <Text fontSize={"2xl"}>-</Text>}
        </GridItem>
      </Grid>
      <QRCodeModal
        isOpen={isOpenQRCode}
        onClose={onCloseQRCode}
        id={item?.booking?.id_kelas}
      />
    </>
  );
};

export default TableItemMember;
