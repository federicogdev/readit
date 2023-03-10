import { Community } from "@/recoil/atoms/communitiesAtom";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import useCommunityData from "@/hooks/useCommunityData";
type HeaderProps = {
  communityData: Community;
};

const Header: React.FC<HeaderProps> = ({ communityData }) => {
  const { communityStateValue, onJoinOrLeaveCommunity, loading } =
    useCommunityData();
  const isJoined = !!communityStateValue.mySnippets.find(
    (snippet) => snippet.communityId === communityData.id
  );
  return (
    <Flex direction="column" h="150px" w="100%">
      <Box height="50%" bg="blue.500" />
      <Flex flexGrow={1} justify="center" bg="white">
        <Flex w="95%" maxW="860px">
          {communityData.imageURL ? (
            <Image
              src="/images/logo.png"
              w={"60pt"}
              pos="relative"
              top={-3}
              p={0}
              border="4px solid white"
              borderRadius={"50%"}
            />
          ) : (
            <Image
              src="/images/logo.png"
              w={"60pt"}
              pos="relative"
              top={-3}
              p={0}
              border="4px solid white"
              borderRadius={"50%"}
            />
          )}
          <Flex
            p="10px 16px"
            justify="space-between"
            align="center"
            flexGrow={1}
          >
            <Flex direction="column" mr={6}>
              <Text fontWeight={600} fontSize="15pt">
                {communityData.id}
              </Text>
              <Text fontSize="10pt" color="gray.500">
                r/{communityData.id}
              </Text>
            </Flex>
            <Button
              variant={isJoined ? "outline" : "solid"}
              height="30px"
              px={6}
              isLoading={loading}
              onClick={() => onJoinOrLeaveCommunity(communityData, isJoined)}
            >
              {isJoined ? "Joined" : "Join"}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Header;
