import useAuthUserStore from "@/common/hooks/store/useAuthUserStore ";
import {
  Box,
  Button,
  DarkMode,
  FormControl,
  Input,
  LightMode,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import putmqtt from "../../api/putmqtt";
import { useMutation } from "@tanstack/react-query";

const EditMqttModal = ({ onClose, isOpen, data }) => {
  const toast = useToast();

  const [id, setId] = useState("");
  const [mqtt, setMqtt] = useState("");
  const [focusMqtt, setFocusMqtt] = useState("");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (data?.status == 200) {
      setId(data?.data?.id);
      setMqtt(data?.data?.nama);
    }
  }, [data]);

  useEffect(() => {
    if (mqtt != "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [mqtt]);

  const isErrorMQTT = focusMqtt == true && mqtt == "";

  const { mutate: mutateEditMqtt, isLoading: isLoadingEditMqtt } =
    useMutation(putmqtt);

  const handleEditMqtt = async (e) => {
    e.preventDefault();

    mutateEditMqtt(
      {
        id: id,
        nama: mqtt,
      },
      {
        onSuccess: (res) => {
          if (res?.status === 200) {
            toast({
              title: "Ubah Server MQTT Berhasil!",
              status: "success",
              duration: 5000,
              position: "top",
              isClosable: true,
            });
            onClose();
          } else {
            toast({
              title: "Ubah Server MQTT Gagal!",
              description: "Silahkan coba kembali",
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

  return (
    <DarkMode>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent color="#FFFFFF" m={2}>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <LightMode>
              <form onSubmit={handleEditMqtt}>
                <Box
                  w="full"
                  h="max-content"
                  bgColor="#212121"
                  borderRadius="40px"
                  p="20px"
                >
                  <Stack direction="column" alignItems="center" w="full">
                    <Box>
                      <Text fontSize="20px" color="#FFFFFF" fontWeight="700">
                        Ubah Server MQTT
                      </Text>
                    </Box>
                    <Box w="full">
                      <Box mt={4} w="full">
                        <FormControl isInvalid={isErrorMQTT}>
                          <Tooltip
                            label="MQTT harus diisi"
                            placement="bottom-end"
                            bg="red.600"
                            isOpen={isErrorMQTT}
                          >
                            <Input
                              type="text"
                              w="full"
                              variant="flushed"
                              placeholder="Server MQTT"
                              value={mqtt}
                              onChange={(e) => {
                                setMqtt(e.target.value);
                              }}
                              onBlur={() => {
                                setFocusMqtt(true);
                              }}
                            />
                          </Tooltip>
                        </FormControl>
                      </Box>
                    </Box>
                    <Box w="100%">
                      <Button
                        w="100%"
                        mt="10px"
                        colorScheme="messenger"
                        isLoading={isLoadingEditMqtt}
                        isDisabled={disabled}
                        type="submit"
                      >
                        Simpan
                      </Button>
                    </Box>
                  </Stack>
                </Box>
              </form>
            </LightMode>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </DarkMode>
  );
};

export default EditMqttModal;
