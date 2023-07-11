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

const DetailOperatorModal = ({
  isOpen,
  onClose,
  data,
  handleModalEditOperator,
  handleModalDeleteOperator,
}) => {
  return (
    <DarkMode>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent m={2}>
          <ModalHeader color="white">DETAIL USER</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody color="white">
            <HStack>
              <Text w="20%">NAMA</Text>
              <Text>: {data?.data?.user?.nama}</Text>
            </HStack>
            <HStack>
              <Text w="20%">KELAS</Text>
              <Text>: {data?.data?.classroom?.nama}</Text>
            </HStack>
            <HStack>
              <Text w="20%">UNIT</Text>
              <Text>: {data?.data?.classroom?.unit?.nama.toUpperCase()}</Text>
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
                    handleModalEditOperator(data?.data?.id);
                  }}
                />
                <IconButton
                  colorScheme="red"
                  aria-label="Call Segun"
                  icon={<MdDelete />}
                  size="sm"
                  onClick={() => {
                    handleModalDeleteOperator(data?.data?.id);
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

export default DetailOperatorModal;
