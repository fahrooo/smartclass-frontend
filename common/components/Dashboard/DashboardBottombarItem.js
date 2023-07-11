import { Box, Text, Icon } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const DashboardBottombarItem = ({ item, pathname }) => {
  const isActive = item.path === pathname ? true : false;

  return (
    <Link href={item.path} passHref>
      <Box
        bgColor={isActive ? "#F0FBFF" : "#32383D"}
        color={isActive ? "black" : "white"}
        w="40px"
        h="40px"
        borderRadius="8px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        _hover={{ color: "black", bgColor: "#F0FBFF" }}
      >
        <Icon as={item.icon} boxSize={6} />
      </Box>
    </Link>
  );
};

export default DashboardBottombarItem;
