import { authModalState } from "@/recoil/atoms/authModalAtom";
import { Button } from "@chakra-ui/react";
import React from "react";

import { useSetRecoilState } from "recoil";

type AuthButtonsProps = {};

const AuthButtons: React.FC<AuthButtonsProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <>
      <Button
        variant="outline"
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        onClick={() => setAuthModalState({ open: true, view: "login" })}
      >
        Login
      </Button>
      <Button
        display={{ base: "none", sm: "flex" }}
        height="28px"
        width={{ base: "70px", md: "110px" }}
        onClick={() => setAuthModalState({ open: true, view: "register" })}
      >
        Register
      </Button>
    </>
  );
};
export default AuthButtons;
