import TablePaginate from "@/common/components/Table/TablePaginate";
import { getFetchcer } from "@/common/utils/axios";
import {
  DarkMode,
  Flex,
  IconButton,
  Input,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdOutlineDevices } from "react-icons/md";
import { TbServer2 } from "react-icons/tb";
import getkelas from "../Area/Kelas/api/getkelas";
import getunits from "../Area/Units/api/getunits";
import getperangkat from "./api/getperangkat";
import getdatastream from "./Datastream/api/getdatastream";
import DeleteDataStreamModal from "./Datastream/components/Modal/DeleteDatastreamModal";
import DetailDatastreamModal from "./Datastream/components/Modal/DetailDatastreamModal";
import EditDatastreamModal from "./Datastream/components/Modal/EditDatastreamModal";
import TambahDatastreamModal from "./Datastream/components/Modal/TambahDatastreamModal";
import TableHeaderDatastream from "./Datastream/components/Tabel/TableHeaderDatastream";
import TableMainDatastream from "./Datastream/components/Tabel/TableMainDatastream";
import getperangkatkelas from "./Perangkat/api/getperangkatkelas";
import DeletePerangkatModal from "./Perangkat/components/Modal/DeletePerangkatModal";
import DetailPerangkatModal from "./Perangkat/components/Modal/DetailPerangkatModal";
import EditPerangkatModal from "./Perangkat/components/Modal/EditPerangkatModal";
import TambahPerangkatModal from "./Perangkat/components/Modal/TambahPerangkatModal";
import TableHeaderPerangkat from "./Perangkat/components/Table/TableHeaderPerangkat";
import TableMainPerangkat from "./Perangkat/components/Table/TableMainPerangkat";
import useAuthUserStore from "@/common/hooks/store/useAuthUserStore ";

