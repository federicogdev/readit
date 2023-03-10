import { Post } from "@/recoil/atoms/postsAtom";
import { Flex, Icon, Image, Skeleton, Stack, Text } from "@chakra-ui/react";
import moment from "moment";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat, BsDot } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";

type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: () => {};
  onDeletePost: () => {};
  onSelectPost: () => void;
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  userVoteValue,
  onVote,
  onDeletePost,
  onSelectPost,
}) => {
  const [imageIsLoading, setImageIsLoading] = useState(true);
  return (
    <Flex
      border="1px solid"
      bg="white"
      borderColor="gray.200"
      cursor="pointer"
      borderRadius={4}
      _hover={{ borderColor: "gray.300" }}
      onClick={onSelectPost}
    >
      <Flex
        direction="column"
        align="center"
        p={2}
        w="40px"
        backgroundColor="gray.100"
      >
        <Icon
          as={
            userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          color={userVoteValue === 1 ? "brand.100" : "gray.400"}
          fontSize={22}
          cursor="pointer"
          onClick={onVote}
        />
        <Text color="gray.400">{post.voteStatus}</Text>
        <Icon
          as={
            userVoteValue === -1
              ? IoArrowDownCircleSharp
              : IoArrowDownCircleOutline
          }
          color={userVoteValue === -1 ? "blue.300" : "gray.400"}
          fontSize={22}
          cursor="pointer"
          onClick={onVote}
        />
      </Flex>
      <Flex direction="column" w="100%">
        <Stack spacing={1} p="10px">
          <Stack direction="row" spacing={0.6} align="center" fontSize="9pt">
            <Text color="gray.500">
              Posted by u/{post.creatorDisplayName}{" "}
              {moment(new Date(post.createdAt.seconds * 1000)).fromNow()}
            </Text>
          </Stack>
          <Text fontSize="12pt" fontWeight={600}>
            {post.title}
          </Text>
          <Text fontSize="10pt" color="gray.500">
            {post.body}
          </Text>

          {!!post.imageURL && (
            <Flex justify="center" align="center" p={2}>
              {imageIsLoading && (
                <Skeleton h="200px" w="100%" borderRadius={4} />
              )}
              <Image
                src={post.imageURL}
                maxHeight="460px"
                onLoad={() => setImageIsLoading(false)}
                display={imageIsLoading ? "none" : "unset"}
              />
            </Flex>
          )}
        </Stack>

        <Flex ml={1} mb={0.5} color="gray.500">
          <Flex
            align="center"
            p="8px"
            borderRadius={4}
            _hover={{ bg: "gray.300" }}
            cursor="pointer"
          >
            <Icon as={BsChat} mr={2} />
            <Text fontSize="9pt">{post.numberOfComments}</Text>
          </Flex>

          <Flex
            align="center"
            p="8px"
            borderRadius={4}
            _hover={{ bg: "gray.300" }}
            cursor="pointer"
          >
            <Icon as={IoArrowRedoOutline} mr={2} />
            <Text fontSize="9pt">Share</Text>
          </Flex>

          <Flex
            align="center"
            p="8px"
            borderRadius={4}
            _hover={{ bg: "gray.300" }}
            cursor="pointer"
          >
            <Icon as={IoBookmarkOutline} mr={2} />
            <Text fontSize="9pt">Save</Text>
          </Flex>

          {userIsCreator && (
            <Flex
              align="center"
              p="8px"
              borderRadius={4}
              _hover={{ bg: "gray.300" }}
              cursor="pointer"
              onClick={onDeletePost}
            >
              <Icon as={AiOutlineDelete} mr={2} />
              <Text fontSize="9pt">Delete</Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PostItem;
