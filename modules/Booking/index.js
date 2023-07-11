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
import { BsCalendarWeek } from "react-icons/bs";
import getkelas from "../Area/Kelas/api/getkelas";
import getunits from "../Area/Units/api/getunits";
import useAuthUserStore from "@/common/hooks/store/useAuthUserStore ";
import getbooking from "./api/getbooking";
import TableHeaderBooking from "./components/Table/TableHeaderBooking";
import TableMainBooking from "./components/Table/TableMainBooking";
import DetailBookingModal from "./components/Modal/DetailBookingModal";
import TambahBookingModal from "./components/Modal/TambahBookingModal";
import EditBookingModal from "./components/Modal/EditBookingModal";
import DeleteBookingModal from "./components/Modal/DeleteBookingModal";
import Members from "../Members";

const Booking = ({ isOpen, onClose }) => {
  const session = useAuthUserStore((state) => state.session);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [filterStatus, setFilterStatus] = useState(false);
  const [filterUnit, setFilterUnit] = useState(false);
  const [filterKelas, setFilterKelas] = useState(false);
  const [filterNama, setFilterNama] = useState(false);
  const [status, setStatus] = useState("");
  const [unit, setUnit] = useState("");
  const [kelas, setKelas] = useState("");
  const [nama, setNama] = useState("");

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
    refetch: refetchGetBooking,
  } = getbooking({
    filter_status: filterStatus,
    filter_unit: filterUnit,
    filter_kelas: filterKelas,
    filter_nama: filterNama,
    status: status,
    id_unit: Number(unit),
    id_kelas: Number(kelas),
    nama: nama.toUpperCase(),
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
    if (status != "") {
      setFilterStatus(true);
      setPage(1);
    } else {
      setFilterStatus(false);
    }
    if (unit != "") {
      setFilterUnit(true);
      setDisableFilterKelas(false);
      setPage(1);
    } else {
      setFilterUnit(false);
      setDisableFilterKelas(true);
    }
    if (kelas != "") {
      setFilterKelas(true);
      setPage(1);
    } else {
      setFilterKelas(false);
    }
  }, [nama, status, unit, kelas, dataKelas]);

  useEffect(() => {
    if (res?.totalRows <= limit) {
      setPage(1);
    }
  }, [res?.totalRows, limit]);

  const {
    isOpen: isOpenDetailBooking,
    onOpen: onOpenDetailBooking,
    onClose: onCloseDetailBooking,
  } = useDisclosure();

  const {
    isOpen: isOpenTambahBooking,
    onOpen: onOpenTambahBooking,
    onClose: onCloseTambahBooking,
  } = useDisclosure();

  const {
    isOpen: isOpenEditBooking,
    onOpen: onOpenEditBooking,
    onClose: onCloseEditBooking,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteBooking,
    onOpen: onOpenDeleteBooking,
    onClose: onCloseDeleteBooking,
  } = useDisclosure();

  const {
    isOpen: isOpenMember,
    onOpen: onOpenMember,
    onClose: onCloseMember,
  } = useDisclosure();

  const modal = useBreakpointValue({
    base: onOpenDetailBooking,
    md: onCloseDetailBooking,
  });

  const [data, setData] = useState({});

  const handleModalDetailBooking = (id) => {
    const url = `/booking/${id}`;
    const res = getFetchcer(url).then((res) => setData(res));
    modal();
  };

  const handleModalEditBooking = (id) => {
    const url = `/booking/${id}`;
    const res = getFetchcer(url).then((res) => setData(res));
    onOpenEditBooking();
  };

  const handleModalDeleteBooking = (id) => {
    const url = `/booking/${id}`;
    const res = getFetchcer(url).then((res) => setData(res));
    onOpenDeleteBooking();
  };

  const [idBooking, setIdBooking] = useState(0);

  const handleModalOpenMember = (id) => {
    setIdBooking(id);
    onOpenMember();
  };

  return (
    <>
      <DarkMode>
        <Modal
          onClose={onClose}
          isOpen={isOpen}
          isCentered
          size="6xl"
          closeOnOverlayClick={false}
        >
          <ModalOverlay />
          <ModalContent color={"white"} m={2}>
            <ModalHeader>BOOKING</ModalHeader>
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
                    <DarkMode>
                      <Select
                        variant="flushed"
                        color="#e0e0e0"
                        w={{ base: "100%", md: "200px" }}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="">Semua Status</option>
                        <option value="approved">Approved</option>
                        <option value="waiting">Waiting</option>
                        <option value="cancel">Cancel</option>
                        <option value="rejected">Rejected</option>
                      </Select>
                    </DarkMode>
                    <IconButton
                      colorScheme="teal"
                      aria-label="Call Segun"
                      icon={<BsCalendarWeek />}
                      size="md"
                      onClick={onOpenTambahBooking}
                    />
                  </Flex>
                </Flex>
                <TableHeaderBooking />
                <TableMainBooking
                  items={res}
                  isLoading={isLoading}
                  refetch={refetchGetBooking}
                  handleModalOpenMember={handleModalOpenMember}
                  handleModalEditBooking={handleModalEditBooking}
                  handleModalDeleteBooking={handleModalDeleteBooking}
                  handleModalDetailBooking={handleModalDetailBooking}
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
          <DetailBookingModal
            isOpen={isOpenDetailBooking}
            onClose={onCloseDetailBooking}
            data={data}
            refetch={refetchGetBooking}
            handleModalOpenMember={handleModalOpenMember}
            handleModalEditBooking={handleModalEditBooking}
            handleModalDeleteBooking={handleModalDeleteBooking}
          />
          <TambahBookingModal
            onClose={onCloseTambahBooking}
            isOpen={isOpenTambahBooking}
            refetch={refetchGetBooking}
            dataUnits={dataUnits}
            disabledUnit={disabled}
          />
          <EditBookingModal
            onClose={onCloseEditBooking}
            isOpen={isOpenEditBooking}
            refetch={refetchGetBooking}
            dataUnits={dataUnits}
            data={data}
            onCloseDetailBooking={onCloseDetailBooking}
            disabledUnit={disabled}
          />
          <DeleteBookingModal
            onClose={onCloseDeleteBooking}
            isOpen={isOpenDeleteBooking}
            refetch={refetchGetBooking}
            data={data}
            onCloseDetailBooking={onCloseDetailBooking}
          />
        </Modal>
      </DarkMode>
      <Members
        isOpen={isOpenMember}
        onClose={onCloseMember}
        id_booking={idBooking}
      />
    </>
  );
};

export default Booking;
