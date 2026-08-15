# 安装

本章详细介绍客户端与服务端的安装步骤、配置生成与升级迁移。

## 环境要求

| 组件 | 版本 |
|---|---|
| Minecraft | `1.21.11` |
| Java | `21+` |
| Fabric Loader | `0.19.3+` |
| Fabric API | `0.141.6+1.21.11` |
| GeckoLib | `5.4.5`（内嵌，无需单独安装） |
| Paper API | `1.21.11` |

## 客户端安装（Fabric Mod）

### 1. 安装 Fabric Loader

使用 [Fabric 官方安装器](https://fabricmc.net/use/installer/)，为 `1.21.11` 版本安装 Fabric Loader `0.19.3+`。

### 2. 放入 Mod 文件

将以下文件放入客户端 `.minecraft/mods/` 目录：

```text
SoulCore-Fabirc-<version>.jar
fabric-api-0.141.6+1.21.11.jar
```

### 3. 首次启动

Mod 启动时会自动创建客户端图片资源目录（若已存在则不会修改其中的文件）：

```text
.minecraft/resourcepacks/soulcore/
```

### 4. 验证

- 使用 Fabric Loader 启动游戏，进入任意世界。
- 输入 `/soulcore-client`，应能打开总控设置菜单（伤害显示、生命恢复、怪物血量开关、拾取 HUD 位置设置）。

::: warning GeckoLib 注意事项
GeckoLib 已内嵌在 SoulCore Fabric Mod 中，不需要再单独下载。如果 `mods` 目录已有其他 GeckoLib 版本，请保持版本兼容，避免同时加载不兼容版本。
:::

## 服务端安装（Paper 插件）

### 1. 放入插件文件

将 `SoulCore-Plugin-<version>.jar` 放入服务端 `plugins/` 目录。

### 2. 首次启动生成配置

首次启动后，插件会生成以下配置文件：

```text
plugins/SoulCore/config.yml                     # 服务端总配置
plugins/SoulCore/modules/icons.yml              # 自定义物品图片匹配规则
plugins/SoulCore/modules/hud.yml                # 进服自动下发的 HUD 文本与图片
plugins/SoulCore/modules/tooltip-text.yml       # 物品 Tooltip 文本增强
plugins/SoulCore/modules/particles.yml          # 进服自动触发的粒子效果
plugins/SoulCore/modules/keybinds.yml           # 服务端按键定义
plugins/SoulCore/modules/armor.yml              # 装备外观规则
```

### 3. 重载配置

修改任何配置文件后，在游戏内执行：

```text
/soulcore reload
```

所需权限：`soulcore.reload`（默认 OP）。

## 升级迁移

从旧版本升级时，如果新文件尚不存在，插件会自动迁移旧数据：

- 旧文件来源：
  - `plugins/SoulCore/icons.yml`
  - `plugins/SoulCore/items.yml`
  - 旧目录 `plugins/SoulCore-Plugin/icons.yml`
  - 旧目录 `plugins/SoulCore-Plugin/items.yml`
- 自动转换：
  - `items` → `icons`
  - `image` → `texture`
  - `custom-data` → `nbt`

旧文件不会被删除或覆盖。

## 目录速查

| 路径 | 用途 |
|---|---|
| 客户端 `mods/` | Mod 与 Fabric API |
| 客户端 `resourcepacks/soulcore/` | 自定义物品图片、装备外观、本地图片（自动创建） |
| 服务端 `plugins/SoulCore/config.yml` | 服务端总开关与限制 |
| 服务端 `plugins/SoulCore/modules/` | 各功能的具体规则文件 |

::: tip 图片目录说明
`resourcepacks/soulcore/` 是普通文件目录：

- 不需要 `pack.mcmeta`
- 不需要在游戏资源包界面启用
- 支持子目录
- 不限制扩展名、文件大小、分辨率或长宽比
- 图片必须能被 Minecraft 客户端正常解码
- 支持图片同名的 Minecraft 原生动画元数据文件（如 `soul_blade.png.mcmeta`）
:::

## 下一步

- [自定义物品图片](/guide/modules/item-images) —— 配置第一把自定义物品
- [客户端模块](/guide/modules/settings) —— 战斗文字、怪物血条、拾取提示
- [服务端模块](/guide/modules/hud) —— HUD、Tooltip、粒子、按键与装备外观
