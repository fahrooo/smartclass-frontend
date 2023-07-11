import { Center, VStack, Icon, Text } from "@chakra-ui/react";
import { RiFolderInfoFill } from "react-icons/ri";
import React from "react";

const MessageNotFoundKelas = () => {
  return (
    <Center h="full">
      <VStack color="#e0e0e0">
        <Icon as={RiFolderInfoFill} fontSize="5xl" />
        <Text fontWeight="semibold">Sorry, No Kelas Found!</Text>
      </VStack>
    </Center>
  );
};

export default MessageNotFoundKelas;
