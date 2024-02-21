# 五子棋游戏 - Vue 3 + TypeScript + Vite

## 项目简介

欢迎来到使用Vue 3、TypeScript和Vite构建的五子棋游戏项目。这个项目旨在提供一个简单而优雅的五子棋游戏体验，同时展示了如何结合现代前端技术栈来构建一个交互式的Web应用。

## 技术栈

- **Vue 3**: 使用最新的Vue.js版本，利用其响应式系统和组合式API来构建用户界面。
- **TypeScript**: 提供类型安全和更好的开发体验，确保代码质量和可维护性。
- **Vite**: 一个快速、简单的前端构建工具，提供即时的模块热替换和快速的构建速度。

## 安装指南

1. **克隆项目**:

   ```bash
   git clone https://github.com/qingjiuge/gobang-game
   cd gobang-game
   ```

2. **安装依赖**:

   ```bash
   npm install
   ```

3. **运行开发服务器**:

   ```bash
   npm run dev
   ```

   这将启动一个本地开发服务器，通常在`http://localhost:3000`上运行。

## 构建与部署

1. **构建生产版本**:

   ```bash
   npm run build
   ```

   构建完成后，你会在`dist`目录下找到生产版本的文件。

2. **部署**:
   你可以将`dist`目录的内容部署到任何静态文件服务器上，或者使用像Vercel、Netlify这样的平台进行部署。

## 游戏玩法

- 使用鼠标点击棋盘上的空格来放置棋子。
- 玩家轮流下棋，直到一方形成五子连珠或棋盘填满。
- 形成五子连珠的玩家获胜。

## 贡献指南

我们欢迎任何形式的贡献！如果你想参与进来，请遵循以下步骤：

1. **Fork** 本项目。
2. **创建一个新的分支** (`git checkout -b feature/your-feature`)。
3. **提交你的更改** (`git commit -m 'Add some feature'`)。
4. **推送到你的分支** (`git push origin feature/your-feature`)。
5. **提交一个Pull Request**。

请确保在提交之前运行测试并遵循项目的编码规范。

## 许可证

本项目遵循MIT许可证。详细内容请查看[LICENSE](LICENSE)文件。
