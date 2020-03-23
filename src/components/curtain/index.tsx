// @ts-ignore
import React, { FunctionComponent, useMemo, useState } from "react";
import { View, Block } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { IProps } from "../../../@types/curtain";
import ClIcon from "../icon";

import "./index.scss";
import { classNames } from "@/lib";

const ClCurtain: FunctionComponent<IProps> = (props) => {
  const { show, closeWithShadow, closeBtnPosition } = props;
  const [showImage, setShowImage] = useState(show);
  useMemo(() => {
    setShowImage(show);
  }, [show]);
  return showImage ? (
    <View
      className={classNames("cu-load load-image", props.className)}
      style={Object.assign({}, props.style)}
      onClick={e => {
        e.stopPropagation();
        if (closeWithShadow) {
          setShowImage(false);
          props.onClose && props.onClose();
        }
      }}
    >
      <View
        className="cu-curtain__content"
        onClick={() => {
          props.onClick && props.onClick();
        }}
      >
        {props.children}
        <View
          className={closeBtnPosition}
          onClick={e => {
            e.stopPropagation();
            setShowImage(false);
            props.onClose && props.onClose();
          }}
        >
          <ClIcon iconName="close" color="white" />
        </View>
      </View>
    </View>
  ) : (
    <Block />
  );
}

ClCurtain.defaultProps = {
  show: false,
  closeWithShadow: false,
  closeBtnPosition: "bottom",
  onClose: () => {
  },
  onClick: () => {
  },
  imgUrl: ""
} as IProps;

export default ClCurtain
