import {
  Button,
  DarkMode,
  FormControl,
  FormLabel,
  Input,
  LightMode,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Tooltip,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import putdatastream from "../../api/putdatastream";

const EditDatastreamModal = ({
  onClose,
  isOpen,
  refetch,
  dataPerangkat,
  data,
  onCloseDetailDatastream,
}) => {
  const toast = useToast();
  const formEditDatastream = useRef();

  const [disabled, setDisabled] = useState(true);

  const [id, setId] = useState("");
  const [perangkat, setPerangkat] = useState("");
  const [nama, setNama] = useState("");
  const [turnOn, setTurnOn] = useState("");
  const [turnOff, setTurnOff] = useState("");
  const [defaultValue, setDefaultValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [minValue, setMinValue] = useState("");

  const { mutate: mutatePutDatastream, isLoading: isLoadingPutDatastream } =
    useMutation(putdatastream);

  const [focusPerangkat, setFocusPerangkat] = useState(false);
  const [focusNama, setFocusNama] = useState(false);
  const [focusTurnOn, setFocusTurnOn] = useState(false);
  const [focusTurnOff, setFocusTurnOff] = useState(false);

  const isErrorPerangkat = focusPerangkat === true && perangkat === "";
  const isErrorNama = focusNama === true && nama === "";
  const isErrorTurnOn = focusTurnOn === true && turnOn === "";
  const isErrorTurnOff = focusTurnOff === true && turnOff === "";

  useEffect(() => {
    if (data?.status == 200) {
      setId(data?.data?.id);
      setPerangkat(data?.data?.perangkat?.id);
      setNama(data?.data?.nama);
      setTurnOn(data?.data?.turn_on);
      setTurnOff(data?.data?.turn_off);
      setDefaultValue(data?.data?.default_value);
      setMaxValue(data?.data?.max_value);
      setMinValue(data?.data?.min_value);
    }
  }, [data]);

  useEffect(() => {
    perangkat != "" && nama != "" && turnOn != "" && turnOff != ""
      ? setDisabled(false)
      : setDisabled(true);
  }, [perangkat, nama, turnOn, turnOff]);

  const handleEditDatastream = (e) => {
    e.preventDefault();

    mutatePutDatastream(
      {
        id: id,
        id_perangkat: Number(perangkat),
        nama: nama.toUpperCase(),
        turn_on: turnOn.toUpperCase(),
        turn_off: turnOff.toUpperCase(),
        default_value: Number(defaultValue),
        max_value: Number(maxValue),
        min_value: Number(minValue),
      },
      {
        onSuccess: (res) => {
          if (res?.status === 200) {
            refetch();
            toast({
              title: "Edit Datastream Berhasil!",
              status: "success",
              duration: 5000,
              position: "top",
              isClosable: true,
            });
            onClose();
            onCloseDetailDatastream();
            formEditDatastream.current?.reset();
          } else {
            toast({
              title: "Edit Datastream Gagal!",
              description: "Datastream sudah ada",
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
        <ModalContent color="white" m={2}>
          <ModalHeader>EDIT DATASTREAM</ModalHeader>
          <ModalCloseButton />
          <LightMode>
            <form ref={formEditDatastream} onSubmit={handleEditDatastream}>
              <ModalBody>
                <VStack spacing={4}>
                  <FormControl isInvalid={isErrorPerangkat}>
                    <FormLabel fontSize="15px" color="#FFFFFF" fontWeight="400">
                      Perangkat
                    </FormLabel>
                    <Tooltip
                      label="Perangkat harus diisi"
                      placement="bottom-end"
                      bg="red.600"
                      isOpen={isErrorPerangkat}
                    >
                      <Select
                        variant="flushed"
                        h="35px"
                        color={perangkat != "" ? "#FFFFFF" : "#718096"}
                        onChange={(e) => {
                          setPerangkat(e.target.value);
                        }}
                        onBlur={() => {
                          setFocusPerangkat(true);
                        }}
                        value={perangkat}
                      >
                        <option
                          style={{
                            color: "white",
                            backgroundColor: "#4A5568",
                            width: "200px",
                          }}
                          value=""
                        >
                          Select Perangkat
                        </option>
                        {dataPerangkat?.status == 200 &&
                          dataPerangkat?.data.map((item, index) => (
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
                    </Tooltip>
                  </FormControl>
                  <FormControl isInvalid={isErrorNama}>
                    <FormLabel fontSize="15px" color="#FFFFFF" fontWeight="400">
                      Nama Datastream
                    </FormLabel>
                    <Tooltip
                      label="Nama Datastream harus diisi"
                      placement="bottom-end"
                      bg="red.600"
                      isOpen={isErrorNama}
                    >
                      <Input
                        variant="flushed"
                        type="text"
                        h="35px"
                        color="#FFFFFF"
                        placeholder="Nama Datastream"
                        onChange={(e) => {
                          setNama(e.target.value);
                        }}
                        onBlur={() => {
                          setFocusNama(true);
                        }}
                        value={nama}
                      />
                    </Tooltip>
                  </FormControl>
                  <FormControl isInvalid={isErrorTurnOn}>
                    <FormLabel fontSize="15px" color="#FFFFFF" fontWeight="400">
                      Turn On
                    </FormLabel>
                    <Tooltip
                      label="Turn On harus diisi"
                      placement="bottom-end"
                      bg="red.600"
                      isOpen={isErrorTurnOn}
                    >
                      <Input
                        variant="flushed"
                        type="text"
                        h="35px"
                        color="#FFFFFF"
                        placeholder="Turn On"
                        onChange={(e) => {
                          setTurnOn(e.target.value);
                        }}
                        onBlur={() => {
                          setFocusTurnOn(true);
                        }}
                        value={turnOn}
                      />
                    </Tooltip>
                  </FormControl>
                  <FormControl isInvalid={isErrorTurnOff}>
                    <FormLabel fontSize="15px" color="#FFFFFF" fontWeight="400">
                      Turn Off
                    </FormLabel>
                    <Tooltip
                      label="Turn Off harus diisi"
                      placement="bottom-end"
                      bg="red.600"
                      isOpen={isErrorTurnOff}
                    >
                      <Input
                        variant="flushed"
                        type="text"
                        h="35px"
                        color="#FFFFFF"
                        placeholder="Turn Off"
                        onChange={(e) => {
                          setTurnOff(e.target.value);
                        }}
                        onBlur={() => {
                          setFocusTurnOff(true);
                        }}
                        value={turnOff}
                      />
                    </Tooltip>
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="15px" color="#FFFFFF" fontWeight="400">
                      Default Value
                    </FormLabel>
                    <Input
                      variant="flushed"
                      type="number"
                      h="35px"
                      color="#FFFFFF"
                      placeholder="Default Value"
                      onChange={(e) => {
                        setDefaultValue(e.target.value);
                      }}
                      value={defaultValue}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="15px" color="#FFFFFF" fontWeight="400">
                      Max Value
                    </FormLabel>
                    <Input
                      variant="flushed"
                      type="number"
                      h="35px"
                      color="#FFFFFF"
                      placeholder="Max Value"
                      onChange={(e) => {
                        setMaxValue(e.target.value);
                      }}
                      value={maxValue}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="15px" color="#FFFFFF" fontWeight="400">
                      Min Value
                    </FormLabel>
                    <Input
                      variant="flushed"
                      type="number"
                      h="35px"
                      color="#FFFFFF"
                      placeholder="Min Value"
                      onChange={(e) => {
                        setMinValue(e.target.value);
                      }}
                      value={minValue}
                    />
                  </FormControl>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  colorScheme={"messenger"}
                  isLoading={isLoadingPutDatastream}
                  isDisabled={disabled}
                >
                  Simpan
                </Button>
              </ModalFooter>
            </form>
          </LightMode>
        </ModalContent>
      </Modal>
    </DarkMode>
  );
};

export default EditDatastreamModal;
