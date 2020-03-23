// @ts-ignore
import React, { FunctionComponent } from "react";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { classNames } from "@/lib";
import { IProps } from "../../../@types/grid";

const ClGrid: FunctionComponent<IProps> = (props: IProps) => {
  const colClassName = `col-${props.col}`;
  const squareClassName = props.mode === "square" ? "grid-square" : "";
  return (
    <View
      className={classNames(
        `grid ${colClassName} ${squareClassName}`,
        props.className
      )}
      style={Object.assign({}, props.style)}
    >
      {props.children}
    </View>
  );
}

ClGrid.defaultProps = {
  col: 3,
  mode: "normal"
};

export default ClGrid
