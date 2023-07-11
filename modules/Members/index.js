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
import useAuthUserStore from "@/common/hooks/store/useAuthUserStore ";
import TableHeaderMember from "./components/Table/TableHeaderMember";
import TableMainMember from "./components/Table/TableMainMember";
import getmember from "./api/getmember";
import { MdPersonAdd } from "react-icons/md";
import TambahMemberModal from "./components/Modal/TambahMemberModal";
import DeleteMemberModal from "./components/Modal/DeleteMemberModal";

const Members = ({ isOpen, onClose, id_booking }) => {
  const session = useAuthUserStore((state) => state.session);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [filterNama, setFilterNama] = useState(false);
  const [nama, setNama] = useState("");
  const [idBooking, setIdBooking] = useState(0);

  const [disabled, setDisabled] = useState(true);

  const {
    data: res,
    isLoading,
    refetch: refetchGetMember,
  } = getmember({
    filter_booking: true,
    filter_nama: filterNama,
    nama: nama.toUpperCase(),
    id_booking: id_booking,
    page: page,
    limit: limit,
  });

  useEffect(() => {
    if (nama != "") {
      setFilterNama(true);
      setPage(1);
    } else {
      setFilterNama(false);
    }
  }, [nama]);

  useEffect(() => {
    if (res?.totalRows <= limit) {
      setPage(1);
    }
  }, [res?.totalRows, limit]);

  useEffect(() => {
    setIdBooking(id_booking);
  }, [id_booking]);

  const {
    isOpen: isOpenTambahMember,
    onOpen: onOpenTambahMember,
    onClose: onCloseTambahMember,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteMember,
    onOpen: onOpenDeleteMember,
    onClose: onCloseDeleteMember,
  } = useDisclosure();

  const [data, setData] = useState({});
  const [idMember, setIdMember] = useState(0);

  const handleModalDeleteMember = (id_user, id_member) => {
    const url = `/users/${id_user}`;
    const res = getFetchcer(url).then((res) => setData(res));
    setIdMember(id_member);
    onOpenDeleteMember();
  };

  return (
    <DarkMode>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        closeOnOverlayClick={false}
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent color={"white"} m={2}>
          <ModalHeader>MEMBERS</ModalHeader>
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
                    w={{ base: "100%", md: "50%" }}
                    onChange={(e) => {
                      setNama(e.target.value);
                    }}
                    mb={2}
                    size="md"
                  />
                </DarkMode>
                <Flex gap={2} flexDir={{ base: "column", md: "row" }}>
                  <IconButton
                    colorScheme="teal"
                    aria-label="Call Segun"
                    icon={<MdPersonAdd />}
                    size="md"
                    onClick={onOpenTambahMember}
                  />
                </Flex>
              </Flex>
              <TableHeaderMember />
              <TableMainMember
                items={res}
                isLoading={isLoading}
                refetch={refetchGetMember}
                handleModalDeleteMember={handleModalDeleteMember}
              />
              {res?.status == 200 && (
                <TablePaginate
                  limit={limit}
                  page={page}
                  pageCount={res?.totalPage}
                  totalRows={res?.totalRows}
                  setPage={setPage}
                  setLimit={setLimit}
                  isActivelimit={false}
                />
              )}
            </ModalBody>
          </LightMode>
          <ModalFooter></ModalFooter>
        </ModalContent>
        <TambahMemberModal
          onClose={onCloseTambahMember}
          isOpen={isOpenTambahMember}
          refetch={refetchGetMember}
          idBooking={idBooking}
        />
        <DeleteMemberModal
          onClose={onCloseDeleteMember}
          isOpen={isOpenDeleteMember}
          refetch={refetchGetMember}
          data={data}
          idMember={idMember}
        />
      </Modal>
    </DarkMode>
  );
};

export default Members;
