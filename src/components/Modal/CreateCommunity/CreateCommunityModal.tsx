import { auth, firestore } from "@/firebase/app";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import React, { ChangeEvent, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsFillEyeFill, BsFillPersonFill, BsLockFill } from "react-icons/bs";

type CreateCommunityModalProps = { open: boolean; handleClose: () => void };

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  open,
  handleClose,
}) => {
  const [user] = useAuthState(auth);

  const [communityName, setCommunityName] = useState("");
  const [charactersRemaining, setCharactersRemaining] = useState(21);
  const [communityType, setCommunityType] = useState("public");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;
    setCommunityName(event.target.value);

    setCharactersRemaining(21 - event.target.value.length);
  };

  const onCommunityTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCommunityType(event.target.name);
  };

  const handleCreateCommunity = async () => {
    if (error) {
      setError("");
    }

    const validateCommunityNameRegEx =
      /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

    if (
      validateCommunityNameRegEx.test(communityName) ||
      communityName.length < 3
    ) {
      setError(
        "Community names must be between 3 and 21 characters and must only contain letters and numbers."
      );
      return;
    }

    setLoading(true);

    try {
      const communityDocRef = doc(firestore, "communities", communityName);

      await runTransaction(firestore, async (transaction) => {
        const communityDoc = await transaction.get(communityDocRef);

        if (communityDoc.exists()) {
          throw new Error(`Sorry r/${communityName} already exists.`);
        }

        transaction.set(communityDocRef, {
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: communityType,
        });

        transaction.set(
          doc(firestore, `users/${user?.uid}/communitySnippets`, communityName),
          {
            communityId: communityName,
            isModerator: true,
          }
        );
      });
    } catch (error: any) {
      setError(error.message);
    }

    setLoading(false);
  };
  return (
    <>
      <Modal isOpen={open} onClose={handleClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="flex" flexDirection="column" padding={3}>
            Create a community
          </ModalHeader>
          <Box px={3}>
            <Divider />
            <ModalCloseButton />
            <ModalBody display="flex" flexDirection="column" padding="10px 0px">
              <Text fontWeight={600} fontSize={15}>
                Name
              </Text>
              <Text color="gray.500" fontSize={11}>
                Community names including capitalization cannot be changed
              </Text>

              <Text
                position="relative"
                top="28px"
                left="10px"
                width="20px"
                color="gray.400"
              >
                r/
              </Text>
              <Input
                position="relative"
                value={communityName}
                size="sm"
                pl="22px"
                onChange={onChange}
              />

              <Text
                color={charactersRemaining === 0 ? "red" : "gray.500"}
                fontSize="9pt"
                mt={1}
              >
                {charactersRemaining} characters remaining
              </Text>

              <Text color="red" fontSize="9pt" mt={1}>
                {error}
              </Text>

              <Box my={4}>
                <Text fontWeight={600} fontSize={15} mb={2}>
                  Community Type
                </Text>

                <Stack spacing={2}>
                  <Checkbox
                    name="public"
                    isChecked={communityType === "public"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align="center">
                      <Icon as={BsFillPersonFill} color="gray.500" mr={2} />
                      <Text fontSize="10pt" mr={1}>
                        Public
                      </Text>
                      <Text fontSize="10pt" color="gray.400">
                        Anyone can view, post and comment
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="restricted"
                    isChecked={communityType === "restricted"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align="center">
                      <Icon as={BsFillEyeFill} color="gray.500" mr={2} />

                      <Text fontSize="10pt" mr={1}>
                        Restricted
                      </Text>
                      <Text fontSize="10pt" color="gray.400">
                        Anyone can view, approved users can post
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="private"
                    isChecked={communityType === "private"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align="center">
                      <Icon as={BsLockFill} color="gray.500" mr={2} />

                      <Text fontSize="10pt" mr={1}>
                        Private
                      </Text>
                      <Text fontSize="10pt" color="gray.400">
                        Approved users only
                      </Text>
                    </Flex>
                  </Checkbox>
                </Stack>
              </Box>
            </ModalBody>
          </Box>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleClose}
              variant="outline"
              height="30px"
            >
              Close
            </Button>
            <Button
              height="30px"
              onClick={handleCreateCommunity}
              isLoading={loading}
            >
              Create Community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreateCommunityModal;
