import PageContent from "@/components/Layout/PageContent";
import { auth } from "@/firebase/app";
import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import PostForm from "../../../components/Posts/PostForm";

type SubmitPostPageProps = {};

const SubmitPostPage: React.FC<SubmitPostPageProps> = () => {
  const [user] = useAuthState(auth);
  return (
    <PageContent>
      <>
        <Box p="14px 0px">
          <Text>Create a post</Text>
        </Box>
        {user && <PostForm user={user} />}
      </>
      <>XD</>
    </PageContent>
  );
};
export default SubmitPostPage;
