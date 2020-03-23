import React from "react";
import Taro from "@tarojs/taro"
import { ClMenuList } from "../../../index";

export default function MenuNavigate(props) {
  return (
    <ClMenuList
      card
      shortBorder
      onClick={index => {
        Taro.navigateTo({
          url: `/package/${props.name}Package/${props.list[index].key}/index`
        });
      }}
      list={props.list.map(item => ({
        title: item.name,
        arrow: true
      }))}
    />
  );
}

MenuNavigate.defaultProps = {
  list: []
};
