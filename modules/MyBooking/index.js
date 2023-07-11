import TablePaginate from "@/common/components/Table/TablePaginate";
import { getFetchcer } from "@/common/utils/axios";
import {
  Box,
  Button,
  DarkMode,
  Flex,
  HStack,
  IconButton,
  Input,
  Select,
  SimpleGrid,
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
import useAuthUserStore from "@/common/hooks/store/useAuthUserStore ";
import getbooking from "../Booking/api/getbooking";
import TableHeaderBooking from "./Booking/components/Table/TableHeaderBooking";
import TableMainBooking from "./Booking/components/Table/TableMainBooking";
import DetailBookingModal from "./Booking/components/Modal/DetailBookingModal";
import Members from "../Members";
import getmember from "../Members/api/getmember";
import TableHeaderMember from "./Member/components/Table/TableHeaderMember";
import TableMainMember from "./Member/components/Table/TableMainMember";
import DetailMemberModal from "./Member/components/Modal/DetailMemberModal";

const MyBooking = () => {
  const session = useAuthUserStore((state) => state.session);

  const {
    isOpen: isOpenDetailBooking,
    onOpen: onOpenDetailBooking,
    onClose: onCloseDetailBooking,
  } = useDisclosure();

  const {
    isOpen: isOpenDetailMember,
    onOpen: onOpenDetailMember,
    onClose: onCloseDetailMember,
  } = useDisclosure();

  const modalBooking = useBreakpointValue({
    base: onOpenDetailBooking,
    md: onCloseDetailBooking,
  });
  const modalMember = useBreakpointValue({
    base: onOpenDetailMember,
    md: onCloseDetailMember,
  });

  const [pageBooking, setPageBooking] = useState(1);
  const [limitBooking, setLimitBooking] = useState(10);
  const [pageMember, setPageMember] = useState(1);
  const [limitMember, setLimitMember] = useState(10);
  const [filterNamaBooking, setFilterNamaBooking] = useState(false);

  const [statusBooking, setStatusBooking] = useState("approved");
  const [clickStatusBooking, setClickStatusBooking] = useState("now");
  const [clickStatusMember, setClickStatusMember] = useState("now");
  const [isActiveBooking, setIsActiveBooking] = useState(false);
  const [isActiveMember, setIsActiveMember] = useState(false);

  useEffect(() => {
    if (clickStatusBooking != "now") {
      setIsActiveBooking(true);
      setLimitBooking(10);
    } else {
      setLimitBooking(9999);
      setIsActiveBooking(false);
    }
    if (clickStatusMember != "now") {
      setIsActiveMember(true);
      setLimitMember(10);
    } else {
      setIsActiveMember(false);
      setLimitMember(9999);
    }
  }, [clickStatusBooking, clickStatusMember]);

  const {
    data: resBooking,
    isLoadingBooking,
    refetch: refetchGetBooking,
  } = getbooking({
    filter_status: true,
    filter_unit: false,
    filter_kelas: false,
    filter_nama: true,
    status: statusBooking,
    id_unit: "",
    id_kelas: "",
    nama: session?.data?.nama.toUpperCase(),
    page: pageBooking,
    limit: limitBooking,
  });

  const {
    data: resMember,
    isLoadingMember,
    refetch: refetchGetMember,
  } = getmember({
    filter_booking: false,
    filter_nama: true,
    nama: session?.data?.nama.toUpperCase(),
    id_booking: "",
    page: pageMember,
    limit: limitMember,
  });

  const [data, setData] = useState({});

  const handleModalDetailBooking = (id) => {
    const url = `/booking/${id}`;
    const res = getFetchcer(url).then((res) => setData(res));
    modalBooking();
  };

  const handleModalDetailMember = (id) => {
    const url = `/booking/${id}`;
    const res = getFetchcer(url).then((res) => setData(res));
    modalMember();
  };

  const {
    isOpen: isOpenMember,
    onOpen: onOpenMember,
    onClose: onCloseMember,
  } = useDisclosure();

  const [idBooking, setIdBooking] = useState(0);

  const handleModalOpenMember = (id) => {
    setIdBooking(id);
    onOpenMember();
  };

  return (
    <Tabs isFitted variant="soft-rounded" colorScheme="teal">
      <TabList px={2}>
        <Tab color={"white"}>BOOKING</Tab>
        <Tab color={"white"}>MEMBER</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Box mb={2}>
            <SimpleGrid columns={{ base: "2", md: "3", lg: "5" }} spacing={"2"}>
              <Button
                size={"sm"}
                borderRadius={"full"}
                bgColor={clickStatusBooking == "now" ? "white" : "gray.600"}
                color={clickStatusBooking == "now" ? "black" : "white"}
                onClick={() => {
                  setClickStatusBooking("now");
                  setStatusBooking("approved");
                }}
              >
                Now
              </Button>
              <Button
                size={"sm"}
                borderRadius={"full"}
                bgColor={
                  clickStatusBooking == "approved" ? "white" : "gray.600"
                }
                color={clickStatusBooking == "approved" ? "black" : "white"}
                _hover={{ color: "black", bgColor: "white" }}
                onClick={() => {
                  setClickStatusBooking("approved");
                  setStatusBooking("approved");
                }}
              >
                Approved
              </Button>
              <Button
                size={"sm"}
                borderRadius={"full"}
                bgColor={clickStatusBooking == "waiting" ? "white" : "gray.600"}
                color={clickStatusBooking == "waiting" ? "black" : "white"}
                _hover={{ color: "black", bgColor: "white" }}
                onClick={() => {
                  setClickStatusBooking("waiting");
                  setStatusBooking("waiting");
                }}
              >
                Waiting
              </Button>
              <Button
                size={"sm"}
                borderRadius={"full"}
                bgColor={clickStatusBooking == "cancel" ? "white" : "gray.600"}
                color={clickStatusBooking == "cancel" ? "black" : "white"}
                _hover={{ color: "black", bgColor: "white" }}
                onClick={() => {
                  setClickStatusBooking("cancel");
                  setStatusBooking("cancel");
                }}
              >
                Cancel
              </Button>
              <Button
                size={"sm"}
                borderRadius={"full"}
                bgColor={
                  clickStatusBooking == "rejected" ? "white" : "gray.600"
                }
                color={clickStatusBooking == "rejected" ? "black" : "white"}
                _hover={{ color: "black", bgColor: "white" }}
                onClick={() => {
                  setClickStatusBooking("rejected");
                  setStatusBooking("rejected");
                }}
              >
                Rejected
              </Button>
            </SimpleGrid>
          </Box>
          <TableHeaderBooking />
          <TableMainBooking
            items={resBooking}
            isLoading={isLoadingBooking}
            refetch={refetchGetBooking}
            isActive={isActiveBooking}
            handleModalOpenMember={handleModalOpenMember}
            // handleModalEditBooking={handleModalEditBooking}
            // handleModalDeleteBooking={handleModalDeleteBooking}
            handleModalDetailBooking={handleModalDetailBooking}
          />
          {resBooking?.status == 200 && isActiveBooking == true && (
            <TablePaginate
              limit={limitBooking}
              page={pageBooking}
              pageCount={resBooking?.totalPage}
              totalRows={resBooking?.totalRows}
              setPage={setPageBooking}
              setLimit={setLimitBooking}
              isActivelimit={false}
            />
          )}
        </TabPanel>
        <TabPanel>
          <Box mb={2}>
            <SimpleGrid columns={{ base: "2", md: "3", lg: "5" }} spacing={"2"}>
              <Button
                size={"sm"}
                borderRadius={"full"}
                bgColor={clickStatusMember == "now" ? "white" : "gray.600"}
                color={clickStatusMember == "now" ? "black" : "white"}
                onClick={() => {
                  setClickStatusMember("now");
                }}
              >
                Now
              </Button>
              <Button
                size={"sm"}
                borderRadius={"full"}
                bgColor={clickStatusMember == "all" ? "white" : "gray.600"}
                color={clickStatusMember == "all" ? "black" : "white"}
                _hover={{ color: "black", bgColor: "white" }}
                onClick={() => {
                  setClickStatusMember("all");
                }}
              >
                All
              </Button>
            </SimpleGrid>
          </Box>
          <TableHeaderMember />
          <TableMainMember
            items={resMember}
            isLoading={isLoadingMember}
            refetch={refetchGetMember}
            isActive={isActiveMember}
            // handleModalOpenMember={handleModalOpenMember}
            // handleModalEditBooking={handleModalEditBooking}
            // handleModalDeleteBooking={handleModalDeleteBooking}
            handleModalDetailBooking={handleModalDetailMember}
          />
          {resMember?.status == 200 && isActiveMember == true && (
            <TablePaginate
              limit={limitMember}
              page={pageMember}
              pageCount={resMember?.totalPage}
              totalRows={resMember?.totalRows}
              setPage={setPageMember}
              setLimit={setLimitMember}
              isActivelimit={false}
            />
          )}
        </TabPanel>
      </TabPanels>
      <DetailBookingModal
        isOpen={isOpenDetailBooking}
        onClose={onCloseDetailBooking}
        data={data}
        refetch={refetchGetBooking}
        handleModalOpenMember={handleModalOpenMember}
        // handleModalEditBooking={handleModalEditBooking}
        // handleModalDeleteBooking={handleModalDeleteBooking}
      />
      <DetailMemberModal
        isOpen={isOpenDetailMember}
        onClose={onCloseDetailMember}
        data={data}
        refetch={refetchGetMember}
        // handleModalOpenMember={handleModalOpenMember}
        // handleModalEditBooking={handleModalEditBooking}
        // handleModalDeleteBooking={handleModalDeleteBooking}
      />
      <Members
        isOpen={isOpenMember}
        onClose={onCloseMember}
        id_booking={idBooking}
      />
    </Tabs>
  );
};

export default MyBooking;
