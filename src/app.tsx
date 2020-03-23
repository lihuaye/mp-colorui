import React from "react";
import "./app.scss";

// if (process.env.NODE_ENV !== "production" && process.env.TARO_ENV === "h5") {
//   require("nerv-devtools");
// }

class App extends React.Component {

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return this.props.children;
  }
}

export default App
