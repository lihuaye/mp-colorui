// @ts-ignore
import React, { FunctionComponent } from "react";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { IProps } from "../../../@types/flex";
import { classNames } from "@/lib";

/**
 * flex 问题
 * 浮动比例
 * flex-sub==>1, flex-twice==>2, flex-treble==>3
 */
const ClFlex: FunctionComponent<IProps> = (props) => {
  const warpClassName = props.wrap ? "flex-wrap" : "";
  const justifyClassName = props.justify ? `justify-${props.justify}` : "";
  const alignClassName = props.align ? `align-${props.align}` : "";
  const directionClassName = props.direction
    ? `flex-direction-${props.direction}`
    : "";
  return (
    <View
      className={classNames(
        `flex ${warpClassName} ${justifyClassName} ${alignClassName} ${directionClassName}`,
        props.className
      )}
      style={Object.assign({}, props.style)}
    >
      {props.children}
    </View>
  );
}

ClFlex.defaultProps = {
  justify: "start",
  align: "start",
  direction: "row",
  wrap: false
} as IProps;

export default ClFlex
