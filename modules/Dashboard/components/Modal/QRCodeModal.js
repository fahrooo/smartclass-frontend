import getkelasbyid from "@/modules/Area/Kelas/api/getkelasbyid";
import {
  Box,
  Center,
  DarkMode,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";

const QRCodeModal = ({ isOpen, onClose, id }) => {
  const {
    data: resKelas,
    isLoading: isLoadingKelas,
    refetch: refetchGetKelas,
  } = getkelasbyid({
    id: Number(id),
  });

  const [intervalKelas, setIntervalKelas] = useState("");

  useEffect(() => {
    if (isOpen == true) {
      setIntervalKelas(
        setInterval(() => {
          refetchGetKelas();
        }, 1000)
      );
      intervalKelas;
    } else {
      clearInterval(intervalKelas);
    }
  }, [isOpen]);

  return (
    <DarkMode>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent m={2} color="white">
          <ModalHeader>QR Code</ModalHeader>
          <ModalCloseButton />
          <ModalBody m={2}>
            {resKelas?.status == 200 && (
              <Box bgColor="black" p={2}>
                <Center
                  display="flex"
                  flexDirection="column"
                  bgColor="white"
                  mt={4}
                  mx={4}
                >
                  <Box py={4}>
                    <QRCodeSVG value={resKelas?.data?.code_akses} size="200" />
                  </Box>
                </Center>
                <Center>
                  <Text
                    fontSize={{ base: "3xl", md: "5xl" }}
                    fontWeight="700"
                    color="white"
                  >
                    SCAN ME
                  </Text>
                </Center>
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </DarkMode>
  );
};

export default QRCodeModal;
