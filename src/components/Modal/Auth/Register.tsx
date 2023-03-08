import { authModalState } from "@/recoil/atoms/authModalAtom";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { ChangeEvent, useState } from "react";
import { useSetRecoilState } from "recoil";
type RegisterProps = {};

const Register: React.FC<RegisterProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onSubmit = () => {};

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRegisterForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        name="email"
        placeholder="email"
        type="email"
        mb={2}
        onChange={onChange}
        _placeholder={{ color: "gray.300" }}
        _hover={{ bg: "white", borderColor: "blue.500" }}
        _focus={{
          outline: "none",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
      />
      <Input
        name="password"
        placeholder="password"
        type="password"
        mb={2}
        onChange={onChange}
        _placeholder={{ color: "gray.300" }}
        _hover={{ bg: "white", borderColor: "blue.500" }}
        _focus={{
          outline: "none",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
      />
      <Input
        name="confirmPassword"
        placeholder="confirm password"
        type="password"
        mb={2}
        onChange={onChange}
        _placeholder={{ color: "gray.300" }}
        _hover={{ bg: "white", borderColor: "blue.500" }}
        _focus={{
          outline: "none",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
      />

      <Button h="36px" width="100%" my={2} type="submit">
        Register
      </Button>

      <Flex fontSize="9pt" justify="center">
        <Text mr={1}>Got an account already?</Text>
        <Text
          color="blue.500"
          fontWeight={700}
          cursor="pointer"
          onClick={() =>
            setAuthModalState((prev) => ({ ...prev, view: "login" }))
          }
        >
          Login
        </Text>
      </Flex>
    </form>
  );
};
export default Register;
