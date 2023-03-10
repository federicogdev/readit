import { firestore, storage } from "@/firebase/app";
import { Post, postState } from "@/recoil/atoms/postsAtom";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
  Text,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useRouter } from "next/router";
import React, { ChangeEvent, useState } from "react";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { useSetRecoilState } from "recoil";
import ImageUpload from "./ImageUpload";
import TabItem from "./TabItem";
import TextInputs from "./TextInputs";

type PostFormProps = {
  user: User;
};

const formTabs = [
  {
    title: "Post",
    icon: IoDocumentText,
  },
  {
    title: "Images & Video",
    icon: IoImageOutline,
  },
];

const PostForm: React.FC<PostFormProps> = ({ user }) => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });
  const [selectedFile, setSelectedFile] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleCreatePost = async () => {
    const { communityId } = router.query;
    const newPost: Post = {
      communityId: communityId as string,
      title: textInputs.title,
      body: textInputs.body,
      creatorId: user?.uid,
      creatorDisplayName: user.email!.split("@")[0],
      numberOfComments: 0,
      createdAt: serverTimestamp() as Timestamp,
      voteStatus: 0,
    };
    setLoading(true);
    try {
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);

      if (selectedFile) {
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);

        await uploadString(imageRef, selectedFile, `data_url`);

        const downloadUrl = await getDownloadURL(imageRef);

        await updateDoc(postDocRef, { imageURL: downloadUrl });
      }

      router.back();
    } catch (error: any) {
      setError(true);
      console.log("createPost error", error);
    }
    setLoading(false);
  };

  const onSelectImage = (event: ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();

    if (event.target.files?.[0]) {
      fileReader.readAsDataURL(event.target.files[0]);
    }

    fileReader.onload = (event) => {
      if (event.target?.result) {
        setSelectedFile(event.target.result as string);
      }
    };
  };

  const onTextChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = event;

    setTextInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Flex direction="column" bg="white" borderRadius={4} mt={2}>
      <Flex width="100%">
        {formTabs.map((item) => (
          <TabItem
            key={item.title}
            tabItem={item}
            selected={item.title === selectedTab}
            selectedTab={setSelectedTab}
          />
        ))}
      </Flex>
      <Flex width="100%" p={4}>
        {selectedTab === "Post" && (
          <TextInputs
            textInputs={textInputs}
            onChange={onTextChange}
            loading={loading}
            handleCreatePost={handleCreatePost}
          />
        )}
        {selectedTab === "Images & Video" && (
          <ImageUpload
            onSelectImage={onSelectImage}
            selectedFile={selectedFile}
            setSelectedTab={setSelectedTab}
            setSelectedFile={setSelectedFile}
          />
        )}
      </Flex>

      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Error creating post</AlertTitle>
        </Alert>
      )}
    </Flex>
  );
};
export default PostForm;
