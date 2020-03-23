// @ts-ignore
import React, { FunctionComponent } from "react";
import { Switch, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { classNames } from "@/lib";
import { IProps } from "../../../@types/switch";
import ClSwitch_h5 from "./h5";

const ClSwitch: FunctionComponent<IProps> = (props) => {
  const title = props.title;
  const color = props.color || "green";
  const shapeClassName = props.shape !== "radius" ? "" : "radius";
  const type = props.type === "form" ? "form" : "normal";
  const checked = !!props.checked;
  const hasChecked = checked ? "checked" : "";
  const onChange = e => {
    props.onChange && props.onChange(e.detail.value);
  };
  const switchComponent = (
    <Switch
      className={classNames(
        `${color} ${hasChecked} ${shapeClassName} sm`,
        props.className
      )}
      style={Object.assign({}, props.style)}
      checked={checked}
      onChange={onChange}
      disabled={props.disabled}
    />
  );
  const formSwitchComponent = (
    <View
      className={classNames("cu-form-group", props.className)}
      style={Object.assign({}, props.style)}
    >
      <View className="title">{title}</View>
      {switchComponent}
    </View>
  );
  return Taro.getEnv() === Taro.ENV_TYPE.WEB ? (
    <ClSwitch_h5 {...props} />
  ) : type === "form" ? (
    formSwitchComponent
  ) : (
    switchComponent
  );
}

export default ClSwitch
