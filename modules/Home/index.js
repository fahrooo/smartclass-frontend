import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { forwardRef, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import getunits from "../Area/Units/api/getunits";
import getkelasbooking from "./api/getkelasbooking";
import MessageNotFoundData from "@/common/utils/error/MessageNotFoundData";
import TambahBookingModal from "./components/Modal/TambahBookingModal";

const CalendarBooking = forwardRef(({ value, onClick }, ref) => (
  <Button
    variant={"solid"}
    bgColor={"gray.100"}
    w="full"
    _hover={{ color: "black", bgColor: "white" }}
    onClick={onClick}
    ref={ref}
    borderRadius={"full"}
  >
    {value}
  </Button>
));

const home = () => {
  const inputRef = useRef(null);

  const [unit, setUnit] = useState("");
  const [waktuPemesanan, setWaktuPemesanan] = useState(new Date());
  const [idKelas, setIdKelas] = useState("");
  const [kelas, setKelas] = useState("");

  const [focusUnit, setFocusUnit] = useState(false);

  const isErrorUnit = focusUnit === true && unit === "";

  const { data: dataUnits, isLoading: isLoadingUnits } = getunits({
    filter_nama: false,
    nama: "",
    page: 1,
    limit: 9999,
  });

  const {
    data: dataKelas,
    isLoading: isLoadingKelas,
    refetch: refetchKelasBooking,
  } = getkelasbooking({
    id_unit: Number(unit),
    waktu_pemesanan: waktuPemesanan,
  });

  const {
    isOpen: isOpenTambahBooking,
    onOpen: onOpenTambahBooking,
    onClose: onCloseTambahBooking,
  } = useDisclosure();

  return (
    <Box>
      <Box py={4}>
        <Box
          mb={4}
          display="flex"
          justifyContent={{ base: "center", md: "start" }}
        >
          <Text
            w="max-content"
            color="#FFFFFF"
            fontSize="2xl"
            fontWeight="semibold"
          >
            ROOM BOOKING
          </Text>
        </Box>
        <Flex gap={{ base: 2, md: 12 }} flexDir={{ base: "column", md: "row" }}>
          <FormControl isInvalid={isErrorUnit}>
            <FormLabel fontSize="15px" color="gray.100" fontWeight="700">
              Unit
            </FormLabel>
            <Tooltip
              label="Unit harus diisi"
              placement="bottom-end"
              bg="red.600"
              isOpen={isErrorUnit}
            >
              <Select
                borderRadius={"full"}
                bgColor={"gray.100"}
                fontWeight={"semibold"}
                onChange={(e) => {
                  setUnit(e.target.value);
                }}
                onBlur={() => {
                  setFocusUnit(true);
                }}
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
          <FormControl>
            <FormLabel fontSize="15px" color="gray.100" fontWeight="700">
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
        </Flex>
        <Box mt={4}>
          <Text
            w="max-content"
            color="#FFFFFF"
            fontSize="xl"
            fontWeight="semibold"
          >
            Select Room
          </Text>
          {dataKelas?.status == 404 && (
            <Box h={"300px"}>
              <MessageNotFoundData />
            </Box>
          )}
          {isLoadingKelas && (
            <SimpleGrid columns={{ base: 2, md: 3, lg: 6 }} spacing={5} mt={4}>
              <Skeleton
                borderRadius={"xl"}
                height={{ base: "40px", md: "60px", lg: "80px" }}
              />
              <Skeleton
                borderRadius={"xl"}
                height={{ base: "40px", md: "60px", lg: "80px" }}
              />
              <Skeleton
                borderRadius={"xl"}
                height={{ base: "40px", md: "60px", lg: "80px" }}
              />
              <Skeleton
                borderRadius={"xl"}
                height={{ base: "40px", md: "60px", lg: "80px" }}
              />
              <Skeleton
                borderRadius={"xl"}
                height={{ base: "40px", md: "60px", lg: "80px" }}
              />
              <Skeleton
                borderRadius={"xl"}
                height={{ base: "40px", md: "60px", lg: "80px" }}
              />
            </SimpleGrid>
          )}
          {dataKelas?.status == 200 && (
            <SimpleGrid
              columns={{ base: 2, md: 3, lg: 6 }}
              spacing={5}
              mt={4}
              maxH={"270px"}
              overflowY={"scroll"}
            >
              {dataKelas?.data?.map((item, index) => (
                <Button
                  key={index}
                  bg="gray.100"
                  height={{ base: "40px", md: "60px", lg: "80px" }}
                  borderRadius={"xl"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  isDisabled={item?.jumlah_booking >= 9 ? true : false}
                  onClick={() => {
                    setIdKelas(item?.id);
                    setKelas(item?.nama);
                    onOpenTambahBooking();
                  }}
                >
                  <Text
                    fontSize={{ base: "sm", md: "lg" }}
                    fontWeight={"semibold"}
                  >
                    {item?.nama}
                  </Text>
                </Button>
              ))}
            </SimpleGrid>
          )}
        </Box>
      </Box>
      <TambahBookingModal
        isOpen={isOpenTambahBooking}
        onClose={onCloseTambahBooking}
        idKelas={idKelas}
        kelas={kelas}
        waktuPemesanan={waktuPemesanan}
        refetch={refetchKelasBooking}
      />
    </Box>
  );
};

export default home;
