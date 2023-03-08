import { Button, Image } from "@chakra-ui/react";
import React from "react";

type OAuthButtonsProps = {};

const OAuthButtons: React.FC<OAuthButtonsProps> = () => {
  return (
    <Button w="full" variant="oauth" mb={4}>
      <Image src="/images/googlelogo.png" height="20px" mr={2} />
      Continue with Google
    </Button>
  );
};
export default OAuthButtons;
