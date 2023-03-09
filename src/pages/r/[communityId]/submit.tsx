import PageContent from "@/components/Layout/PageContent";
import { Box, Text } from "@chakra-ui/react";
import React from "react";
import PostForm from "../../../components/Posts/PostForm";

type SubmitPostPageProps = {};

const SubmitPostPage: React.FC<SubmitPostPageProps> = () => {
  return (
    <PageContent>
      <>
        <Box p="14px 0px">
          <Text>Create a post</Text>
        </Box>
        <PostForm />
      </>
      <>XD</>
    </PageContent>
  );
};
export default SubmitPostPage;
