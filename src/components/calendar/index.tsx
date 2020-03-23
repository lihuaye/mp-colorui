// @ts-ignore
import React, { FunctionComponent } from "react";
import Taro from "@tarojs/taro";
import { IProps } from "../../../@types/calendar";

import Calendar from "./calendar";

const ClCalendar: FunctionComponent<IProps> = (props) => {
  return (
    <Calendar {...props} />
  );
}

ClCalendar.defaultProps = {
  calendarType: "month",
  showType: "card",
  activeColor: "blue",
  tipDay: [],
  backToToday: true,
  onClick: () => {
  },
  onChange: () => {
  },
  badge: [],
  highlightWeekend: false,
  highlightWeekendColor: "blue",
  specialDay: []
} as IProps;

export default ClCalendar
