# 杖量山河@订阅

这是个人维护的 GKD 订阅项目，用于整理和维护日常使用应用中的广告、提示弹窗及其他自动化规则。

订阅 ID：`25789`

## 订阅地址

构建后的订阅文件位于 `dist/gkd.json5`，可以将下面的地址添加到 GKD：

```text
https://raw.githubusercontent.com/liuzhichao-cd/gkd-subscription/main/dist/gkd.json5
```

版本检查文件地址为：

```text
https://raw.githubusercontent.com/liuzhichao-cd/gkd-subscription/main/dist/gkd.version.json5
```

## 环境要求

- Node.js 26，项目中的运行时配置按 Node.js 26 设置
- pnpm 11

规则选择器的校验依赖 Node.js 的 WasmGC 能力，Node.js 版本至少应为 22；实际开发建议直接使用项目配置的 Node.js 26。

安装依赖：

```shell
pnpm install
```

如果网络原因导致 npm 官方源下载缓慢，可以使用镜像源：

```shell
pnpm install --registry=https://registry.npmmirror.com
```

## 项目结构

```text
src/
├── subscription.ts   订阅基本信息及应用规则汇总
├── categories.ts     规则分类定义
├── globalGroups.ts   全局规则
└── apps/             按应用包名维护的应用规则
scripts/
├── check.ts          订阅数据校验
└── build.ts          构建并更新 dist
dist/                 构建生成的订阅文件
```

主要配置文件：

- `package.json`：依赖、检查、格式化和构建脚本
- `pnpm-lock.yaml`：依赖版本锁定文件
- `.github/workflows/`：推送检查和手动构建发布流程

## 维护规则

### 订阅信息

订阅名称、作者、订阅 ID、版本和更新地址在 `src/subscription.ts` 中维护。订阅 ID 当前为 `25789`，如需改动，应确认新的 ID 不会与其他订阅重复。

### 规则分类

分类定义在 `src/categories.ts` 中。应用规则组的 `key` 只是当前应用内的规则组编号，不对应分类编号；规则组通过 `name` 的前缀归类。

例如：

```ts
{
  key: 4,
  name: '全屏广告-关闭倍孜插屏广告',
}
```

该规则组对应 `categories.ts` 中名称为 `全屏广告` 的分类，而不是根据 `key: 4` 对应到分类 `key: 4`。新增规则组时，名称应使用已有分类名称作为前缀，例如 `权限提示-通知权限`、`局部广告-卡片广告`。

### 应用规则

每个应用通常使用 Android 包名作为文件名，例如：

```text
src/apps/com.lolaage.tbulu.tools.ts
```

应用规则文件通过 `defineGkdApp` 定义应用信息和规则组。新增或修改应用规则时，应同步检查规则分类、选择器和示例截图地址，并保持应用内规则组 `key` 唯一。

### 全局规则

通用的广告、提示和权限规则维护在 `src/globalGroups.ts`。只有适用于多个应用的规则才应放入全局规则，应用特有的规则放在对应的 `src/apps/*.ts` 文件中。

## 检查与构建

检查订阅数据和 TypeScript 类型：

```shell
pnpm run check
```

格式化项目文件：

```shell
pnpm run format
```

运行 ESLint 并自动修复可修复的问题：

```shell
pnpm run lint
```

构建订阅：

```shell
pnpm run build
```

构建命令会先执行 TypeScript 类型检查和订阅数据校验，然后将 `src` 下的分散配置合并为以下文件：

- `dist/gkd.json5`：完整订阅内容
- `dist/gkd.version.json5`：当前订阅版本
- `dist/CHANGELOG.md`：构建变更记录
- `dist/README.md`：随订阅一同发布的项目说明

构建输出中的版本由构建工具根据源码和规则内容自动更新，不需要手动编辑 `dist` 文件。

## GitHub Actions

项目包含以下工作流：

- `check_fix_push.yml`：向任意分支推送代码后执行检查、格式化和 lint，并在产生格式修复时自动提交。
- `pull_request_check.yml`：针对 `main` 分支的 Pull Request 执行检查和格式校验。
- `build_release.yml`：仅支持手动触发。执行构建、提交生成文件、推送变更并创建对应版本的 GitHub Release。

本地修改完成后，建议先执行 `pnpm run check` 和 `pnpm run build`，确认校验通过并检查 `dist` 输出，再提交代码。

## 自定义构建配置

默认情况下无需额外配置，构建工具使用以下默认值：

```json
{
  "gkd": {
    "outDir": "dist",
    "file": "gkd.json5",
    "versionFile": "gkd.version.json5",
    "changelog": "CHANGELOG.md",
    "readme": "README.md"
  }
}
```

如需调整输出目录或文件名，可以在 `package.json` 中增加 `gkd` 配置。上述字段均为可选项，未配置时使用默认值。修改 `package.json` 后，需要重新执行 `pnpm install`，再运行构建命令。

## 参考资料

- GKD 文档与规则说明：<https://gkd.li>
- GKD API 类型参考：<https://gkd.li/api>
- GKD 选择器调试工具：<https://i.gkd.li>
- GDK [规则编写教程](https://github.com/Snoopy1866/notebook/blob/main/04%20Others/GKD%20%E8%A7%84%E5%88%99%E7%BC%96%E5%86%99%E6%95%99%E7%A8%8B/gkd-rule-tutorial.md)
