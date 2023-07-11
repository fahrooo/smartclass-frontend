import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  DarkMode,
  FormControl,
  FormLabel,
  Input,
  Link,
  Select,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import parsenik from "parsenik";
import getunitsall from "@/modules/Area/Units/api/getunitsall";

const FormRegistrasi1 = ({
  setFormRegistrasi,
  setNama,
  setNik,
  setUnit,
  nama,
  nik,
  unit,
}) => {
  const router = useRouter();

  const [disabled, setDisabled] = useState(true);
  const [disabledUnits, setDisabledUnits] = useState(true);

  const [focusNama, setFocusNama] = useState(false);
  const [focusNik, setFocusNik] = useState(false);
  // const [focusUnit, setFocusUnit] = useState(false);

  const [isErrorNik, setIsErrorNik] = useState(false);
  const [msgErrorNik, setMsgErrorNik] = useState("");

  const { data: dataUnits, isLoading: isLoadingUnits } = getunitsall();

  const isNik = parsenik.isValid(Number(nik));

  useEffect(() => {
    if (nama != "" && nik != "" && nik.length >= 16) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }

    if (focusNik === true && nik === "") {
      setIsErrorNik(true);
      setMsgErrorNik("NIK harus diisi");
    } else if (focusNik === true && nik.length < 16) {
      setIsErrorNik(true);
      setMsgErrorNik("NIK harus 16 angka");
    } else if (focusNik === true && isNik === false) {
      setIsErrorNik(true);
      setMsgErrorNik("NIK tidak valid");
    } else {
      setIsErrorNik(false);
      setMsgErrorNik("");
    }

    // if (data?.status === 200) {
    //   setDisabledUnits(false);
    // } else {
    //   setDisabledUnits(true);
    // }
  }, [nama, nik, unit, focusNik]);

  const isErrorNama = focusNama === true && nama === "";

  const handleNext = (e) => {
    e.preventDefault();
    setFormRegistrasi(false);
  };

  return (
    <Box w="350px" h="465px" bgColor="#393D43" borderRadius="40px">
      <Box display="flex" justifyContent="center">
        <Stack alignItems="center" mt="33px">
          <Text fontSize="27px" color="#FFFFFF" fontWeight="700">
            Register
          </Text>
          <Text fontSize="15px" color="#FFFFFF" mt="0">
            Selamat datang! Silahkan isikan data diri
          </Text>
        </Stack>
      </Box>
      <Box mx="25px" mt="10px">
        <form onSubmit={handleNext}>
          <Box>
            <FormControl isInvalid={isErrorNik}>
              <FormLabel fontSize="15px" color="#FFFFFF" fontWeight="400">
                NIK
              </FormLabel>
              <Tooltip
                label={msgErrorNik}
                placement="bottom-end"
                bg="red.600"
                isOpen={isErrorNik}
              >
                <Input
                  variant="flushed"
                  type="number"
                  h="35px"
                  color="#FFFFFF"
                  placeholder="NIK"
                  value={nik}
                  onChange={(e) => {
                    setNik(e.target.value);
                  }}
                  onBlur={() => {
                    setFocusNik(true);
                  }}
                />
              </Tooltip>
            </FormControl>
          </Box>
          <Box mt="15px">
            <FormControl isInvalid={isErrorNama}>
              <FormLabel fontSize="15px" color="#FFFFFF" fontWeight="400">
                Nama Lengkap
              </FormLabel>
              <Tooltip
                label="Nama Lengkap harus diisi"
                placement="bottom-end"
                bg="red.600"
                isOpen={isErrorNama}
              >
                <Input
                  variant="flushed"
                  type="text"
                  h="35px"
                  color="#FFFFFF"
                  placeholder="Nama Lengkap"
                  value={nama}
                  onChange={(e) => {
                    setNama(e.target.value);
                  }}
                  onBlur={() => {
                    setFocusNama(true);
                  }}
                />
              </Tooltip>
            </FormControl>
          </Box>
          <Box mt="15px">
            <FormControl>
              <FormLabel fontSize="15px" color="#FFFFFF" fontWeight="400">
                Unit
              </FormLabel>
              <DarkMode>
                <Select
                  variant="flushed"
                  color="#e0e0e0"
                  w={"max-content"}
                  onChange={(e) => {
                    setUnit(e.target.value);
                  }}
                >
                  <option value="">Semua Unit</option>
                  <option value="0">-</option>
                  {dataUnits?.data.map((item, index) => (
                    <option key={index} value={item?.id}>
                      {item?.nama}
                    </option>
                  ))}
                </Select>
              </DarkMode>
            </FormControl>
          </Box>
          <Box w="100%" mt="20px" display="flex" justifyContent="end">
            <Button
              type="submit"
              rightIcon={<ArrowForwardIcon />}
              colorScheme="messenger"
              variant="solid"
              isDisabled={disabled}
            >
              Lanjut
            </Button>
          </Box>
        </form>
        <Box mt="15px" display="flex" justifyContent="center">
          <Text fontSize="13px" color="#FFFFFF">
            Sudah memiliki akun?{" "}
            <Link
              color="#FF9567"
              onClick={() => {
                router.push("/");
              }}
            >
              Silahkan Log In
            </Link>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default FormRegistrasi1;
