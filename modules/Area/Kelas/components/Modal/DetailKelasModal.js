import {
  Badge,
  Button,
  DarkMode,
  HStack,
  IconButton,
  LightMode,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { MdDelete, MdEdit } from "react-icons/md";

const DetailKelasModal = ({
  isOpen,
  onClose,
  data,
  handleModalEditKelas,
  handleModalDeleteKelas,
}) => {
  return (
    <DarkMode>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent m={2}>
          <ModalHeader color="white">DETAIL KELAS</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody color="white">
            <HStack>
              <Text w="20%">NAMA</Text>
              <Text>: {data?.data?.nama}</Text>
            </HStack>
            <HStack>
              <Text w="20%">TOPIC</Text>
              <Text>: {data?.data?.topic}</Text>
            </HStack>
            <HStack>
              <Text w="20%">UNIT</Text>
              <Text>
                :{" "}
                {data?.data?.unit == null
                  ? "-"
                  : data?.data?.unit?.nama.toUpperCase()}
              </Text>
            </HStack>
          </ModalBody>
          <ModalFooter>
            <HStack spacing={2} justifyContent="center">
              <LightMode>
                <IconButton
                  colorScheme="messenger"
                  aria-label="Call Segun"
                  icon={<MdEdit />}
                  size="sm"
                  onClick={() => {
                    handleModalEditKelas(data?.data?.id);
                  }}
                />
                <IconButton
                  colorScheme="red"
                  aria-label="Call Segun"
                  icon={<MdDelete />}
                  size="sm"
                  onClick={() => {
                    handleModalDeleteKelas(data?.data?.id);
                  }}
                />
              </LightMode>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </DarkMode>
  );
};

export default DetailKelasModal;
