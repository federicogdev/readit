import { auth, firestore } from "@/firebase/app";
import usePosts from "@/hooks/usePosts";
import { Community } from "@/recoil/atoms/communitiesAtom";
import { Post } from "@/recoil/atoms/postsAtom";
import { Stack, Text } from "@chakra-ui/react";

import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import { useAuthState } from "react-firebase-hooks/auth";
import PostSkeleton from "./PostSkeleton";

type PostsProps = {
  communityData: Community;
};

const Posts: React.FC<PostsProps> = ({ communityData }) => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);

  const {
    postStateValue,
    setPostStateValue,
    onSelectPost,
    onDeletePost,
    onVote,
  } = usePosts();

  const getPosts = async () => {
    setLoading(true);

    try {
      const postsQuery = query(
        collection(firestore, "posts"),
        where("communityId", "==", communityData.id),
        orderBy("createdAt", "desc")
      );

      const postDocs = await getDocs(postsQuery);

      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log("post", posts);

      setPostStateValue((prev) => ({ ...prev, posts: posts as Post[] }));
    } catch (error: any) {
      console.log("getPosts err", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {loading ? (
        <PostSkeleton />
      ) : (
        <Stack>
          {postStateValue.posts.map((post) => (
            <PostItem
              post={post}
              userIsCreator={user?.uid === post.creatorId}
              userVoteValue={0}
              key={post.id}
              onSelectPost={onSelectPost}
              onDeletePost={onDeletePost}
              onVote={onVote}
            />
          ))}
        </Stack>
      )}
    </>
  );
};
export default Posts;