const Device = () => {
  const session = useAuthUserStore((state) => state.session);

  const {
    isOpen: isOpenDetailDatastream,
    onOpen: onOpenDetailDatastream,
    onClose: onCloseDetailDatastream,
  } = useDisclosure();

  const {
    isOpen: isOpenTambahDatastream,
    onOpen: onOpenTambahDatastream,
    onClose: onCloseTambahDatastream,
  } = useDisclosure();

  const {
    isOpen: isOpenEditDatastream,
    onOpen: onOpenEditDatastream,
    onClose: onCloseEditDatastream,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteDatastream,
    onOpen: onOpenDeleteDatastream,
    onClose: onCloseDeleteDatastream,
  } = useDisclosure();

  const modalDatastream = useBreakpointValue({
    base: onOpenDetailDatastream,
    md: onCloseDetailDatastream,
  });

  const {
    isOpen: isOpenDetailPerangkatKelas,
    onOpen: onOpenDetailPerangkatKelas,
    onClose: onCloseDetailPerangkatKelas,
  } = useDisclosure();

  const {
    isOpen: isOpenTambahPerangkatKelas,
    onOpen: onOpenTambahPerangkatKelas,
    onClose: onCloseTambahPerangkatKelas,
  } = useDisclosure();

  const {
    isOpen: isOpenEditPerangkatKelas,
    onOpen: onOpenEditPerangkatKelas,
    onClose: onCloseEditPerangkatKelas,
  } = useDisclosure();

  const {
    isOpen: isOpenDeletePerangkatKelas,
    onOpen: onOpenDeletePerangkatKelas,
    onClose: onCloseDeletePerangkatKelas,
  } = useDisclosure();

  const modalPerangkatKelas = useBreakpointValue({
    base: onOpenDetailPerangkatKelas,
    md: onCloseDetailPerangkatKelas,
  });

  const [pageDatastream, setPageDatastream] = useState(1);
  const [limitDatastream, setLimitDatastream] = useState(5);
  const [filterNamaDatastream, setFilterNamaDatastream] = useState(false);
  const [filterPerangkat, setFilterPerangkat] = useState(false);
  const [namaDatastream, setNamaDatastream] = useState("");
  const [perangkat, setPerangkat] = useState("");

  const [pagePerangkatKelas, setPagePerangkatKelas] = useState(1);
  const [limitPerangkatKelas, setLimitPerangkatKelas] = useState(5);
  const [filterNamaPerangkatKelas, setFilterNamaPerangkatKelas] =
    useState(false);
  const [filterUnitPerangkatKelas, setFilterUnitPerangkatKelas] =
    useState(false);
  const [filterKelasPerangkatKelas, setFilterKelasPerangkatKelas] =
    useState(false);
  const [namaPerangkatKelas, setNamaPerangkatKelas] = useState("");
  const [unitPerangkatKelas, setUnitPerangkatKelas] = useState("");
  const [kelasPerangkatKelas, setKelasPerangkatKelas] = useState("");

  const [disabledFilterKelas, setDisabledFilterKelas] = useState(true);
  const [disabled, setDisabled] = useState(true);

  const {
    data: resDatastream,
    isLoading: isLoadingDatastream,
    refetch: refetchGetDatastream,
  } = getdatastream({
    filter_nama: filterNamaDatastream,
    filter_perangkat: filterPerangkat,
    nama: namaDatastream.toUpperCase(),
    id_perangkat: Number(perangkat),
    page: pageDatastream,
    limit: limitDatastream,
  });

  const {
    data: resPerangkatKelas,
    isLoading: isLoadingPerangkatKelas,
    refetch: refetchGetPerangkatKelas,
  } = getperangkatkelas({
    filter_nama: filterNamaPerangkatKelas,
    filter_unit: filterUnitPerangkatKelas,
    filter_kelas: filterKelasPerangkatKelas,
    nama: namaPerangkatKelas.toUpperCase(),
    id_unit: Number(unitPerangkatKelas),
    id_kelas: Number(kelasPerangkatKelas),
    page: pagePerangkatKelas,
    limit: limitPerangkatKelas,
  });

  const {
    data: resPerangkat,
    isLoading: isLoadingPerangkat,
    refetch: refetchGetPerangkat,
  } = getperangkat({
    nama: "",
    page: 1,
    limit: 9999,
  });

  const { data: dataUnits, isLoading: isLoadingUnits } = getunits({
    filter_nama: false,
    nama: "",
    page: 1,
    limit: 9999,
  });

  const { data: dataKelas, isLoading: isLoadingKelas } = getkelas({
    filter_nama: false,
    filter_unit: filterUnitPerangkatKelas,
    nama: "",
    id_unit: Number(unitPerangkatKelas),
    page: 1,
    limit: 9999,
  });

  useEffect(() => {
    if (namaDatastream != "") {
      setFilterNamaDatastream(true);
      setPageDatastream(1);
    } else {
      setFilterNamaDatastream(false);
    }

    if (perangkat != "") {
      setFilterPerangkat(true);
      setPageDatastream(1);
    } else {
      setFilterPerangkat(false);
    }
  }, [namaDatastream, perangkat]);

  useEffect(() => {
    if (dataKelas?.status == 200 && unitPerangkatKelas != "") {
      setDisabledFilterKelas(false);
    } else {
      setDisabledFilterKelas(true);
      setKelasPerangkatKelas("");
    }

    if (namaPerangkatKelas != "") {
      setFilterNamaPerangkatKelas(true);
      setPagePerangkatKelas(1);
    } else {
      setFilterNamaPerangkatKelas(false);
    }

    if (unitPerangkatKelas != "") {
      setFilterUnitPerangkatKelas(true);
      setPagePerangkatKelas(1);
    } else {
      setFilterUnitPerangkatKelas(false);
    }

    if (kelasPerangkatKelas != "") {
      setFilterKelasPerangkatKelas(true);
      setPagePerangkatKelas(1);
    } else {
      setFilterKelasPerangkatKelas(false);
    }
    if (session?.data?.role == "super admin") {
      setUnitPerangkatKelas("");
      setDisabled(false);
    } else {
      setUnitPerangkatKelas(session.data?.id_unit);
      setDisabled(true);
    }
  }, [namaPerangkatKelas, unitPerangkatKelas, kelasPerangkatKelas, dataKelas]);

  useEffect(() => {
    if (resDatastream?.totalRows <= limitDatastream) {
      setPageDatastream(1);
    }
  }, [resDatastream?.totalRows, limitDatastream]);

  useEffect(() => {
    if (resPerangkatKelas?.totalRows <= limitPerangkatKelas) {
      setPagePerangkatKelas(1);
    }
  }, [resPerangkatKelas?.totalRows, limitPerangkatKelas]);

  const [data, setData] = useState({});

  const handleModalDetailDatastream = (id) => {
    const url = `/datastream/${id}`;
    const res = getFetchcer(url).then((res) => setData(res));
    modalDatastream();
  };

  const handleModalEditDatastream = (id) => {
    const url = `/datastream/${id}`;
    const res = getFetchcer(url).then((res) => setData(res));
    onOpenEditDatastream();
  };

  const handleModalDeleteDatastream = (id) => {
    const url = `/datastream/${id}`;
    const res = getFetchcer(url).then((res) => setData(res));
    onOpenDeleteDatastream();
  };

  const handleModalDetailPerangkatKelas = (id) => {
    const url = `/perangkatkelas/${id}`;
    const res = getFetchcer(url).then((res) => setData(res));
    modalPerangkatKelas();
  };

  const handleModalEditPerangkatKelas = (id) => {
    const url = `/perangkatkelas/${id}`;
    const res = getFetchcer(url).then((res) => setData(res));
    onOpenEditPerangkatKelas();
  };

  const handleModalDeletePerangkatKelas = (id) => {
    const url = `/perangkatkelas/${id}`;
    const res = getFetchcer(url).then((res) => setData(res));
    onOpenDeletePerangkatKelas();
  };

  return (
    <Tabs isFitted variant="soft-rounded" colorScheme="teal">
      <TabList px={2}>
        <Tab color={"white"}>DATASTREAM</Tab>
        <Tab color={"white"}>DEVICE</Tab>
      </TabList>
      <TabPanels>
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
                  setNamaDatastream(e.target.value);
                }}
                mb={2}
                size="md"
              />
            </DarkMode>
            <Flex gap={2} flexDir={{ base: "column", md: "row" }}>
              <DarkMode>
                <Select
                  variant="flushed"
                  color="#e0e0e0"
                  w={{ base: "100%", md: "200px" }}
                  onChange={(e) => {
                    setPerangkat(e.target.value);
                  }}
                >
                  <option value="">Semua Perangkat</option>
                  {resPerangkat?.status == 200 &&
                    resPerangkat?.data.map((item, index) => (
                      <option key={index} value={item?.id}>
                        {item?.nama}
                      </option>
                    ))}
                </Select>
              </DarkMode>
              <IconButton
                colorScheme="teal"
                aria-label="Call Segun"
                icon={<TbServer2 />}
                size="md"
                onClick={onOpenTambahDatastream}
              />
            </Flex>
          </Flex>
          <TableHeaderDatastream />
          <TableMainDatastream
            items={resDatastream}
            isLoading={isLoadingDatastream}
            refetch={refetchGetDatastream}
            handleModalDetailDatastream={handleModalDetailDatastream}
            handleModalEditDatastream={handleModalEditDatastream}
            handleModalDeleteDatastream={handleModalDeleteDatastream}
          />
          {resDatastream?.status == 200 && (
            <TablePaginate
              limit={limitDatastream}
              page={pageDatastream}
              pageCount={resDatastream?.totalPage}
              totalRows={resDatastream?.totalRows}
              setPage={setPageDatastream}
              setLimit={setLimitDatastream}
            />
          )}
        </TabPanel>
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
                  setNamaPerangkatKelas(e.target.value);
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
                    w={{ base: "100%", md: "200px" }}
                    onChange={(e) => {
                      setUnitPerangkatKelas(e.target.value);
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
              <DarkMode>
                <Select
                  variant="flushed"
                  color="#e0e0e0"
                  w={{ base: "100%", md: "200px" }}
                  onChange={(e) => setKelasPerangkatKelas(e.target.value)}
                  isDisabled={disabledFilterKelas}
                >
                  <option value="">Semua Kelas</option>
                  {dataKelas?.status == 200 &&
                    dataKelas?.data.map((item, index) => (
                      <option key={index} value={item?.id}>
                        {item?.nama}
                      </option>
                    ))}
                </Select>
              </DarkMode>
              <IconButton
                colorScheme="teal"
                aria-label="Call Segun"
                icon={<MdOutlineDevices />}
                size="md"
                onClick={onOpenTambahPerangkatKelas}
              />
            </Flex>
          </Flex>
          <TableHeaderPerangkat />
          <TableMainPerangkat
            items={resPerangkatKelas}
            isLoading={isLoadingPerangkatKelas}
            refetch={refetchGetPerangkatKelas}
            handleModalDetailPerangkatKelas={handleModalDetailPerangkatKelas}
            handleModalEditPerangkatKelas={handleModalEditPerangkatKelas}
            handleModalDeletePerangkatKelas={handleModalDeletePerangkatKelas}
          />
          {resPerangkatKelas?.status == 200 && (
            <TablePaginate
              limit={limitPerangkatKelas}
              page={pagePerangkatKelas}
              pageCount={resPerangkatKelas?.totalPage}
              totalRows={resPerangkatKelas?.totalRows}
              setPage={setPagePerangkatKelas}
              setLimit={setLimitPerangkatKelas}
            />
          )}
        </TabPanel>
      </TabPanels>
      <DetailDatastreamModal
        isOpen={isOpenDetailDatastream}
        onClose={onCloseDetailDatastream}
        data={data}
        handleModalEditDatastream={handleModalEditDatastream}
        handleModalDeleteDatastream={handleModalDeleteDatastream}
      />
      <TambahDatastreamModal
        onClose={onCloseTambahDatastream}
        isOpen={isOpenTambahDatastream}
        refetch={refetchGetDatastream}
        dataPerangkat={resPerangkat}
      />
      <EditDatastreamModal
        onClose={onCloseEditDatastream}
        isOpen={isOpenEditDatastream}
        refetch={refetchGetDatastream}
        dataPerangkat={resPerangkat}
        data={data}
        onCloseDetailDatastream={onCloseDetailDatastream}
      />
      <DeleteDataStreamModal
        onClose={onCloseDeleteDatastream}
        isOpen={isOpenDeleteDatastream}
        refetch={refetchGetDatastream}
        data={data}
        onCloseDetailDatastream={onCloseDetailDatastream}
      />
      <DetailPerangkatModal
        isOpen={isOpenDetailPerangkatKelas}
        onClose={onCloseDetailPerangkatKelas}
        data={data}
        handleModalEditPerangkatKelas={handleModalEditPerangkatKelas}
        handleModalDeletePerangkatKelas={handleModalDeletePerangkatKelas}
      />
      <TambahPerangkatModal
        onClose={onCloseTambahPerangkatKelas}
        isOpen={isOpenTambahPerangkatKelas}
        refetch={refetchGetPerangkatKelas}
        dataPerangkat={resPerangkat}
        dataUnits={dataUnits}
        disabledUnit={disabled}
      />
      <EditPerangkatModal
        onClose={onCloseEditPerangkatKelas}
        isOpen={isOpenEditPerangkatKelas}
        refetch={refetchGetPerangkatKelas}
        dataPerangkat={resPerangkat}
        dataUnits={dataUnits}
        data={data}
        onCloseDetailPerangkatKelas={onCloseDetailPerangkatKelas}
        disabledUnit={disabled}
      />
      <DeletePerangkatModal
        onClose={onCloseDeletePerangkatKelas}
        isOpen={isOpenDeletePerangkatKelas}
        refetch={refetchGetPerangkatKelas}
        data={data}
        onCloseDetailPerangkatKelas={onCloseDetailPerangkatKelas}
      />
    </Tabs>
  );
};

export default Device;
