import AuthModal from "@/components/Modal/Auth/AuthModal";
import { Flex } from "@chakra-ui/react";
import React, { FC } from "react";
import AuthButtons from "./AuthButtons";

type NavbarRightProps = {};

const NavbarRight: FC<NavbarRightProps> = () => {
  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center">
        <AuthButtons />
      </Flex>
    </>
  );
};
export default NavbarRight;
