import {
  Button,
  DarkMode,
  Flex,
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
import React, { use, useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useAuthUserStore from "@/common/hooks/store/useAuthUserStore ";
import getusers from "@/modules/Users/api/getusers";
import TableHeaderUsers from "../Table/TableHeaderUsers";
import TableMainUsers from "../Table/TableMainUsers";
import TablePaginate from "@/common/components/Table/TablePaginate";
import postmember from "../../api/postmember";

const TambahMemberModal = ({ onClose, isOpen, refetch, idBooking }) => {
  const toast = useToast();

  const session = useAuthUserStore((state) => state.session);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [filterNama, setFilterNama] = useState(false);
  const [nama, setNama] = useState("");
  const [user, setUser] = useState("");

  const {
    data: res,
    isLoading,
    refetch: refetchGetUsers,
  } = getusers({
    filter_nama: filterNama,
    filter_unit: false,
    filter_role: false,
    nama: nama.toUpperCase(),
    id_unit: 0,
    role: "",
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

  return (
    <DarkMode>
      <Modal
        onClose={() => {
          setNama("");
          setPage(1);
          onClose();
        }}
        isOpen={isOpen}
        isCentered
      >
        <ModalOverlay />
        <ModalContent color="white" m={2}>
          <ModalHeader>TAMBAH MEMBER</ModalHeader>
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
              </Flex>
              <TableHeaderUsers />
              <TableMainUsers
                items={res}
                isLoading={isLoading}
                refetch={refetch}
                idBooking={idBooking}
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
            <ModalFooter></ModalFooter>
          </LightMode>
        </ModalContent>
      </Modal>
    </DarkMode>
  );
};

export default TambahMemberModal;
