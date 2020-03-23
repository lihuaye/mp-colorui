// @ts-ignore
import React, { FunctionComponent, useMemo, useState } from "react";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { classNames } from "@/lib";
import { IProps } from "../../../@types/drawer";

const ClDrawer: FunctionComponent<IProps> = (props) => {
  const [showModal, setShowModal] = useState(props.show);

  useMemo(() => {
    setShowModal(props.show);
  }, [props.show]);

  const hideModal = () => {
    props.closeWithShadow && setShowModal(false);
    props.onCancel && props.onCancel();
  };

  const leftComponent = (
    <View
      className={classNames(
        `cu-modal drawer-modal justify-start ${showModal ? "show" : ""}`,
        props.className
      )}
      style={Object.assign({}, props.style)}
      onClick={e => {
        hideModal();
        e.stopPropagation();
      }}
    >
      <View
        className="cu-dialog basis-lg"
        onClick={e => {
          e.stopPropagation();
        }}
        style={{ height: "100vh" }}
      >
        {props.children}
      </View>
    </View>
  );
  const rightComponent = (
    <View
      className={classNames(
        `cu-modal drawer-modal justify-end ${showModal ? "show" : ""}`,
        props.className
      )}
      style={Object.assign({}, props.style)}
      onClick={e => {
        hideModal();
        e.stopPropagation();
      }}
    >
      <View
        className="cu-dialog basis-lg"
        onClick={e => {
          e.stopPropagation();
        }}
        style={{ height: "100vh" }}
      >
        {props.children}
      </View>
    </View>
  );
  const bottomComponent = (
    <View
      className={classNames(
        `cu-modal bottom-modal ${showModal ? "show" : ""}`,
        props.className
      )}
      style={Object.assign({}, props.style)}
      onClick={e => {
        hideModal();
        e.stopPropagation();
      }}
    >
      <View
        className="cu-dialog"
        style={{ maxHeight: "70vh" }}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        {props.children}
      </View>
    </View>
  );
  return props.direction === "left"
    ? leftComponent
    : props.direction === "right"
      ? rightComponent
      : bottomComponent;
}

export default ClDrawer
