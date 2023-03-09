import { Button, Flex, Image, Stack } from "@chakra-ui/react";
import React, { ChangeEvent, useRef } from "react";

type ImageUploadProps = {
  selectedFile?: string;
  onSelectImage: (event: ChangeEvent<HTMLInputElement>) => void;
  setSelectedTab: (value: string) => void;
  setSelectedFile: (value: string) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  onSelectImage,
  setSelectedFile,
  setSelectedTab,
  selectedFile,
}) => {
  const selectedFileRef = useRef<HTMLInputElement>(null);
  return (
    <Flex justify="center" align="center" w="100%" direction="column">
      {selectedFile ? (
        <>
          <Image src={selectedFile} maxW="400px" maxH="400px" />
          <Stack direction="row" mt={4}>
            <Button h="30px" onClick={() => setSelectedTab("Post")}>
              Back to Post
            </Button>
            <Button
              h="30px"
              variant="outline"
              onClick={() => setSelectedFile("")}
            >
              Remove
            </Button>
          </Stack>
        </>
      ) : (
        <Flex
          justify="center"
          align="center"
          p={20}
          border="2px dashed"
          borderColor="gray.200"
          w="100%"
          borderRadius={4}
        >
          <Button
            h="30px"
            variant="outline"
            onClick={() => selectedFileRef.current?.click()}
          >
            Add
          </Button>
          <input
            type="file"
            ref={selectedFileRef}
            hidden
            onChange={onSelectImage}
          />
        </Flex>
      )}
    </Flex>
  );
};
export default ImageUpload;
