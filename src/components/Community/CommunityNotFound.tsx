import { Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

type CommunityNotFoundProps = {};

const CommunityNotFound: React.FC<CommunityNotFoundProps> = () => {
  return (
    <Flex direction="column" minHeight="90vh" align="center" justify="center">
      Sorry, there aren’t any communities on Readit with that name.{" "}
      <Text fontSize="10pt" mt={4}>
        This community may have been banned or the community name is incorrect.
      </Text>
      <Link href="/">
        <Button mt={4} height="30px">
          Go Home
        </Button>
      </Link>
    </Flex>
  );
};
export default CommunityNotFound;
