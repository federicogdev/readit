import { SearchIcon } from "@chakra-ui/icons";
import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React, { FC } from "react";

type SearchInputProps = {
  user?: User | null;
};

const SearchInput: FC<SearchInputProps> = ({ user }) => {
  return (
    <Flex flexGrow={1} mr={2} align="center" maxW={user ? "auto" : "600px"}>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input
          placeholder="Search Readit"
          fontSize="10pt"
          _placeholder={{ color: "gray.300" }}
          _hover={{ bg: "white", borderColor: "blue.500" }}
          _focus={{
            outline: "none",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          h="34px"
          bg="gray.50"
        />
      </InputGroup>
    </Flex>
  );
};
export default SearchInput;
