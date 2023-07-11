import TablePaginate from "@/common/components/Table/TablePaginate";
import { getFetchcer } from "@/common/utils/axios";
import {
  Button,
  DarkMode,
  Flex,
  IconButton,
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
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsHeadset } from "react-icons/bs";
import getkelas from "../Area/Kelas/api/getkelas";
import getunits from "../Area/Units/api/getunits";
import getoperator from "./api/getoperator";
import DeleteOperatorModal from "./components/Modal/DeleteOperatorModal";
import DetailOperatorModal from "./components/Modal/DetailOperatorModal";
import EditOperatorModal from "./components/Modal/EditOperatorModal";
import TambahOperatorModal from "./components/Modal/TambahOperatorModal";
import TableHeaderOperator from "./components/Table/TableHeaderOperator";
import TableMainOperator from "./components/Table/TableMainOperator";
import useAuthUserStore from "@/common/hooks/store/useAuthUserStore ";

const Operator = ({ isOpen, onClose }) => {
  const session = useAuthUserStore((state) => state.session);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [filterNama, setFilterNama] = useState(false);
  const [filterUnit, setFilterUnit] = useState(false);
  const [filterKelas, setFilterKelas] = useState(false);
  const [nama, setNama] = useState("");
  const [unit, setUnit] = useState("");
  const [kelas, setKelas] = useState("");

  const [disabled, setDisabled] = useState(true);
  const [disableFilterKelas, setDisableFilterKelas] = useState(true);

  const { data: dataUnits, isLoading: isLoadingUnits } = getunits({
    filter_nama: false,
    nama: "",
    page: 1,
    limit: 9999,
  });

  const { data: dataKelas, isLoading: isLoadingKelas } = getkelas({
    filter_nama: false,
    filter_unit: filterUnit,
    nama: "",
    id_unit: Number(unit),
    page: 1,
    limit: 9999,
  });

  const {
    data: res,
    isLoading,
    refetch: refetchGetOperator,
  } = getoperator({
    filter_nama: filterNama,
    filter_unit: filterUnit,
    filter_kelas: filterKelas,
    nama: nama.toUpperCase(),
    id_unit: Number(unit),
    id_kelas: Number(kelas),
    page: page,
    limit: limit,
  });

  useEffect(() => {
    if (session?.data?.role == "super admin") {
      setDisabled(false);
      setUnit("");
    } else {
      setUnit(session.data?.id_unit);
      setDisabled(true);
    }
  }, [session.data?.id_unit]);

  useEffect(() => {
    if (dataKelas?.status == 200 && unit != "") {
      setDisableFilterKelas(false);
    } else {
      setDisableFilterKelas(true);
      setKelas("");
    }
    if (nama != "") {
      setFilterNama(true);
      setPage(1);
    } else {
      setFilterNama(false);
    }
    if (unit != "") {
      setFilterUnit(true);
      setDisableFilterKelas(false);
      setPage(1);
    } else {
      setDisableFilterKelas(true);
      setFilterUnit(false);
    }
    if (kelas != "") {
      setFilterKelas(true);
      setPage(1);
    } else {
      setFilterKelas(false);
    }
  }, [nama, unit, kelas, dataKelas]);

  useEffect(() => {
    if (res?.totalRows <= limit) {
      setPage(1);
    }
  }, [res?.totalRows, limit]);

  const {
    isOpen: isOpenDetailOperator,
    onOpen: onOpenDetailOperator,
    onClose: onCloseDetailOperator,
  } = useDisclosure();

  const {
    isOpen: isOpenTambahOperator,
    onOpen: onOpenTambahOperator,
    onClose: onCloseTambahOperator,
  } = useDisclosure();

  const {
    isOpen: isOpenEditOperator,
    onOpen: onOpenEditOperator,
    onClose: onCloseEditOperator,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteOperator,
    onOpen: onOpenDeleteOperator,
    onClose: onCloseDeleteOperator,
  } = useDisclosure();

  const modal = useBreakpointValue({
    base: onOpenDetailOperator,
    md: onCloseDetailOperator,
  });

  const [data, setData] = useState({});

  const handleModalDetailOperator = (id) => {
    const url = `/operator/${id}`;
    const res = getFetchcer(url).then((res) => setData(res));
    modal();
  };

  const handleModalEditOperator = (id) => {
    const url = `/operator/${id}`;
    const res = getFetchcer(url).then((res) => setData(res));
    onOpenEditOperator();
  };

  const handleModalDeleteOperator = (id) => {
    const url = `/operator/${id}`;
    const res = getFetchcer(url).then((res) => setData(res));
    onOpenDeleteOperator();
  };

  return (
    <DarkMode>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        size="5xl"
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent color={"white"} m={2}>
          <ModalHeader>OPERATOR</ModalHeader>
          <ModalCloseButton />
          <LightMode>
            <ModalBody>
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
                      setNama(e.target.value);
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
                  <DarkMode>
                    <Select
                      variant="flushed"
                      color="#e0e0e0"
                      w={{ base: "100%", md: "200px" }}
                      onChange={(e) => setKelas(e.target.value)}
                      isDisabled={disableFilterKelas}
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
                    icon={<BsHeadset />}
                    size="md"
                    onClick={onOpenTambahOperator}
                  />
                </Flex>
              </Flex>
              <TableHeaderOperator />
              <TableMainOperator
                items={res}
                isLoading={isLoading}
                refetch={refetchGetOperator}
                handleModalEditOperator={handleModalEditOperator}
                handleModalDeleteOperator={handleModalDeleteOperator}
                handleModalDetailOperator={handleModalDetailOperator}
              />
              {res?.status == 200 && (
                <TablePaginate
                  limit={limit}
                  page={page}
                  pageCount={res?.totalPage}
                  totalRows={res?.totalRows}
                  setPage={setPage}
                  setLimit={setLimit}
                />
              )}
            </ModalBody>
          </LightMode>
          <ModalFooter></ModalFooter>
        </ModalContent>
        <DetailOperatorModal
          isOpen={isOpenDetailOperator}
          onClose={onCloseDetailOperator}
          data={data}
          handleModalEditOperator={handleModalEditOperator}
          handleModalDeleteOperator={handleModalDeleteOperator}
        />
        <TambahOperatorModal
          onClose={onCloseTambahOperator}
          isOpen={isOpenTambahOperator}
          refetch={refetchGetOperator}
          dataUnits={dataUnits}
          disabledUnit={disabled}
        />
        <EditOperatorModal
          onClose={onCloseEditOperator}
          isOpen={isOpenEditOperator}
          refetch={refetchGetOperator}
          dataUnits={dataUnits}
          data={data}
          onCloseDetailOperator={onCloseDetailOperator}
          disabledUnit={disabled}
        />
        <DeleteOperatorModal
          onClose={onCloseDeleteOperator}
          isOpen={isOpenDeleteOperator}
          refetch={refetchGetOperator}
          data={data}
          onCloseDetailOperator={onCloseDetailOperator}
        />
      </Modal>
    </DarkMode>
  );
};

export default Operator;
