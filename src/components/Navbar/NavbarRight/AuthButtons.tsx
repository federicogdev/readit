import { Button } from "@chakra-ui/react";
import React from "react";

type AuthButtonsProps = {};

const AuthButtons: React.FC<AuthButtonsProps> = () => {
  return (
    <>
      <Button
        variant="outline"
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        onClick={() => console.log("Login")}
      >
        Login
      </Button>
      <Button
        display={{ base: "none", sm: "flex" }}
        height="28px"
        width={{ base: "70px", md: "110px" }}
        onClick={() => console.log("Register")}
      >
        Register
      </Button>
    </>
  );
};
export default AuthButtons;
