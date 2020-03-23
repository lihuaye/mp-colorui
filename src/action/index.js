import React from "react";
import { View } from "@tarojs/components";
import { ClLayout, ClTitleBar } from "../index.js";
import MenuNavigate from "../pages/components/menuNavigate";
import { actionList } from "../constant/menu";

const Action = () => {
  return (
    <View>
      <ClTitleBar
        title="操作反馈"
        type="border-title"
        textColor="black"
        borderColor="blue"
      />
      <ClLayout padding="normal" paddingDirection="vertical">
        <MenuNavigate list={actionList} />
      </ClLayout>
    </View>
  );
}

Action.config = {
  navigationBarTitleText: "操作反馈"
};

export default Action
