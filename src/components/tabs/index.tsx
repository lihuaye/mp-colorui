import React from "react";
import { ScrollView, Text, View, Block } from "@tarojs/components";
import Taro, { pxTransform } from "@tarojs/taro";
import { BG_COLOR_LIST, TEXT_COLOR_LIST } from "@/lib/model";
import { IProps } from "../../../@types/tabs";

import "./index.scss";
import { classNames, getRectNumber, isAliPay, screenPercent } from "../../lib";

interface IState {
  activeTab: number;
  scrollLeft: number;
  contentScrollLeft: number;
}

let move = 0;
let scrollLeftContent = 0;
let duration = 0.3;
let distance = 0;
export default class ClTabs extends React.Component<IProps, IState> {

  static defaultProps: IProps = {
    type: "default",
    bgColor: undefined,
    activeColor: "black",
    active: 0,
    tabs: [],
    touchMove: false
  };
  state: IState = {
    activeTab: 0,
    scrollLeft: 0,
    contentScrollLeft: 0
  };

  componentDidMount(): void {
    setTimeout(() => {
      this.onClickTab(this.props.active || 0);
    }, 100)
  }

  componentWillReceiveProps(
    nextProps: Readonly<IProps>
  ): void {
    const nextActive = nextProps.active;
    const thisActive = this.props.active;
    if (nextActive !== thisActive) {
      this.onClickTab(nextActive || 0);
    }
  }

  onClickTab(index: number) {
    const id = this.props.tabs[index].id;
    const id0 = this.props.tabs[0].id;
    const query = Taro.createSelectorQuery();
    const view = query.select(`#${id}`);
    const view0 = query.select(`#${id0}`);
    let left = 0;
    const promise = new Promise(resolve => {
      new Promise(resolve1 => {
        view0.boundingClientRect().exec(res => {
          const data = res[0];
          left = data.left;
          resolve1();
        });
      }).then(() => {
        view.boundingClientRect().exec(res => {
          const data = res[getRectNumber()];
          if (isAliPay) {
            left = data.width * index;
          } else {
            left = Math.abs(left - data.left);
          }
          resolve(left);
        });
      });
    });
    promise.then(() => {
      this.setState({
        activeTab: index,
        scrollLeft: (index - 1) * 60,
        contentScrollLeft: left + Math.random() / 10
      });
    });
    this.props.onClick && this.props.onClick(index);
  }

  renderDefaultComponent(paramters: {
    bgColorClassName: string;
    activeColor: string;
    tabs: any[];
    activeTab: number;
    scrollLeft: number;
  }) {
    const {
      bgColorClassName,
      activeColor,
      tabs,
      activeTab,
      scrollLeft
    } = paramters;
    return (
      <ScrollView
        scrollX
        className={`${bgColorClassName} nav`}
        scrollWithAnimation
        scrollLeft={scrollLeft}
      >
        {tabs.map((item, index) => (
          <View
            key={index}
            className={`cu-item ${
              activeTab === index ? `${activeColor} cur` : ""
            }`}
            onClick={this.onClickTab.bind(this, index)}
          >
            {item.icon ? (
              <Text className={`cuIcon-${item.icon} margin-right-xs`} />
            ) : (
              ""
            )}
            <Text>{item.text}</Text>
          </View>
        ))}
      </ScrollView>
    );
  }

  renderVerbComponent(paramters: {
    bgColorClassName: string;
    activeColor: string;
    tabs: any[];
    activeTab: number;
  }) {
    const { bgColorClassName, activeColor, tabs, activeTab } = paramters;
    return (
      <ScrollView scrollX className={`${bgColorClassName} nav`}>
        <View className="flex text-center">
          {tabs.map((item, index) => (
            <View
              key={index}
              className={`cu-item flex-sub ${
                activeTab === index ? `${activeColor} cur` : ""
              }`}
              onClick={this.onClickTab.bind(this, index)}
            >
              {item.icon ? (
                <Text className={`cuIcon-${item.icon} margin-right-xs`} />
              ) : (
                ""
              )}
              <Text>{item.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }

  renderCenterComponent(paramters: {
    bgColorClassName: string;
    activeColor: string;
    tabs: any[];
    activeTab: number;
  }) {
    const { bgColorClassName, activeColor, tabs, activeTab } = paramters;
    return (
      <ScrollView scrollX className={`${bgColorClassName} nav text-center`}>
        {tabs.map((item, index) => (
          <View
            key={index}
            className={`cu-item ${
              activeTab === index ? `${activeColor} cur` : ""
            }`}
            onClick={this.onClickTab.bind(this, index)}
          >
            {item.icon ? (
              <Text className={`cuIcon-${item.icon} margin-right-xs`} />
            ) : (
              ""
            )}
            <Text>{item.text}</Text>
          </View>
        ))}
      </ScrollView>
    );
  }

  render(): any {
    const { contentScrollLeft } = this.state;
    const bgColorClassName: string = this.props.bgColor
      ? BG_COLOR_LIST[this.props.bgColor]
      : "";
    const activeColor: string = this.props.activeColor
      ? TEXT_COLOR_LIST[this.props.activeColor]
      : "";
    const renderComponent = () => {
      const { type, tabs } = this.props;
      const { activeTab, scrollLeft } = this.state;
      const defaultParameter = {
        bgColorClassName,
        activeColor,
        tabs,
        activeTab,
        scrollLeft
      };
      if (type === "default")
        return this.renderDefaultComponent(defaultParameter);
      else if (type === "verb")
        return this.renderVerbComponent(defaultParameter);
      else if (type === "center")
        return this.renderCenterComponent(defaultParameter);
      else return <Block />;
    };
    return (
      <View
        className={classNames(this.props.className)}
        style={Object.assign({ overflow: "hidden" }, this.props.style)}
      >
        {renderComponent()}
        <ScrollView scrollY>
          <View
            className="scrollx"
            style={{
              width: "auto",
              transform: `translateX(-${pxTransform(
                contentScrollLeft / screenPercent
              )})`,
              transitionDuration: `${duration}s`
            }}
            onTouchStart={e => {
              if (!this.props.touchMove) return;
              scrollLeftContent = 0;
              duration = 0;
              move = e.touches[0].pageX;
            }}
            onTouchMove={e => {
              if (!this.props.touchMove) return;
              if (scrollLeftContent === 0)
                scrollLeftContent = e.touches[0].pageX;
              distance = e.touches[0].pageX - scrollLeftContent;
              this.setState({
                contentScrollLeft: contentScrollLeft - distance
              });
              scrollLeftContent = e.touches[0].pageX;
            }}
            onTouchEnd={e => {
              if (!this.props.touchMove) return;
              duration = 0.3;
              move = e.changedTouches[0].x - move;
              const maxIndex = this.props.tabs.length - 1;
              if (move < -50)
                this.onClickTab(
                  this.state.activeTab + 1 > maxIndex
                    ? maxIndex
                    : this.state.activeTab + 1
                );
              else if (move > 50) this.onClickTab(this.state.activeTab - 1);
              else this.onClickTab(this.state.activeTab);
            }}
          >
            {this.props.children}
          </View>
        </ScrollView>
      </View>
    );
  }
}
