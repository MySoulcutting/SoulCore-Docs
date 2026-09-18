# 快速开始

SoulCore 的 NeoForge 客户端可以独立提供战斗文字、怪物血条、拾取提示和设置界面；配合 SoulCore Paper 插件可使用物品图片、怪物血条名称规则与服务端效果，配合 CustomQuest 则可使用任务对话、导航和追踪 HUD。

## 1. 准备材料

你需要先构建或获取以下文件：

| 文件 | 放置位置 | 说明 |
|---|---|---|
| `SoulCore-NeoForge-<version>.jar` | 客户端 `mods/` | NeoForge 客户端 Mod |
| `SoulCore-Plugin-<version>.jar` | 服务端 `plugins/` | Paper 插件 |
| `SoulCore-Fonts-<version>.zip` | 解压到客户端 `resourcepacks/` | 推荐：默认平滑字体 |
| `SoulCore-Color-Emoji-<version>.zip` | 客户端 `resourcepacks/` | 可选：彩色 Emoji 与 shortcode |
| 支持 SoulCore 的 CustomQuest | 服务端 `plugins/` | 可选：任务对话、导航与追踪 HUD |

> GeckoLib 和专用 ModernUI Text Port 已内嵌在 NeoForge Mod 中，**不需要**再单独下载。请从 `mods/` 移除完整 ModernUI-MC（mod ID `modernui`），它与 SoulCore 的内嵌端口明确冲突；已有其他 GeckoLib 版本时也应确认兼容性。

版本要求：Minecraft `1.21.8`、Java `21+`、NeoForge `21.8.54+`、Paper `1.21.8`。

## 2. 安装客户端 Mod

1. 将 `SoulCore-NeoForge-<version>.jar` 放入客户端 `.minecraft/mods/` 目录。
2. 如需默认平滑字体，把同版本 `SoulCore-Fonts-<version>.zip` 解压到 `.minecraft/resourcepacks/`，最终确认存在：
   ```text
   .minecraft/resourcepacks/soulcore/fonts/smooth.ttf
   ```
3. 如需彩色 Emoji，把同版本 `SoulCore-Color-Emoji-<version>.zip` 保持压缩状态放入 `.minecraft/resourcepacks/`，并在资源包界面启用。
4. 使用 Minecraft `1.21.8` 的 NeoForge 配置启动客户端。Mod 会自动创建本地资源目录：
   ```
   .minecraft/resourcepacks/soulcore/
   ```
5. 输入 `/soulcore-client` 打开总控菜单，确认战斗、血条、拾取 HUD、任务追踪 HUD 与平滑字体入口可用。

## 3. 安装服务端插件

1. 将 `SoulCore-Plugin-<version>.jar` 放入服务端 `plugins/` 目录。
2. 启动（或重启）服务端。首次启动后插件会生成配置文件：
   ```
   plugins/SoulCore/config.yml
   plugins/SoulCore/modules/font.yml
   plugins/SoulCore/modules/icons.yml
   plugins/SoulCore/modules/mob_health.yml
   plugins/SoulCore/modules/hud.yml
   plugins/SoulCore/modules/tooltip-text.yml
   plugins/SoulCore/modules/particles.yml
   plugins/SoulCore/modules/keybinds.yml
   plugins/SoulCore/modules/armor.yml
   ```
3. 如需自定义 HUD 或菜单，编辑 `plugins/SoulCore/gui/example.yml`，将 `enable` 改为 `true`，然后执行 `/soulcore reload`。

## 4. 可选安装 CustomQuest

将支持 SoulCore `1.4.0` 客户端通道的 CustomQuest 放入服务端 `plugins/`。任务对话、导航和追踪快照由 CustomQuest 直接发送给 NeoForge 客户端，**不依赖 SoulCore Paper 插件**。

具体的 NPC 对话、任务目标与导航坐标在 CustomQuest 中配置；SoulCore 只负责客户端显示与交互。

## 5. 验证

进入服务器后检查：

- ✅ 总控菜单：输入 `/soulcore-client` 可打开设置界面
- ✅ 平滑字体：安装字体包后进入字体设置，应用时没有缺失字体警告
- ✅ 自定义物品图片：按[教程](/guide/modules/item-images)配置后，物品显示自定义图片
- ✅ 怪物血条：敌对生物头顶出现生命条，修改 `mob_health.yml` 后可按名称筛选
- ✅ 拾取提示：拾取物品时右下角出现通知
- ✅ CustomQuest（可选）：对话、世界导航与任务追踪 HUD 能接收服务端内容

## 常见问题

| 现象 | 解决 |
|---|---|
| 服务端没有生成配置文件 | 确认 Paper 版本为 `1.21.8`，查看服务端日志中的报错 |
| 客户端没有自动创建 `resourcepacks/soulcore/` | 确认 Mod 已加载（F3 界面或 Mod 列表可见），目录会被创建但不会重复修改已有文件 |
| 物品图片不生效 | 确认服务端已 `/soulcore reload`，且图片文件名与 `texture` 配置一致，客户端图片目录存在对应文件 |
| 平滑字体没有变化 | 确认字体 ZIP 已解压到 `resourcepacks/soulcore/fonts/`，没有多套一层目录 |
| CustomQuest 面板为空 | 确认客户端为 `1.4.0` 或协议兼容版本，且 CustomQuest 支持对应通道 |
| 客户端命令无效 | `/soulcore-client` 是纯客户端命令，不向服务端发送；确认输入正确且无多余空格 |

::: tip 升级提示
从旧版本升级时，插件会自动从旧的 `plugins/SoulCore/icons.yml`、`plugins/SoulCore/items.yml` 或旧目录 `plugins/SoulCore-Plugin/` 迁移数据：去掉旧 `icons:` / `items:` 包裹层，并把 `image`、`custom-data` 转换为 `texture`、`nbt`。旧文件不会被删除或覆盖。
:::

继续阅读：[安装详解](/guide/installation) · [统一 GUI 配置](/guide/modules/gui) · [平滑字体](/guide/modules/smooth-fonts) · [CustomQuest 任务对话](/guide/modules/quest-dialogue) · [自定义物品图片](/guide/modules/item-images)
