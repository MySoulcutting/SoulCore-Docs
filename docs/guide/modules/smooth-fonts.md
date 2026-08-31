# 平滑字体与字符图标

SoulCore Fabric 内嵌 ModernUI 的字体与 Text Engine 端口，提供整串文字塑形、BiDi、ICU 换行、SDF 世界文字、本地字体选择和服务端字符图标。无需另外安装 ModernUI-MC 或 Caxton。

**模块状态**：客户端字体 + 服务端字符图标 · 自 `1.3.1` 起提供；字符图标受客户端效果通道控制

## 安装默认字体

从同版本 Release 下载 `SoulCore-Fonts-<version>.zip`，解压到客户端 `.minecraft/resourcepacks/`。最终应得到：

```text
.minecraft/resourcepacks/soulcore/fonts/smooth.ttf
```

字体 ZIP 不是 Minecraft 资源包：不包含 `pack.mcmeta`，也不需要在资源包界面启用。SoulCore 不会覆盖已经存在的字体文件。

如果没有安装字体包，客户端仍能启动；默认平滑字体无法加载时会安全回退 Minecraft 字体。

## 客户端设置

执行 `/soulcore-client`，点击「平滑字体设置」。常用选项包括：

| 选项 | 默认 | 说明 |
|---|---:|---|
| 启用 | 开启 | 是否使用 `fonts/smooth.ttf` 等本地字体覆盖默认字体 |
| 字体文件 | `fonts/smooth.ttf` | 从 `resourcepacks/soulcore/fonts/` 中选择 |
| 字号 | `8.0` | 可调范围 `6.5`–`9.5` |
| X / Y 偏移 | `0.0` / `0.0` | 可调范围 `-64.0`–`64.0` |
| 抗锯齿 | 开启 | 控制轮廓字体的灰度边缘平滑 |
| 小数度量 | 按平台 | Windows 默认关闭，其他平台默认开启 |
| 全局字体缩放 | `1.0` | ModernUI 字体缩放，范围 `0.5`–`2.0` |

设置页还提供字体回退、文字方向、缓存、SDF 与世界文字等高级选项。点击「应用」后会校验并保存配置，再触发资源重载；无效输入不会覆盖上一份可用配置。

配置文件：

```text
.minecraft/config/soulcore/font.properties
```

平滑字体是纯客户端设置。连接、断开服务器或服务端执行 `/soulcore reload` 都不会覆盖它。

## 使用自己的字体

把字体放入 `.minecraft/resourcepacks/soulcore/fonts/` 或其子目录，然后重新打开设置页选择：

```text
.minecraft/resourcepacks/soulcore/fonts/custom.ttf
.minecraft/resourcepacks/soulcore/fonts/fallback/cjk.otc
```

- 支持 `.ttf`、`.otf`、`.ttc` 和 `.otc`。
- 最多扫描 256 个文件，单个文件最大 64 MiB。
- 文件名可包含大写字母、空格和 Unicode。
- 符号链接、无效签名和逃逸 `fonts/` 根目录的路径会被拒绝。
- 主字体缺少的字符会继续回退到配置字体族或 Minecraft glyph provider。

只替换了本地字体、图片或动画文件时，可执行：

```text
/soulcore-client reload
```

## 可选彩色 Emoji

`SoulCore-Color-Emoji-<version>.zip` 是独立的 Minecraft 资源包：

1. 把同版本 ZIP 直接放入 `.minecraft/resourcepacks/`，不要解压。
2. 在游戏资源包界面启用它。
3. 重载资源后，彩色 Emoji 与 `:shortcode:` 数据开始生效。

未安装、未启用或资源包损坏时，普通文字和平滑字体仍然工作，Emoji 会回退到当前可用字体。

## 服务端字符图标

Paper 的 `plugins/SoulCore/modules/font.yml` 只负责把文字 token 映射为客户端本地 PNG：

```yaml
sword:
  enable: true
  type: icon
  font-id: soulcore:sword
  token: <sword>
  texture: font/sword.png
  width: 16
  height: 16
  ascent: 14
```

客户端资源路径：

```text
.minecraft/resourcepacks/soulcore/font/sword.png
```

HUD 或 Tooltip 文本中出现 `<sword>` 时会显示该图片。

服务端下发字符图标要求 `config.yml` 中根 `enabled`、`modules.client-effects` 与 `protocol.effects-channel-enabled` 均为 `true`。这些开关只影响服务端图标规则，不影响客户端本地平滑字体。

- `font-id` 必须是合法的命名空间 ID。
- `width`、`height` 必须与 PNG 像素尺寸一致。
- `ascent` 控制图标相对文字基线的位置，不能超过 `height`。
- 最多下发 64 条启用的图标规则。
- 缺失或无效的图片不会激活 token，原始文字会保持可见。
- 旧的 `type: smooth` 不再下发；请改用 Fabric 客户端字体设置。

修改 `font.yml` 后执行服务端 `/soulcore reload`，让在线客户端接收完整新规则。

## 旧版本迁移

从早期 `1.3.0` 开发版升级时，把字体从 `resourcepacks/soulcore/font/` 移到 `resourcepacks/soulcore/fonts/`，再在客户端设置页重新选择。旧的 `font-icons.properties` 不再读取，也不会被自动删除。

## 常见排查

- 字体没有变化：确认 ZIP 已解压，且最终路径不是多套一层目录。
- 字符图标显示 token 原文：确认 PNG 路径、尺寸与 `font.yml` 完全一致，再执行服务端重载。
- Emoji 没有颜色：确认 Emoji ZIP 保持压缩状态并已在资源包界面启用。
- 字体显示异常：在设置页恢复 ModernUI 默认参数；仍有问题时暂时关闭本地字体覆盖确认是否为字体文件本身的问题。

## 相关

- [安装](/guide/installation) —— 字体包与 Emoji 包放置方式
- [命令与权限](/guide/commands) —— 客户端资源重载命令
- [HUD 文本与图片](/guide/modules/hud) · [Tooltip 增强](/guide/modules/tooltip)
