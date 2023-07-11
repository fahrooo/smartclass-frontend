import React, { useEffect } from "react";
import { Box, Icon, Flex, Text, Select } from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ReactPaginate from "react-paginate";

const TablePaginate = ({
  pageCount,
  totalRows,
  setPage,
  page,
  isActivelimit,
  setLimit,
  limit,
}) => {
  return (
    <Flex
      justifyContent={{ base: "center", md: "space-between" }}
      alignItems="center"
      flexDir={{ base: "column", md: "row" }}
    >
      {isActivelimit == false ? (
        <Box></Box>
      ) : (
        <Flex gap={2} justifyContent="center" alignItems="center">
          <Text color="white">Showing</Text>
          <Select
            bg="#e0e0e0"
            borderColor="#e0e0e0"
            color="black"
            w="max-content"
            size="sm"
            rounded="lg"
            onChange={(e) => {
              setPage(1);
              setLimit(e.target.value);
            }}
            value={limit}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </Select>
          <Text color="white">of {totalRows} entires</Text>
        </Flex>
      )}
      <Box
        mt={{ base: 4, md: 0 }}
        sx={{
          ".pg-container": {
            listStyle: "none",
            display: "flex",
            gap: "5px",
          },
          ".pg-item": {
            width: { base: "full", md: "47px" },
            height: { base: "30px", md: "35px", xl: "40px" },
            lineHeight: "0",
            fontSize: { base: "10px", xl: "sm" },
            display: "flex",
            padding: { base: "1.5" },
            color: "white",
            bg: "#262A2D",
            justifyContent: "center",
            alignItems: "center",
            rounded: { base: "3px", xl: "md" },
            fontFamily: "button",
            _hover: { bg: "#e0e0e0", color: "#262A2D" },
            userSelect: "none",
            transitionProperty: "common",
            transitionDuration: "normal",
          },
          ".pg-item-active": {
            color: "#262A2D",
            bg: "#e0e0e0",
          },
          ".pg-item-disabled": {
            color: "white",
            bg: "#262A2D",
            cursor: "not-allowed",
          },
          ".pg-break": {
            py: "3",
            color: "#e0e0e0",
          },
        }}
      >
        <ReactPaginate
          breakLabel="..."
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={pageCount == undefined ? 0 : pageCount}
          nextLabel={<Icon as={FiChevronRight} fontSize="md" />}
          previousLabel={<Icon as={FiChevronLeft} fontSize="md" />}
          renderOnZeroPageCount={null}
          containerClassName="pg-container"
          previousLinkClassName="pg-item"
          nextLinkClassName="pg-item"
          pageLinkClassName="pg-item"
          activeLinkClassName="pg-item-active"
          disabledLinkClassName="pg-item-disabled"
          breakClassName="pg-break"
          onPageChange={(page) => setPage(page.selected + 1)}
          forcePage={page - 1}
        />
      </Box>
    </Flex>
  );
};

export default TablePaginate;
