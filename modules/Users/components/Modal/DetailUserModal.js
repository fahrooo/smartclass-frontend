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

const DetailUserModal = ({
  isOpen,
  onClose,
  data,
  handleModalEditUser,
  handleModalDeleteUser,
  disabledUnit,
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
              <Text w="20%">NIK</Text>
              <Text>: {data?.data?.nik}</Text>
            </HStack>
            <HStack>
              <Text w="20%">NAMA</Text>
              <Text>: {data?.data?.nama}</Text>
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
            <HStack>
              <Text w="20%">ROLE</Text>
              <Text>: {data?.data?.role.toUpperCase()}</Text>
            </HStack>
            <HStack>
              <Text w="20%">STATUS</Text>
              <Text>
                :{" "}
                {data?.data?.is_active === true ? (
                  <Badge colorScheme="green">Active</Badge>
                ) : (
                  <Badge colorScheme="red">InActive</Badge>
                )}
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
                    handleModalEditUser(data?.data?.id);
                  }}
                  isDisabled={
                    (disabledUnit == true &&
                      data?.data?.role == "super admin") ||
                    (disabledUnit == true && data?.data?.role == "admin")
                      ? true
                      : false
                  }
                />
                <IconButton
                  colorScheme="red"
                  aria-label="Call Segun"
                  icon={<MdDelete />}
                  size="sm"
                  onClick={() => {
                    handleModalDeleteUser(data?.data?.id);
                  }}
                  isDisabled={
                    (disabledUnit == true &&
                      data?.data?.role == "super admin") ||
                    (disabledUnit == true && data?.data?.role == "admin")
                      ? true
                      : false
                  }
                />
              </LightMode>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </DarkMode>
  );
};

export default DetailUserModal;
