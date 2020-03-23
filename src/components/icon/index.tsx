// @ts-ignore
import React, { FunctionComponent } from "react";
import { Text } from "@tarojs/components";
import Taro, { pxTransform } from "@tarojs/taro";
import { classNames, isNumber } from "../../lib";
import { pxMap } from "@/lib/model";
import { IProps } from "../../../@types/icon";

const ClIcon: FunctionComponent<IProps> = (props) => {
  const iconName = props.iconName || "";
  let iconNameClass = `cuIcon-${props.iconName}`;
  if (props.other) {
    iconNameClass = iconName;
  }
  const sizeClassName = props.size || "normal";
  const bgColorClassName = props.color ? `text-${props.color}` : "";
  return (
    <Text
      className={classNames(
        `${bgColorClassName} ${iconNameClass}`,
        props.className
      )}
      style={Object.assign(
        {
          fontSize: `${
            isNumber(sizeClassName)
              ? pxTransform(sizeClassName as number)
              : pxTransform(pxMap[sizeClassName])
          }`
        },
        props.style
      )}
    />
  );
}

export default ClIcon
