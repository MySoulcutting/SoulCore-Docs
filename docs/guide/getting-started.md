# 快速开始

SoulCore 分为客户端与服务端两部分，两者配合使用才能体验完整功能。下面按顺序完成安装。

## 1. 准备材料

你需要先构建或获取以下文件：

| 文件 | 放置位置 | 说明 |
|---|---|---|
| `SoulCore-Fabirc-<version>.jar` | 客户端 `mods/` | Fabric 客户端 Mod |
| `Fabric API` | 客户端 `mods/` | 官方依赖 |
| `SoulCore-Plugin-<version>.jar` | 服务端 `plugins/` | Paper 插件 |

> GeckoLib 已内嵌在 Fabric Mod 中，**不需要**再单独下载。如果 `mods` 目录已有其他 GeckoLib 版本，请保持版本兼容，避免同时加载不兼容版本。

版本要求：Minecraft `1.21.11`、Java `21+`、Fabric Loader `0.19.3+`、Fabric API `0.141.6+1.21.11`、Paper `1.21.11`。

## 2. 安装客户端 Mod

1. 将 `SoulCore-Fabirc-<version>.jar` 与 `Fabric API` 放入客户端 `.minecraft/mods/` 目录。
2. 启动 Minecraft 客户端（需通过 Fabric Loader 启动）。
3. Mod 启动时会自动创建图片资源目录：
   ```
   .minecraft/resourcepacks/soulcore/
   ```
4. 在游戏中输入 `/soulcore-client` 打开总控设置菜单，确认功能开关可用。

## 3. 安装服务端插件

1. 将 `SoulCore-Plugin-<version>.jar` 放入服务端 `plugins/` 目录。
2. 启动（或重启）服务端。首次启动后插件会生成配置文件：
   ```
   plugins/SoulCore/config.yml
   plugins/SoulCore/modules/icons.yml
   plugins/SoulCore/modules/hud.yml
   plugins/SoulCore/modules/tooltip-text.yml
   plugins/SoulCore/modules/particles.yml
   plugins/SoulCore/modules/keybinds.yml
   plugins/SoulCore/modules/armor.yml
   ```
3. 在游戏内执行 `/soulcore reload` 重载配置。

## 4. 验证

进入服务器后检查：

- ✅ 总控菜单：输入 `/soulcore-client` 可打开设置界面
- ✅ 自定义物品图片：按[教程](/guide/modules/item-images)配置后，物品显示自定义图片
- ✅ 怪物血条：敌对生物头顶出现生命条
- ✅ 拾取提示：拾取物品时右下角出现通知

## 常见问题

| 现象 | 解决 |
|---|---|
| 服务端没有生成配置文件 | 确认 Paper 版本为 `1.21.11`，查看服务端日志中的报错 |
| 客户端没有自动创建 `resourcepacks/soulcore/` | 确认 Mod 已加载（F3 界面或 Mod 列表可见），目录会被创建但不会重复修改已有文件 |
| 物品图片不生效 | 确认服务端已 `/soulcore reload`，且图片文件名与 `texture` 配置一致，客户端图片目录存在对应文件 |
| 客户端命令无效 | `/soulcore-client` 是纯客户端命令，不向服务端发送；确认输入正确且无多余空格 |

::: tip 升级提示
从旧版本升级时，插件会自动从旧的 `plugins/SoulCore/icons.yml`、`plugins/SoulCore/items.yml` 或旧目录 `plugins/SoulCore-Plugin/` 迁移数据，并把 `items`、`image`、`custom-data` 转换为 `icons`、`texture`、`nbt`。旧文件不会被删除或覆盖。
:::

继续阅读：[安装详解](/guide/installation) · [自定义物品图片](/guide/modules/item-images)
