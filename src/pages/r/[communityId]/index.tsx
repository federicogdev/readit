import CommunityNotFound from "@/components/Community/CommunityNotFound";
import Header from "@/components/Community/Header";
import PageContent from "@/components/Layout/PageContent";
import { firestore } from "@/firebase/app";
import { Community } from "@/recoil/atoms/communitiesAtom";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React from "react";
import safeJsonStringify from "safe-json-stringify";

type CommunityPageProps = {
  communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
  if (!communityData) return <CommunityNotFound />;

  return (
    <>
      <Header communityData={communityData} />
      <PageContent>
        <>1</>
        <>2</>
      </PageContent>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      context.query.communityId as string
    );

    const communityDoc = await getDoc(communityDocRef);

    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
            )
          : "",
      },
    };
  } catch (error) {
    console.log("getServerSideProps", error);
  }
}

export default CommunityPage;
