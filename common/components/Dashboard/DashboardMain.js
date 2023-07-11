import { Box } from "@chakra-ui/react";
import React from "react";
import DashboardNavbar from "./DashboardNavbar";

const DashboardMain = ({ children }) => {
  return (
    <Box
      bgColor="#262A2D"
      w="100%"
      minH={{ base: "100%", md: "100%" }}
      borderRadius="55px"
      p={{ base: "15px", md: "30px" }}
    >
      <DashboardNavbar />
      <Box
        h={{ base: "75%", md: "80%" }}
        mt={4}
        bgColor="#393D43"
        borderRadius="30px"
        px="30px"
        py="10px"
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardMain;
