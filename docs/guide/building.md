# 构建与发布

## 环境要求

- Java `21+`
- 项目自带的 Gradle Wrapper，无需单独安装 Gradle
- 首次构建需要联网下载 Gradle、Minecraft、NeoForge、ModernUI 和 GeckoLib 依赖

项目使用 Mojang official mappings。构建包含 NeoForge、Paper、Protocol 与 `modernui-port`，不要只从单个子模块的旧输出判断完整发布是否成功。

## 本地完整构建

macOS / Linux：

```bash
./gradlew clean build --stacktrace
```

Windows：

```powershell
.\gradlew.bat clean build --stacktrace
```

根项目把五个可发布产物汇总到 `build/libs/`：

```text
build/libs/SoulCore-NeoForge-<version>.jar
build/libs/SoulCore-Plugin-<version>.jar
build/libs/protocol-<version>.jar
build/libs/SoulCore-Fonts-<version>.zip
build/libs/SoulCore-Color-Emoji-<version>.zip
```

::: tip 文件名说明
本地 Protocol 文件名为 `protocol-<version>.jar`；发布工作流上传前会复制为 `SoulCore-Protocol-<version>.jar`。
:::

### 只构建指定内容

```bash
# NeoForge Mod
./gradlew :neoforge-mod:build

# Paper 插件
./gradlew :paper-plugin:build

# Protocol
./gradlew :protocol:build

# 字体包与 Emoji 资源包
./gradlew :modernui-port:fontBundle :modernui-port:emojiResourcePack
```

## 构建门禁

完整 `build` 会运行模块测试和 JAR/资源包内容检查，包括：

- NeoForge JAR 的 metadata、客户端入口、Mixin、嵌套 Protocol、GeckoLib 与 ModernUI 端口；
- Paper JAR 的默认配置文件；
- 字体包目录、字体许可与摘要；
- Emoji 资源包的 `pack.mcmeta`、数据和图片清单；
- Protocol 编解码及各客户端模块的纯逻辑/源码回归测试。

构建通过证明编译、测试和打包满足门禁，不等同于游戏内渲染已经验证。

## GitHub Actions

`Build` 工作流在以下情况执行 `./gradlew clean build --stacktrace`：

- 推送到 `master`；
- 创建或更新 Pull Request；
- 手动运行工作流。

成功后上传四组 Actions Artifact：

- `SoulCore-NeoForge`
- `SoulCore-Plugin`
- `SoulCore-Protocol`
- `SoulCore-Font-Packs`（字体与 Emoji 两个 ZIP）

## 发布 Release

推送与 `gradle.properties` 中 `mod_version` 完全一致的 `v*` 标签时，`Release` 工作流会重新执行完整冷构建并创建 GitHub Release。格式示例（把 `X.Y.Z` 替换为尚未发布的 `mod_version`）：

```bash
git tag vX.Y.Z
git push origin vX.Y.Z
```

::: warning 版本一致性
标签 `v` 后的版本必须与 `mod_version` 一致，否则发布任务会拒绝执行。`v1.5.3` 已经存在，不要照示例重建或覆盖已有标签；如需新发布，应先提升 `mod_version`。
:::

Release 自动包含：

```text
SoulCore-NeoForge-<version>.jar
SoulCore-Plugin-<version>.jar
SoulCore-Protocol-<version>.jar
SoulCore-Fonts-<version>.zip
SoulCore-Color-Emoji-<version>.zip
```

## 当前版本信息

来源为根目录 `gradle.properties`：

| 属性 | 当前值 |
|---|---|
| `mod_version` | `1.5.3` |
| `minecraft_version` | `1.21.8` |
| `neo_version` | `21.8.54` |
| `moddev_version` | `2.0.143` |
| `geckolib_version` | `5.2.2` |
| `modernui_core_version` | `3.13.0` |
| `arc3d_version` | `2026.2.0` |

## 客户端功能验证

::: warning 注意
自动构建不会进入 Minecraft 世界或服务器。渲染、鼠标交互、资源重载和服务端联动仍需游戏内验证。
:::

发布前至少检查：

- 战斗文字、怪物血条名称规则和拾取 HUD；
- 物品图片、动画、独立 GUI 图标、手持/掉落 3D 模型；
- 平滑字体切换、字体回退、字符图标与可选 Emoji；
- CustomQuest 对话的鼠标/键盘操作；
- CustomQuest 导航的光柱、圆环、标签与生命周期清理；
- 任务追踪 HUD 的滚动、收起、布局持久化和导航按钮。
- 统一 GUI 的 HUD/MENU、文本标题组件、按钮交互、变量表达式、生命周期事件、alpha/scale 动态属性和有限动画；自 1.5.3 版本起还需验证客户端运行时布局表达式、屏幕尺寸变量、相对纹理路径、默认层级和混合槽位 tooltip 行为。

## 下一步

- [安装](/guide/installation) —— 核对五种发布文件的用途
- [FAQ](/faq) —— 常见问题
- [命令与权限](/guide/commands) —— 命令参考
