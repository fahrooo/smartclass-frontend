import { Box, Text, Icon } from "@chakra-ui/react";
import React, { useState } from "react";

const DashboardKelasItem = ({
  label,
  icon,
  kelas,
  setKelas,
  id,
  setLabelKelas,
}) => {
  const isActive = id === kelas ? true : false;
  return (
    <Box
      bgColor={isActive ? "#EEEAFF" : "#A0B8CC"}
      color="black"
      w="80px"
      h="80px"
      borderRadius="25px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      cursor="pointer"
      _hover={{bgColor: "#EEEAFF"}}
      onClick={() => {
        setKelas(id);
        setLabelKelas(label);
      }}
    >
      <Text fontSize="12px" fontWeight="bold">
        {label}
      </Text>
      <Icon as={icon} boxSize={8} mt="5px" />
    </Box>
  );
};

export default DashboardKelasItem;
