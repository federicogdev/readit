import { Button, Flex, Input, Stack, Textarea } from "@chakra-ui/react";
import React, { ChangeEvent } from "react";

type TextInputsProps = {
  textInputs: {
    title: string;
    body: string;
  };
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCreatePost: () => {};
  loading: boolean;
};

const TextInputs: React.FC<TextInputsProps> = ({
  textInputs,
  onChange,
  handleCreatePost,
  loading,
}) => {
  return (
    <Stack width="100%" spacing={2}>
      <Input
        name="title"
        value={textInputs.title}
        onChange={onChange}
        fontSize="10pt"
        borderRadius={4}
        placeholder="Title"
        _placeholder={{ color: "gray.500" }}
        _focus={{ outline: "none", bg: "white" }}
      />
      <Textarea
        name="body"
        fontSize="10pt"
        borderRadius={4}
        value={textInputs.body}
        onChange={onChange}
        placeholder="Text (optional)"
        _placeholder={{ color: "gray.500" }}
        _focus={{ outline: "none", bg: "white" }}
      />
      <Flex justify="flex-end">
        <Button
          h="30px"
          p="0px 30px"
          isLoading={loading}
          isDisabled={!textInputs.title}
          onClick={handleCreatePost}
        >
          Post
        </Button>
      </Flex>
    </Stack>
  );
};
export default TextInputs;
