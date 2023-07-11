import TablePaginate from "@/common/components/Table/TablePaginate";
import { getFetchcer } from "@/common/utils/axios";
import {
  Box,
  DarkMode,
  Flex,
  IconButton,
  Input,
  Select,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdPersonAdd } from "react-icons/md";
import getusers from "./api/getusers";
import EditUserModal from "./components/Modal/EditUserModal";
import DeleteUserModal from "./components/Modal/DeleteUserModal";
import TambahUserModal from "./components/Modal/TambahUserModal";
import DetailUserModal from "./components/Modal/DetailUserModal";
import getunits from "../Area/Units/api/getunits";
import TableHeaderUsers from "./components/Tabel/TableHeaderUsers";
import TableMainUsers from "./components/Tabel/TableMainUsers";
import useAuthUserStore from "@/common/hooks/store/useAuthUserStore ";

const Users = () => {
  const session = useAuthUserStore((state) => state.session);

  const {
    isOpen: isOpenDetailUser,
    onOpen: onOpenDetailUser,
    onClose: onCloseDetailUser,
  } = useDisclosure();

  const {
    isOpen: isOpenTambahUser,
    onOpen: onOpenTambahUser,
    onClose: onCloseTambahUser,
  } = useDisclosure();

  const {
    isOpen: isOpenEditUser,
    onOpen: onOpenEditUser,
    onClose: onCloseEditUser,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteUser,
    onOpen: onOpenDeleteUser,
    onClose: onCloseDeleteUser,
  } = useDisclosure();

  const modal = useBreakpointValue({
    base: onOpenDetailUser,
    md: onCloseDetailUser,
  });

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [filterNama, setFilterNama] = useState(false);
  const [filterUnit, setFilterUnit] = useState(false);
  const [filterRole, setFilterRole] = useState(false);
  const [nama, setNama] = useState("");
  const [unit, setUnit] = useState("");
  const [role, setRole] = useState("");

  const [data, setData] = useState({});

  const [disabled, setDisabled] = useState(true);

  const handleModalDetailUser = (id) => {
    const url = `/users/${id}`;
    const res = getFetchcer(url).then((res) => setData(res));
    modal();
  };

  const handleModalEditUser = (id) => {
    const url = `/users/${id}`;
    const res = getFetchcer(url).then((res) => setData(res));
    onOpenEditUser();
  };

  const handleModalDeleteUser = (id) => {
    const url = `/users/${id}`;
    const res = getFetchcer(url).then((res) => setData(res));
    onOpenDeleteUser();
  };

  const {
    data: res,
    isLoading,
    refetch: refetchGetUsers,
  } = getusers({
    filter_nama: filterNama,
    filter_unit: filterUnit,
    filter_role: filterRole,
    nama: nama.toUpperCase(),
    id_unit: Number(unit),
    role: role,
    page: page,
    limit: limit,
  });

  const { data: dataUnits, isLoading: isLoadingUnits } = getunits({
    filter_nama: false,
    nama: "",
    page: 1,
    limit: 9999,
  });

  useEffect(() => {
    if (role != "") {
      setFilterRole(true);
      setPage(1);
    } else {
      setFilterRole(false);
    }
    if (nama != "") {
      setFilterNama(true);
      setPage(1);
    } else {
      setFilterNama(false);
    }
    if (unit != "") {
      setFilterUnit(true);
      setPage(1);
    } else {
      setFilterUnit(false);
    }

    if (session?.data?.role == "super admin") {
      setDisabled(false);
    } else {
      setUnit(session.data?.id_unit);
      setDisabled(true);
    }
  }, [role, nama, unit, session]);

  useEffect(() => {
    if (res?.totalRows <= limit) {
      setPage(1);
    }
  }, [res?.totalRows, limit]);

  return (
    <Box h="100%">
      <Box
        mb={2}
        display="flex"
        justifyContent={{ base: "center", md: "start" }}
      >
        <Text
          w="max-content"
          color="#e0e0e0"
          fontSize="2xl"
          fontWeight="semibold"
        >
          USERS
        </Text>
      </Box>
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
                <option value="0">-</option>
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
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Semua Role</option>
              <option value="super admin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="operator">Operator</option>
              <option value="peserta">Peserta</option>
            </Select>
          </DarkMode>
          <IconButton
            colorScheme="teal"
            aria-label="Call Segun"
            icon={<MdPersonAdd />}
            size="md"
            onClick={onOpenTambahUser}
          />
        </Flex>
      </Flex>
      <TableHeaderUsers />
      <TableMainUsers
        items={res}
        isLoading={isLoading}
        refetch={refetchGetUsers}
        handleModalEditUser={handleModalEditUser}
        handleModalDeleteUser={handleModalDeleteUser}
        handleModalDetailUser={handleModalDetailUser}
        disabledUnit={disabled}
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
      <DetailUserModal
        isOpen={isOpenDetailUser}
        onClose={onCloseDetailUser}
        data={data}
        handleModalEditUser={handleModalEditUser}
        handleModalDeleteUser={handleModalDeleteUser}
        disabledUnit={disabled}
      />
      <TambahUserModal
        onClose={onCloseTambahUser}
        isOpen={isOpenTambahUser}
        refetch={refetchGetUsers}
        dataUnits={dataUnits}
        disabledUnit={disabled}
      />
      <EditUserModal
        onClose={onCloseEditUser}
        isOpen={isOpenEditUser}
        data={data}
        refetch={refetchGetUsers}
        dataUnits={dataUnits}
        onCloseDetailUser={onCloseDetailUser}
        disabledUnit={disabled}
      />
      <DeleteUserModal
        onClose={onCloseDeleteUser}
        isOpen={isOpenDeleteUser}
        data={data}
        refetch={refetchGetUsers}
        onCloseDetailUser={onCloseDetailUser}
      />
    </Box>
  );
};

export default Users;
