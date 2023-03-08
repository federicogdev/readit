import { authModalState } from "@/recoil/atoms/authModalAtom";
import { Flex } from "@chakra-ui/react";
import React, { FC } from "react";

import { useRecoilValue } from "recoil";
import Login from "./Login";
import Register from "./Register";

type AuthInputsProps = {};

const AuthInputs: FC<AuthInputsProps> = () => {
  const modalState = useRecoilValue(authModalState);
  return (
    <Flex direction="column" align="center" mt={4}>
      {modalState.view === "login" && <Login />}
      {modalState.view === "register" && <Register />}
    </Flex>
  );
};
export default AuthInputs;
