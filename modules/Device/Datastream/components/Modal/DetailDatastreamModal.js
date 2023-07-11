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

const DetailDatastreamModal = ({
  isOpen,
  onClose,
  data,
  handleModalEditDatastream,
  handleModalDeleteDatastream,
}) => {
  return (
    <DarkMode>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent m={2}>
          <ModalHeader color="white">DETAIL DATASTREAM</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody color="white">
            <HStack>
              <Text w="40%">TYPE</Text>
              <Text>: {data?.data?.perangkat?.nama}</Text>
            </HStack>
            <HStack>
              <Text w="40%">NAMA</Text>
              <Text>: {data?.data?.nama}</Text>
            </HStack>
            <HStack>
              <Text w="40%">TURN ON</Text>
              <Text>: {data?.data?.turn_on}</Text>
            </HStack>
            <HStack>
              <Text w="40%">TURN OFF</Text>
              <Text>: {data?.data?.turn_off}</Text>
            </HStack>
            <HStack>
              <Text w="40%">DEFAULT VALUE</Text>
              <Text>
                :{" "}
                {data?.data?.default_value == null
                  ? "-"
                  : data?.data?.default_value}
              </Text>
            </HStack>
            <HStack>
              <Text w="40%">MAX VALUE</Text>
              <Text>
                : {data?.data?.max_value == null ? "-" : data?.data?.max_value}
              </Text>
            </HStack>
            <HStack>
              <Text w="40%">MIN VALUE</Text>
              <Text>
                : {data?.data?.min_value == null ? "-" : data?.data?.min_value}
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
                    handleModalEditDatastream(data?.data?.id);
                  }}
                />
                <IconButton
                  colorScheme="red"
                  aria-label="Call Segun"
                  icon={<MdDelete />}
                  size="sm"
                  onClick={() => {
                    handleModalDeleteDatastream(data?.data?.id);
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

export default DetailDatastreamModal;
