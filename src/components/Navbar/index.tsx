import { auth } from "@/firebase/app";
import { Flex, Image, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Directory from "./Directory";
import NavbarRight from "./NavbarRight";
import SearchInput from "./SearchInput";

const Navbar: React.FC = () => {
  const [user] = useAuthState(auth);

  return (
    <Flex
      bg="white"
      h="44px"
      p="6px 12px"
      justifyContent={{ md: "space-between" }}
    >
      <Link href="/">
        <Flex
          align="center"
          width={{ base: "40px", md: "auto" }}
          mr={{ base: 0, md: 2 }}
          cursor="pointer"
        >
          <Image src="/images/logo.png" h="30px" mr={1} />
          <Text display={{ base: "none", md: "unset" }}>Readit</Text>
        </Flex>
      </Link>
      {user && <Directory />}
      <SearchInput user={user} />
      <NavbarRight user={user} />
    </Flex>
  );
};
export default Navbar;
