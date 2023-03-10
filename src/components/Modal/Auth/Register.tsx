import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { auth, firestore } from "@/firebase/app";
import { FIREBASE_ERRORS } from "@/firebase/errors";
import { authModalState } from "@/recoil/atoms/authModalAtom";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import { User } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

type RegisterProps = {};

const Register: React.FC<RegisterProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const [createUserWithEmailAndPassword, userCred, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (error) setError("");
    if (registerForm.password !== registerForm.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    createUserWithEmailAndPassword(registerForm.email, registerForm.password);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRegisterForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const createUserDocument = async (user: User) => {
    // await addDoc(
    //   collection(firestore, "users"),
    //   JSON.parse(JSON.stringify(user))
    // );

    await setDoc(
      doc(collection(firestore, "users"), `${userCred?.user.uid}`),
      JSON.parse(JSON.stringify(user))
    );
  };

  useEffect(() => {
    if (userCred) {
      createUserDocument(userCred.user);
    }
  }, [userCred]);

  return (
    <form onSubmit={onSubmit}>
      <Input
        required
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
        required
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
        required
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

      {(!!error || userError) && (
        <Text textAlign="center" color="red" fontSize="10pt">
          {error ||
            FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
        </Text>
      )}

      <Button h="36px" width="100%" my={2} type="submit" isLoading={loading}>
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
