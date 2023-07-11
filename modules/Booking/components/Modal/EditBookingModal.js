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
  Textarea,
  Tooltip,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import getkelas from "@/modules/Area/Kelas/api/getkelas";
import useAuthUserStore from "@/common/hooks/store/useAuthUserStore ";
import rejectbooking from "../../api/rejectbooking";
import getwaktu from "../../api/getwaktu";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import putbooking from "../../api/putbooking";

const CalendarBooking = forwardRef(({ value, onClick }, ref) => (
  <Button
    variant={"outline"}
    w="full"
    _hover={{ color: "black", bgColor: "white" }}
    onClick={onClick}
    ref={ref}
  >
    {value}
  </Button>
));

const EditBookingModal = ({
  onClose,
  isOpen,
  refetch,
  dataUnits,
  data,
  onCloseDetailBooking,
  disabledUnit,
}) => {
  const inputRef = useRef(null);
  const toast = useToast();
  const formEditBooking = useRef();

  const session = useAuthUserStore((state) => state.session);

  const [disabled, setDisabled] = useState(true);
  const [disabledFilterKelas, setDisabledFilterKelas] = useState(true);

  const [filterUnit, setFilterUnit] = useState(false);
  const [id, setId] = useState("");
  const [user, setUser] = useState("");
  const [unit, setUnit] = useState("");
  const [kelas, setKelas] = useState("");
  const [waktu, setWaktu] = useState("");
  const [waktuPemesanan, setWaktuPemesanan] = useState(new Date());
  const [status, setStatus] = useState("");
  const [keterangan, setKeterangan] = useState("");

  const { mutate: mutatePutBooking, isLoading: isLoadingPutBooking } =
    useMutation(putbooking);

  const { mutate: mutateRejectBooking, isLoading: isLoadingRejectBooking } =
    useMutation(rejectbooking);

  const {
    data: resKelas,
    isLoading: isLoadingKelas,
    refetch: refetchGetKelas,
  } = getkelas({
    filter_nama: false,
    filter_unit: filterUnit,
    nama: "",
    id_unit: Number(unit),
    page: 1,
    limit: 9999,
  });

  const { data: resWaktu, isLoading: isLoadingWaktu } = getwaktu();

  const [focusKelas, setFocusKelas] = useState(false);
  const [focusUnit, setFocusUnit] = useState(false);
  const [focusWaktu, setFocusWaktu] = useState(false);
  const [focusStatus, setFocusStatus] = useState(false);
  const [focusKeterangan, setFocusKeterangan] = useState(false);

  const isErrorKelas = focusKelas === true && kelas === "";
  const isErrorUnit = focusUnit === true && unit === "";
  const isErrorWaktu = focusWaktu === true && waktu === "";
  const isErrorStatus = focusStatus === true && status === "";
  const isErrorKeterangan = focusKeterangan === true && keterangan === "";

  useEffect(() => {
    if (data?.status == 200) {
      setId(data?.data?.id);
      setUser(data?.data?.id_user);
      setUnit(data?.data?.classroom?.id_unit);
      setKelas(data?.data?.id_kelas);
      setWaktuPemesanan(new Date(data?.data?.waktu_pemesanan));
      setWaktu(data?.data?.id_waktu);
      setStatus(data?.data?.status);
      setKeterangan(data?.data?.keterangan);
    }
  }, [data?.data?.id, resKelas]);

  useEffect(() => {
    kelas != "" &&
    unit != "" &&
    waktuPemesanan != "" &&
    waktu != "" &&
    keterangan != ""
      ? setDisabled(false)
      : setDisabled(true);

    if (unit != "") {
      setFilterUnit(true);
      setDisabledFilterKelas(false);
    } else {
      setFilterUnit(false);
      setDisabledFilterKelas(true);
    }

    if (resKelas?.status == 200 && unit != "") {
      setDisabledFilterKelas(false);
    } else {
      setKelas("");
      setDisabledFilterKelas(true);
    }
  }, [kelas, unit, waktuPemesanan, waktu, keterangan, resKelas]);

  useEffect(() => {
    if (disabledUnit == false) {
      setUnit("");
    } else {
      setUnit(session.data?.id_unit);
    }
  }, [disabledUnit]);

  const handleEditBooking = (e) => {
    e.preventDefault();

    if (status == "approved") {
      mutateRejectBooking(
        {
          id_kelas: kelas,
          id_waktu: waktu,
          waktu_pemesanan: waktuPemesanan,
        },
        {
          onSuccess: (res) => {},
        }
      );
    }

    mutatePutBooking(
      {
        id: id,
        id_user: user,
        id_kelas: kelas,
        id_waktu: waktu,
        waktu_pemesanan: waktuPemesanan,
        is_booking: true,
        status: status,
        keterangan: keterangan,
      },
      {
        onSuccess: (res) => {
          if (res?.status === 200) {
            refetch();
            toast({
              title: "Edit Booking Berhasil!",
              status: "success",
              duration: 5000,
              position: "top",
              isClosable: true,
            });
            onClose();
            onCloseDetailBooking();
            formEditBooking.current?.reset();
          } else {
            toast({
              title: "Edit Booking Gagal!",
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

  const now = new Date();
  const time = now.toLocaleTimeString();
  const date = now.toLocaleDateString();

  const waktuBooking = (tglNow, tglPemesanan) => {
    if (tglNow == tglPemesanan) {
      const newWaktu = resWaktu?.data.filter(
        (x) =>
          x.time_start.substring(0, 2) > time.substring(0, 2) &&
          x.id != data?.data?.waktu?.id
      );
      return newWaktu;
    } else {
      return resWaktu?.data;
    }
  };

  const disabledWaktu = (y, n) => {
    if (y.toLocaleDateString() == n.toLocaleDateString()) {
      return false;
    } else if (y.getTime() < n.getTime()) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <DarkMode>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent color="white" m={2}>
          <ModalHeader>EDIT BOOKING</ModalHeader>
          <ModalCloseButton />
          <LightMode>
            <form ref={formEditBooking} onSubmit={handleEditBooking}>
              <ModalBody>
                <VStack spacing={4}>
                  <FormControl isInvalid={isErrorUnit}>
                    <FormLabel fontSize="15px" color="#FFFFFF" fontWeight="400">
                      Unit
                    </FormLabel>
                    <Tooltip
                      label="Unit harus diisi"
                      placement="bottom-end"
                      bg="red.600"
                      isOpen={isErrorUnit}
                    >
                      <Select
                        variant="flushed"
                        h="35px"
                        color={unit != "" ? "#FFFFFF" : "#718096"}
                        onChange={(e) => {
                          setUnit(e.target.value);
                        }}
                        onBlur={() => {
                          setFocusUnit(true);
                        }}
                        isDisabled={disabledUnit}
                        value={
                          disabledUnit == false ? unit : session?.data?.id_unit
                        }
                      >
                        <option
                          style={{
                            color: "white",
                            backgroundColor: "#4A5568",
                            width: "200px",
                          }}
                          value=""
                        >
                          Select Unit
                        </option>
                        {dataUnits?.status == 200 &&
                          dataUnits?.data.map((item, index) => (
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
                  <FormControl isInvalid={isErrorKelas}>
                    <FormLabel fontSize="15px" color="#FFFFFF" fontWeight="400">
                      Kelas
                    </FormLabel>
                    <Tooltip
                      label={
                        disabledFilterKelas
                          ? "Tidak ada kelas"
                          : "Kelas harus diisi"
                      }
                      placement="bottom-end"
                      bg="red.600"
                      isOpen={isErrorKelas}
                    >
                      <Select
                        variant="flushed"
                        h="35px"
                        color={kelas != "" ? "#FFFFFF" : "#718096"}
                        onChange={(e) => {
                          setKelas(e.target.value);
                        }}
                        isDisabled={disabledFilterKelas}
                        onBlur={() => {
                          setFocusKelas(true);
                        }}
                        value={kelas}
                      >
                        <option
                          style={{
                            color: "white",
                            backgroundColor: "#4A5568",
                            width: "200px",
                          }}
                          value=""
                        >
                          Select Kelas
                        </option>
                        {resKelas?.status == 200 &&
                          resKelas?.data.map((item, index) => (
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
                  <FormControl>
                    <FormLabel fontSize="15px" color="#FFFFFF" fontWeight="400">
                      Tanggal
                    </FormLabel>
                    <DatePicker
                      dateFormat="dd/MM/yyyy"
                      selected={waktuPemesanan}
                      onChange={(date) => setWaktuPemesanan(date)}
                      customInput={<CalendarBooking ref={inputRef} />}
                      minDate={new Date()}
                    />
                  </FormControl>
                  <FormControl isInvalid={isErrorWaktu}>
                    <FormLabel fontSize="15px" color="#FFFFFF" fontWeight="400">
                      Waktu
                    </FormLabel>
                    <Tooltip
                      label="Waktu harus diisi"
                      placement="bottom-end"
                      bg="red.600"
                      isOpen={isErrorWaktu}
                    >
                      <Select
                        variant="flushed"
                        h="35px"
                        color={waktu != "" ? "#FFFFFF" : "#718096"}
                        onChange={(e) => {
                          setWaktu(e.target.value);
                        }}
                        onBlur={() => {
                          setFocusWaktu(true);
                        }}
                        value={waktu}
                        isDisabled={disabledWaktu(
                          new Date(waktuPemesanan),
                          now
                        )}
                      >
                        <option
                          style={{
                            color: "white",
                            backgroundColor: "#4A5568",
                            width: "200px",
                          }}
                          value=""
                        >
                          Select Waktu
                        </option>
                        {new Date(waktuPemesanan).toLocaleDateString() ==
                          now.toLocaleDateString() && (
                          <option
                            style={{
                              color: "white",
                              backgroundColor: "#4A5568",
                              width: "200px",
                            }}
                            value={data?.data?.waktu?.id}
                            disabled
                          >
                            {data?.data?.waktu?.time_start.substring(0, 5)} -{" "}
                            {data?.data?.waktu?.time_end.substring(0, 5)}
                          </option>
                        )}
                        {resWaktu?.status == 200 &&
                          waktuBooking(
                            date,
                            waktuPemesanan.toLocaleDateString()
                          ).map((item, index) => (
                            <option
                              style={{
                                color: "white",
                                backgroundColor: "#4A5568",
                                width: "200px",
                              }}
                              key={index}
                              value={item?.id}
                            >
                              {item?.time_start.substring(0, 5)} -{" "}
                              {item?.time_end.substring(0, 5)}
                            </option>
                          ))}
                      </Select>
                    </Tooltip>
                  </FormControl>
                  <FormControl isInvalid={isErrorStatus}>
                    <FormLabel fontSize="15px" color="#FFFFFF" fontWeight="400">
                      Status
                    </FormLabel>
                    <Tooltip
                      label={
                        disabledFilterKelas
                          ? "Tidak ada kelas"
                          : "Kelas harus diisi"
                      }
                      placement="bottom-end"
                      bg="red.600"
                      isOpen={isErrorKelas}
                    >
                      <Select
                        variant="flushed"
                        h="35px"
                        color={status != "" ? "#FFFFFF" : "#718096"}
                        onChange={(e) => {
                          setStatus(e.target.value);
                        }}
                        isDisabled={disabledFilterKelas}
                        onBlur={() => {
                          setFocusStatus(true);
                        }}
                        value={status}
                      >
                        <option
                          style={{
                            color: "white",
                            backgroundColor: "#4A5568",
                            width: "200px",
                          }}
                          value=""
                        >
                          Select Status
                        </option>
                        <option
                          style={{
                            color: "white",
                            backgroundColor: "#4A5568",
                            width: "200px",
                          }}
                          value="approved"
                        >
                          APPROVED
                        </option>
                        <option
                          style={{
                            color: "white",
                            backgroundColor: "#4A5568",
                            width: "200px",
                          }}
                          value="waiting"
                        >
                          WAITING
                        </option>
                        <option
                          style={{
                            color: "white",
                            backgroundColor: "#4A5568",
                            width: "200px",
                          }}
                          value="cancel"
                        >
                          CANCEL
                        </option>
                        <option
                          style={{
                            color: "white",
                            backgroundColor: "#4A5568",
                            width: "200px",
                          }}
                          value="rejected"
                        >
                          REJECTED
                        </option>
                      </Select>
                    </Tooltip>
                  </FormControl>
                  <FormControl isInvalid={isErrorKeterangan}>
                    <FormLabel fontSize="15px" color="#FFFFFF" fontWeight="400">
                      Keterangan
                    </FormLabel>
                    <Tooltip
                      label="Keterangan harus diisi"
                      placement="bottom-end"
                      bg="red.600"
                      isOpen={isErrorKeterangan}
                    >
                      <Textarea
                        placeholder="Keterangan penggunaan kelas"
                        resize={"none"}
                        onChange={(e) => {
                          setKeterangan(e.target.value);
                        }}
                        onBlur={() => {
                          setFocusKeterangan(true);
                        }}
                        value={keterangan}
                      />
                    </Tooltip>
                  </FormControl>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  colorScheme={"messenger"}
                  isLoading={isLoadingPutBooking}
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

export default EditBookingModal;
