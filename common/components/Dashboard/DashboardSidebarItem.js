import { Box, Text, Icon } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const DashboardSidebarItem = ({ item, pathname }) => {
  const isActive = item.path === pathname ? true : false;

  return (
    <Link href={item.path} passHref>
      <Box
        bgColor={isActive ? "#F0FBFF" : "#32383D"}
        color={isActive ? "black" : "white"}
        w="80px"
        h="80px"
        borderRadius="25px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        _hover={{ color: "black", bgColor: "#F0FBFF" }}
      >
        <Text fontSize="12px" fontWeight="bold">
          {item.name}
        </Text>
        <Icon as={item.icon} boxSize={8} mt="5px" />
      </Box>
    </Link>
  );
};

export default DashboardSidebarItem;
