import AuthModal from "@/components/Modal/Auth/AuthModal";
import { auth } from "@/firebase/app";
import { Button, Flex } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { FC } from "react";
import AuthButtons from "./AuthButtons";

type NavbarRightProps = {
  user: any;
};

const NavbarRight: FC<NavbarRightProps> = ({ user }) => {
  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center">
        {user ? (
          <Button bg="red" onClick={() => signOut(auth)}>
            Logout
          </Button>
        ) : (
          <AuthButtons />
        )}
      </Flex>
    </>
  );
};
export default NavbarRight;
