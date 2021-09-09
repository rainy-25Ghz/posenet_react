

# posenet-breakout-clone-game

一个基于 posenet 的打砖块小游戏

<!-- PROJECT SHIELDS -->

[![Contributors][contributors-shield]][contributors-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />

<p align="center">
  <a href="https://github.com/rainy-25Ghz/posenet_react/">
    <img src="data:image/svg+xml;base64,PHN2ZyB0PSIxNjMxMTc2ODYwMjczIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIyMDIiIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4Ij48ZGVmcz4KICAgICAgPHJhZGlhbEdyYWRpZW50IGlkPSJHcmFkaWVudFJlZmxlY3QiCiAgICAgICAgICAgIGN4PSIwLjUiIGN5PSIwLjUiIHI9IjAuNCIgZng9IjAuNzUiIGZ5PSIwLjc1IgogICAgICAgICAgICBzcHJlYWRNZXRob2Q9InJlZmxlY3QiPgogICAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNFQTNEMkMiLz4KICAgICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM0RTg0QzgiLz4KICAgICAgPC9yYWRpYWxHcmFkaWVudD4KICA8L2RlZnM+PHBhdGggZD0iTTIwNC44IDM1OC40YTE1My42IDE1My42IDAgMSAxIDAgMzA3LjIgMTUzLjYgMTUzLjYgMCAwIDEgMC0zMDcuMnogbTMwNy4yIDBhMTUzLjYgMTUzLjYgMCAxIDEgMCAzMDcuMiAxNTMuNiAxNTMuNiAwIDAgMSAwLTMwNy4yeiBtMzA3LjIgMGExNTMuNiAxNTMuNiAwIDEgMSAwIDMwNy4yIDE1My42IDE1My42IDAgMCAxIDAtMzA3LjJ6IiBwLWlkPSIyMjAzIiBmaWxsPSIjMmMyYzJjIj48L3BhdGg+PHBhdGggZD0iTTgxOS4yIDMwNy4yYy02MS40NCAwLTExNi4wNzA0IDI3Ljc1MDQtMTUzLjYgNzAuNzU4NEEyMDMuNDY4OCAyMDMuNDY4OCAwIDAgMCA1MTIgMzA3LjJhMjAzLjQ2ODggMjAzLjQ2ODggMCAwIDAtMTUzLjYgNzAuNzU4NEEyMDMuNDY4OCAyMDMuNDY4OCAwIDAgMCAyMDQuOCAzMDcuMmMtMTEyLjk0NzIgMC0yMDQuOCA5MS44NTI4LTIwNC44IDIwNC44czkxLjg1MjggMjA0LjggMjA0LjggMjA0LjhhMjAzLjQ2ODggMjAzLjQ2ODggMCAwIDAgMTUzLjYtNzAuNzU4NEEyMDMuNDY4OCAyMDMuNDY4OCAwIDAgMCA1MTIgNzE2LjhjNjEuNDQgMCAxMTYuMDcwNC0yNy43NTA0IDE1My42LTcwLjc1ODQgMzcuNTI5NiA0My4wMDggOTIuMTYgNzAuNzU4NCAxNTMuNiA3MC43NTg0IDExMi45NDcyIDAgMjA0LjgtOTEuODUyOCAyMDQuOC0yMDQuOHMtOTEuODUyOC0yMDQuOC0yMDQuOC0yMDQuOG0wIDMwNy4yYy01Ni40NzM2IDAtMTAyLjQtNDUuOTI2NC0xMDIuNC0xMDIuNHM0NS45MjY0LTEwMi40IDEwMi40LTEwMi40IDEwMi40IDQ1LjkyNjQgMTAyLjQgMTAyLjQtNDUuOTI2NCAxMDIuNC0xMDIuNCAxMDIuNG0tMzA3LjIgMGMtNTYuNDczNiAwLTEwMi40LTQ1LjkyNjQtMTAyLjQtMTAyLjRzNDUuOTI2NC0xMDIuNCAxMDIuNC0xMDIuNCAxMDIuNCA0NS45MjY0IDEwMi40IDEwMi40LTQ1LjkyNjQgMTAyLjQtMTAyLjQgMTAyLjRtLTMwNy4yIDBjLTU2LjQ3MzYgMC0xMDIuNC00NS45MjY0LTEwMi40LTEwMi40czQ1LjkyNjQtMTAyLjQgMTAyLjQtMTAyLjQgMTAyLjQgNDUuOTI2NCAxMDIuNCAxMDIuNC00NS45MjY0IDEwMi40LTEwMi40IDEwMi40bS0xMDIuNCAzMDcuMmE1MS4yIDUxLjIgMCAxIDAtMTAyLjQgMHY1MS4yYTUxLjIgNTEuMiAwIDAgMCA1MS4yIDUxLjJoNTEuMmE1MS4yIDUxLjIgMCAxIDAgMC0xMDIuNG04NzAuNC01MS4yYTUxLjIgNTEuMiAwIDAgMC01MS4yIDUxLjIgNTEuMiA1MS4yIDAgMSAwIDAgMTAyLjRoNTEuMmE1MS4yIDUxLjIgMCAwIDAgNTEuMi01MS4ydi01MS4yYTUxLjIgNTEuMiAwIDAgMC01MS4yLTUxLjJtMC04NzAuNGgtNTEuMmE1MS4yIDUxLjIgMCAxIDAgMCAxMDIuNCA1MS4yIDUxLjIgMCAxIDAgMTAyLjQgMFY1MS4yYTUxLjIgNTEuMiAwIDAgMC01MS4yLTUxLjJNNTEuMiAxNTMuNmE1MS4yIDUxLjIgMCAwIDAgNTEuMi01MS4yIDUxLjIgNTEuMiAwIDAgMCAwLTEwMi40SDUxLjJhNTEuMiA1MS4yIDAgMCAwLTUxLjIgNTEuMnY1MS4yYTUxLjIgNTEuMiAwIDAgMCA1MS4yIDUxLjJtMjU2LTUxLjJoMTAyLjRhNTEuMiA1MS4yIDAgMCAwIDAtMTAyLjRIMzA3LjJhNTEuMiA1MS4yIDAgMCAwIDAgMTAyLjRtMzA3LjIgMGgxMDIuNGE1MS4yIDUxLjIgMCAxIDAgMC0xMDIuNGgtMTAyLjRhNTEuMiA1MS4yIDAgMSAwIDAgMTAyLjRNNDA5LjYgOTIxLjZIMzA3LjJhNTEuMiA1MS4yIDAgMSAwIDAgMTAyLjRoMTAyLjRhNTEuMiA1MS4yIDAgMSAwIDAtMTAyLjRtMzA3LjIgMGgtMTAyLjRhNTEuMiA1MS4yIDAgMSAwIDAgMTAyLjRoMTAyLjRhNTEuMiA1MS4yIDAgMSAwIDAtMTAyLjQiIHAtaWQ9IjIyMDQiIGZpbGw9InVybCgjR3JhZGllbnRSZWZsZWN0KSI+PC9wYXRoPjwvc3ZnPg==" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Posenet打砖块</h3>
  <p align="center">
    Move your body, hit the blocks!
    <br />
    <a href="https://github.com/rainy-25Ghz/posenet_react"><strong>探索本项目的文档 »</strong></a>
    <br />
    <br />
    <a href="https://rainy-25Ghz.github.io/posenet_react/index.html">试玩Demo</a>
    ·
    <a href="https://github.com/rainy-25Ghz/posenet_react/issues">报告Bug</a>
    ·
    <a href="https://github.com/rainy-25Ghz/posenet_react/issues">提出新特性</a>
  </p>

</p>

以下部分面向开发者。
 
## 目录

- [posenet-breakout-clone-game](#posenet-breakout-clone-game)
  - [目录](#目录)
    - [环境配置](#环境配置)
    - [部署](#部署)
      - [`yarn start`](#yarn-start)
      - [`yarn test`](#yarn-test)
      - [`yarn build`](#yarn-build)
    - [使用到的框架](#使用到的框架)
    - [作者](#作者)
      - [团队成员](#团队成员)
    - [版本控制](#版本控制)
    - [版权说明](#版权说明)
    - [鸣谢](#鸣谢)

### 环境配置

1. 安装 Node.js
2. 克隆此仓库
3. 运行 `yarn`（推荐）或 `npm i` 安装模块依赖

### 部署

在本项目中，你可以：

#### `yarn start`

在开发模式下运行本项目。\
在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看。

如果您进行编辑，页面将重新加载。\

#### `yarn test`

在交互式观察模式下启动测试运行器。\
有关更多信息，请参阅有关 [运行测试](https://facebook.github.io/create-react-app/docs/running-tests) 的部分。

#### `yarn build`

将用于生产的项目构建到 `build` 文件夹。\
它捆绑了 React 并优化了构建以获得最佳性能。

有关更多信息，请参阅有关 [deployment](https://facebook.github.io/create-react-app/docs/deployment) 的部分。 

### 使用到的框架

- [Create React App](https://github.com/facebook/create-react-app)

### 作者

Team 200OK from 2021 FRONT-END TRAINEE PROGRAM (ZJU)

#### 团队成员

- 纪海纳（Leader）
- 徐佳琦
- 杨蕊
- 阎鸿彬
- 赵方园

### 版本控制

该项目使用Git进行版本管理。您可以在仓库中参看当前可用版本。

### 版权说明

该项目签署了 MIT 授权许可，详情请参阅 [LICENSE.txt](https://github.com/rainy-25Ghz/posenet_react/blob/master/LICENSE.txt)

### 鸣谢


- [posenet](https://github.com/tensorflow/tfjs-models/tree/master/posenet)
- [MDN](https://developer.mozilla.org/zh-TW/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript)
- [GitHub Pages](https://pages.github.com)
- [Best_README_template](https://github.com/shaojintian/Best_README_template)
- [iconfont](https://www.iconfont.cn/)

<!-- links -->
[your-project-path]: rainy-25Ghz/posenet_react
[contributors-shield]: https://img.shields.io/github/contributors/shaojintian/Best_README_template.svg?style=flat-square
[contributors-url]: https://github.com/rainy-25Ghz/posenet_react/graphs/contributors
[license-shield]: https://img.shields.io/github/license/shaojintian/Best_README_template.svg?style=flat-square
[license-url]: https://github.com/rainy-25Ghz/posenet_react/blob/master/LICENSE.txt