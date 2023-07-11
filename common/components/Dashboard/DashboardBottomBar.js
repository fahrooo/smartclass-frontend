import { Box, HStack, SimpleGrid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DashboardBottombarItem from "./DashboardBottombarItem";
import useAuthUserStore from "@/common/hooks/store/useAuthUserStore ";

const DashboardBottomBar = ({ items }) => {
  const session = useAuthUserStore((state) => state.session);
  const { pathname } = useRouter();

  const [spacing, setSpacing] = useState(10);

  useEffect(() => {
    if (
      session?.data?.role == "super admin" ||
      session?.data?.role == "admin"
    ) {
      setSpacing(10);
    } else if (session?.data?.role == "operator") {
      setSpacing(20);
    } else if (session?.data?.role == "peserta") {
      setSpacing(20);
    }
  }, [session.data?.role]);

  return (
    <Box
      position="fixed"
      bottom="0"
      zIndex="50"
      height="14"
      w="100%"
      bgColor="#445359FA"
      visibility={{ base: "visible", md: "hidden" }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={2}
      borderTopStartRadius="15px"
      borderTopEndRadius="15px"
    >
      <HStack spacing={spacing}>
        {items?.map((item, index) => (
          <DashboardBottombarItem key={index} item={item} pathname={pathname} />
        ))}
      </HStack>
    </Box>
  );
};

export default DashboardBottomBar;
