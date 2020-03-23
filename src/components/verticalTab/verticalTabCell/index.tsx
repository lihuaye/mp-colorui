// @ts-ignore
import React, { FunctionComponent } from "react";
import Taro from '@tarojs/taro'
import ClCard from "../../card";

import { IProps } from '../../../../@types/verticalTabCell'

const ClVerticalTabCell: FunctionComponent<IProps> = (props) => {
  return (
    <ClCard>
      {props.children}
    </ClCard>
  )
}

export default ClVerticalTabCell
