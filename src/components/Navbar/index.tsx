import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import NavbarRight from "./NavbarRight";
import SearchInput from "./SearchInput";

const Navbar: React.FC = () => {
  return (
    <Flex bg="white" h="44px" p="6px 12px">
      <Flex align="center" mr={2}>
        <Image src="/images/logo.png" h="30px" mr={1} />
        <Text display={{ base: "none", md: "unset" }}>Readit</Text>
      </Flex>
      <SearchInput />
      <NavbarRight />
    </Flex>
  );
};
export default Navbar;
