import { authModalState } from "@/recoil/atoms/authModalAtom";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/app";
import { FIREBASE_ERRORS } from "../../../firebase/errors";
type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [signInWithEmailAndPassword, _, loading, userError] =
    useSignInWithEmailAndPassword(auth);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (error) setError("");
    if (!loginForm.email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    // Valid form inputs
    signInWithEmailAndPassword(loginForm.email, loginForm.password);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
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

      {(!!error || userError) && (
        <Text textAlign="center" color="red" fontSize="10pt">
          {error ||
            FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
        </Text>
      )}

      <Button h="36px" width="100%" my={2} type="submit">
        Login
      </Button>
      <Flex fontSize="9pt" justify="center" mb={2}>
        <Text mr={1}>Forgot your password?</Text>
        <Text
          color="blue.500"
          fontWeight={700}
          cursor="pointer"
          onClick={() => {}}
        >
          Reset
        </Text>
      </Flex>
      <Flex fontSize="9pt" justify="center" mb={2}>
        <Text mr={1}>New around here?</Text>
        <Text
          color="blue.500"
          fontWeight={700}
          cursor="pointer"
          onClick={() =>
            setAuthModalState((prev) => ({ ...prev, view: "register" }))
          }
        >
          Register
        </Text>
      </Flex>
    </form>
  );
};
export default Login;
