import TablePaginate from "@/common/components/Table/TablePaginate";
import {
  Box,
  DarkMode,
  Flex,
  IconButton,
  Input,
  LightMode,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import getunits from "./Units/api/getunits";
import TableHeaderUnits from "./Units/components/Table/TableHeaderUnits";
import TableMainUnits from "./Units/components/Table/TableMainUnits";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import TambahUnitModal from "./Units/components/Modal/TambahUnitModal";
import EditUnitModal from "./Units/components/Modal/EditUnitModal";
import { getFetchcer } from "@/common/utils/axios";
import DeleteUnitModal from "./Units/components/Modal/DeleteUnitModal";
import TableHeaderKelas from "./Kelas/components/Table/TableHeaderKelas";
import TableMainKelas from "./Kelas/components/Table/TableMainKelas";
import getkelas from "./Kelas/api/getkelas";
import { SiGoogleclassroom } from "react-icons/si";
import DetailKelasModal from "./Kelas/components/Modal/DetailKelasModal";
import TambahKelasModal from "./Kelas/components/Modal/TambahKelasModal";
import EditKelasModal from "./Kelas/components/Modal/EditKelasModal";
import DeleteKelasModal from "./Kelas/components/Modal/DeleteKelasModal";
import useAuthUserStore from "@/common/hooks/store/useAuthUserStore ";

const Area = () => {
  const session = useAuthUserStore((state) => state.session);

  const {
    isOpen: isOpenTambahUnit,
    onOpen: onOpenTambahUnit,
    onClose: onCloseTambahUnit,
  } = useDisclosure();

  const {
    isOpen: isOpenEditUnit,
    onOpen: onOpenEditUnit,
    onClose: onCloseEditUnit,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteUnit,
    onOpen: onOpenDeleteUnit,
    onClose: onCloseDeleteUnit,
  } = useDisclosure();

  const {
    isOpen: isOpenDetailKelas,
    onOpen: onOpenDetailKelas,
    onClose: onCloseDetailKelas,
  } = useDisclosure();

  const {
    isOpen: isOpenTambahKelas,
    onOpen: onOpenTambahKelas,
    onClose: onCloseTambahKelas,
  } = useDisclosure();

  const {
    isOpen: isOpenEditKelas,
    onOpen: onOpenEditKelas,
    onClose: onCloseEditKelas,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteKelas,
    onOpen: onOpenDeleteKelas,
    onClose: onCloseDeleteKelas,
  } = useDisclosure();

  const modal = useBreakpointValue({
    base: onOpenDetailKelas,
    md: onCloseDetailKelas,
  });

  const [pageUnits, setPageUnits] = useState(1);
  const [limitUnits, setLimitUnits] = useState(5);
  const [filterNamaUnits, setFilterNamaUnits] = useState(false);
  const [namaUnits, setNamaUnits] = useState("");

  const [pageKelas, setPageKelas] = useState(1);
  const [limitKelas, setLimitKelas] = useState(5);
  const [filterNamaKelas, setFilterNamaKelas] = useState(false);
  const [filterUnit, setFilterUnit] = useState(false);
  const [namaKelas, setNamaKelas] = useState("");
  const [unit, setUnit] = useState("");

  const [dataUnit, setDataUnit] = useState("");
  const [dataKelas, setDataKelas] = useState({});

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (namaUnits != "") {
      setFilterNamaUnits(true);
      setPageUnits(1);
    } else {
      setFilterNamaUnits(false);
    }
  }, [namaUnits]);

  useEffect(() => {
    if (namaKelas != "") {
      setFilterNamaKelas(true);
      setPageKelas(1);
    } else {
      setFilterNamaKelas(false);
    }

    if (unit != "") {
      setFilterUnit(true);
      setPageKelas(1);
    } else {
      setFilterUnit(false);
    }
    if (session?.data?.role == "super admin") {
      setDisabled(false);
    } else {
      setUnit(session.data?.id_unit);
      setDisabled(true);
    }
  }, [namaKelas, unit, session]);

  const {
    data: resUnits,
    isLoading: isLoadingUnits,
    refetch: refetchGetUnits,
  } = getunits({
    filter_nama: filterNamaUnits,
    nama: namaUnits.toUpperCase(),
    page: pageUnits,
    limit: limitUnits,
  });

  const {
    data: resKelas,
    isLoading: isLoadingKelas,
    refetch: refetchGetKelas,
  } = getkelas({
    filter_nama: filterNamaKelas,
    filter_unit: filterUnit,
    nama: namaKelas.toUpperCase(),
    id_unit: Number(unit),
    page: pageKelas,
    limit: limitKelas,
  });

  const { data: dataUnits, isLoading: isLoadingFilterUnits } = getunits({
    filter_nama: false,
    nama: "",
    page: 1,
    limit: 9999,
  });

  useEffect(() => {
    if (resUnits?.totalRows <= limitUnits) {
      setPageUnits(1);
    }
  }, [resUnits?.totalRows, limitUnits]);

  useEffect(() => {
    if (resKelas?.totalRows <= limitKelas) {
      setPageKelas(1);
    }
  }, [resKelas?.totalRows, limitKelas]);

  const handleModalEditUnit = (id) => {
    const url = `/units/${id}`;
    const res = getFetchcer(url).then((res) => setDataUnit(res));
    onOpenEditUnit();
  };

  const handleModalDeleteUnit = (id) => {
    const url = `/units/${id}`;
    const res = getFetchcer(url).then((res) => setDataUnit(res));
    onOpenDeleteUnit();
  };

  const handleModalDetailKelas = (id) => {
    const url = `/kelas/${id}`;
    const res = getFetchcer(url).then((res) => setDataKelas(res));
    modal();
  };

  const handleModalEditKelas = (id) => {
    const url = `/kelas/${id}`;
    const res = getFetchcer(url).then((res) => setDataKelas(res));
    onOpenEditKelas();
  };

  const handleModalDeleteKelas = (id) => {
    const url = `/kelas/${id}`;
    const res = getFetchcer(url).then((res) => setDataKelas(res));
    onOpenDeleteKelas();
  };

  return (
    <Tabs isFitted variant="soft-rounded" colorScheme="teal">
      <TabList px={2}>
        {disabled == false && <Tab color={"white"}>UNITS</Tab>}
        <Tab color={"white"} hidden={disabled}>
          KELAS
        </Tab>
      </TabList>
      {disabled == true && (
        <Box display="flex" justifyContent={{ base: "center", md: "start" }}>
          <Text
            w="max-content"
            color="#e0e0e0"
            fontSize="2xl"
            fontWeight="semibold"
          >
            KELAS
          </Text>
        </Box>
      )}
      <TabPanels>
        {disabled == false && (
          <TabPanel>
            <Flex
              flexDir={{ base: "column", md: "row" }}
              h={{ base: "max-content", md: "10%" }}
              justifyContent="space-between"
              gap={2}
              mb={{ base: 4, md: 0 }}
            >
              <DarkMode>
                <Input
                  variant="flushed"
                  placeholder="Cari Nama"
                  color="#e0e0e0"
                  w={{ base: "100%", md: "20%" }}
                  onChange={(e) => {
                    setNamaUnits(e.target.value);
                  }}
                  mb={2}
                  size="md"
                />
              </DarkMode>
              <IconButton
                colorScheme="teal"
                aria-label="Call Segun"
                icon={<DomainAddIcon />}
                size="md"
                onClick={onOpenTambahUnit}
              />
            </Flex>
            <LightMode>
              <TableHeaderUnits />
              <TableMainUnits
                items={resUnits}
                isLoading={isLoadingUnits}
                refetch={refetchGetUnits}
                handleModalEditUnit={handleModalEditUnit}
                handleModalDeleteUnit={handleModalDeleteUnit}
              />
              {resUnits?.status == 200 && (
                <TablePaginate
                  limit={limitUnits}
                  page={pageUnits}
                  pageCount={resUnits?.totalPage}
                  totalRows={resUnits?.totalRows}
                  setPage={setPageUnits}
                  setLimit={setLimitUnits}
                />
              )}
            </LightMode>
          </TabPanel>
        )}
        <TabPanel>
          <Flex
            flexDir={{ base: "column", md: "row" }}
            h={{ base: "max-content", md: "10%" }}
            justifyContent="space-between"
            px={1}
            gap={2}
            mb={{ base: 4, md: 0 }}
          >
            <DarkMode>
              <Input
                variant="flushed"
                placeholder="Cari Nama"
                color="#e0e0e0"
                w={{ base: "100%", md: "20%" }}
                onChange={(e) => {
                  setNamaKelas(e.target.value);
                }}
                mb={2}
                size="md"
              />
            </DarkMode>
            <Flex gap={2} flexDir={{ base: "column", md: "row" }}>
              {disabled == false && (
                <DarkMode>
                  <Select
                    variant="flushed"
                    color="#e0e0e0"
                    w={{ base: "100%", md: "max-content" }}
                    onChange={(e) => {
                      setUnit(e.target.value);
                    }}
                  >
                    <option value="">Semua Unit</option>
                    {dataUnits?.data.map((item, index) => (
                      <option key={index} value={item?.id}>
                        {item?.nama}
                      </option>
                    ))}
                  </Select>
                </DarkMode>
              )}
              <IconButton
                colorScheme="teal"
                aria-label="Call Segun"
                icon={<SiGoogleclassroom />}
                size="md"
                onClick={onOpenTambahKelas}
              />
            </Flex>
          </Flex>
          <LightMode>
            <TableHeaderKelas />
            <TableMainKelas
              items={resKelas}
              isLoading={isLoadingKelas}
              refetch={refetchGetKelas}
              handleModalDetailKelas={handleModalDetailKelas}
              handleModalEditKelas={handleModalEditKelas}
              handleModalDeleteKelas={handleModalDeleteKelas}
            />
            {resKelas?.status == 200 && (
              <TablePaginate
                limit={limitKelas}
                page={pageKelas}
                pageCount={resKelas?.totalPage}
                totalRows={resKelas?.totalRows}
                setPage={setPageKelas}
                setLimit={setLimitKelas}
              />
            )}
          </LightMode>
        </TabPanel>
      </TabPanels>
      <TambahUnitModal
        onClose={onCloseTambahUnit}
        isOpen={isOpenTambahUnit}
        refetch={refetchGetUnits}
      />
      <EditUnitModal
        onClose={onCloseEditUnit}
        isOpen={isOpenEditUnit}
        data={dataUnit}
        refetch={refetchGetUnits}
      />
      <DeleteUnitModal
        onClose={onCloseDeleteUnit}
        isOpen={isOpenDeleteUnit}
        data={dataUnit}
        refetch={refetchGetUnits}
      />
      <DetailKelasModal
        isOpen={isOpenDetailKelas}
        onClose={onCloseDetailKelas}
        data={dataKelas}
        handleModalEditKelas={handleModalEditKelas}
        handleModalDeleteKelas={handleModalDeleteKelas}
      />
      <TambahKelasModal
        onClose={onCloseTambahKelas}
        isOpen={isOpenTambahKelas}
        refetch={refetchGetKelas}
        dataUnits={dataUnits}
        disabledUnit={disabled}
      />
      <EditKelasModal
        onClose={onCloseEditKelas}
        isOpen={isOpenEditKelas}
        data={dataKelas}
        dataUnits={dataUnits}
        refetch={refetchGetKelas}
        onCloseDetail={onCloseDetailKelas}
        disabledUnit={disabled}
      />
      <DeleteKelasModal
        onClose={onCloseDeleteKelas}
        isOpen={isOpenDeleteKelas}
        data={dataKelas}
        refetch={refetchGetKelas}
        onCloseDetail={onCloseDetailKelas}
      />
    </Tabs>
  );
};

export default Area;
