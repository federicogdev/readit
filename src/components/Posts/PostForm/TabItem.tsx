import { Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";

export interface ITabItem {
  title: string;
  icon: typeof Icon.arguments;
}

type TabItemProps = {
  tabItem: ITabItem;
  selected: boolean;
  setSelected: (value: string) => void;
};

const TabItem: React.FC<TabItemProps> = ({
  tabItem,
  selected,
  setSelected,
}) => {
  return (
    <Flex
      justify="center"
      align="center"
      flexGrow={1}
      cursor="pointer"
      p="14px 0px"
      _hover={{ bg: "gray.50" }}
      fontWeight={selected ? 700 : 500}
      color={selected ? "blue.500" : "gray.500"}
      borderBottomColor={selected ? "blue.500" : "gray.200"}
      borderRightColor="gray.200"
      borderWidth={selected ? "0px 1px 2px 0px" : "0px 1px 1px 0px"}
      onClick={() => setSelected(tabItem.title)}
    >
      <Flex align="center" h="20px" mr={2}>
        <Icon as={tabItem.icon} />
      </Flex>
      <Text fontSize="10pt">{tabItem.title}</Text>
    </Flex>
  );
};
export default TabItem;
