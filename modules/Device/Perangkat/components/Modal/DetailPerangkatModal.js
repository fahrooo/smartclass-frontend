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

const DetailPerangkatModal = ({
  isOpen,
  onClose,
  data,
  handleModalEditPerangkatKelas,
  handleModalDeletePerangkatKelas,
}) => {
  return (
    <DarkMode>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent m={2}>
          <ModalHeader color="white">DETAIL DEVICE</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody color="white">
            <HStack>
              <Text w="30%">NAMA</Text>
              <Text>: {data?.data?.nama}</Text>
            </HStack>
            <HStack>
              <Text w="30%">DATASTREAM</Text>
              <Text>: {data?.data?.datastream?.nama}</Text>
            </HStack>
            <HStack>
              <Text w="30%">KELAS</Text>
              <Text>: {data?.data?.classroom?.nama}</Text>
            </HStack>
            <HStack>
              <Text w="30%">UNIT</Text>
              <Text>: {data?.data?.classroom?.unit?.nama}</Text>
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
                    handleModalEditPerangkatKelas(data?.data?.id);
                  }}
                />
                <IconButton
                  colorScheme="red"
                  aria-label="Call Segun"
                  icon={<MdDelete />}
                  size="sm"
                  onClick={() => {
                    handleModalDeletePerangkatKelas(data?.data?.id);
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

export default DetailPerangkatModal;
