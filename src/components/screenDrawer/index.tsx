// @ts-ignore
import React, { FunctionComponent } from "react";
import Taro from "@tarojs/taro";
import { View, Text, ScrollView } from "@tarojs/components";
import { classNames } from "@/lib";
import { IProps } from "../../../@types/screenDrawer";

const ClScreenDrawer: FunctionComponent<IProps> = (props) => {
  const hideModal = () => {
    props.onHide && props.onHide();
  };
  return (
    <View
      className={classNames(props.className)}
      style={Object.assign({}, props.style)}
    >
      <ScrollView scrollY className={`DrawerPage ${props.show ? "show" : ""}`}>
        {props.renderPage}
      </ScrollView>
      <View
        className={`DrawerClose ${props.show ? "show" : ""}`}
        onClick={hideModal}
      >
        <Text className="cuIcon-pullright" />
      </View>
      <ScrollView
        scrollY
        className={`DrawerWindow ${props.show ? "show" : ""}`}
      >
        {props.renderDrawer}
      </ScrollView>
    </View>
  );
}

export default ClScreenDrawer
