# 自定义物品图片

SoulCore 由 Paper 配置物品匹配规则，NeoForge 客户端把命中的物品替换为本地图片或 GeckoLib 3D 模型。配置文件为 `plugins/SoulCore/modules/icons.yml`。

**模块状态**：服务端下发规则 + 客户端渲染 · 依赖：客户端 Mod + `ITEM_IMAGES` 能力

## 工作原理

- Paper 只同步匹配规则，**不会发送图片、模型或动画文件**。
- 每个客户端需要把规则引用的资源放进 `.minecraft/resourcepacks/soulcore/`。
- 物品图片、装备外观和本地 HUD 图片统一由内置的 `SoulCore Resources` 资源包承载，不需要在资源包界面启用这个目录。
- 客户端不再提供物品图片开关；安装 SoulCore 后会始终参与能力协商。旧的 `item-images.properties` 不再生效，也不会被自动删除。

## 最简配置

规则直接写在 `icons.yml` 根节点：

```yaml
soul_blade:
  match:
    material: diamond_sword
  texture: soul_blade.png
```

`diamond_sword` 会自动转换为 `minecraft:diamond_sword`。

::: warning 旧格式仅用于兼容
旧版的 `icons:` 或 `items:` 包裹格式仍可读取，但新配置不要再添加这层节点。
:::

## 匹配方式

### 名称和 Lore 精确匹配

```yaml
soul_blade:
  match:
    material: diamond_sword
    name: "Soul Blade"
    lore: "Legendary"
  texture: weapons/soul_blade.png
  handheld: true
```

- `name`：区分大小写，精确匹配完整物品名称。
- `lore`：精确匹配任意一行 Lore。
- 同时填写多个条件时，所有条件都必须满足。

### 正则表达式匹配

```yaml
legendary_blade:
  priority: 100
  match:
    material: diamond_sword
    name-regex: "^Soul Blade \\+\\d+$"
    lore-regex: "^(Legendary|Mythic)$"
  texture: weapons/legendary_blade.png
  scale: 1.0
  handheld: true
```

正则表达式使用 Java `Pattern` 语法，对完整名称或完整 Lore 行执行匹配。

### NBT 匹配

`match.nbt` 匹配物品 `minecraft:custom_data` 中的自定义 NBT。直接填写 `路径: 值` 时执行类型敏感的精确匹配：

```yaml
blue_blade:
  match:
    material: diamond_sword
    nbt:
      variant: blue
      stats.0.level: 7
      enabled: true
  texture: weapons/blue_blade.png
```

嵌套 Compound 和列表索引使用点路径。字符串、布尔值和数字会自动推断 NBT 类型。

需要 `EXISTS`、`CONTAINS`、`GLOB` 或手动指定类型时，使用高级数组格式：

```yaml
blue_blade:
  match:
    material: diamond_sword
    nbt:
      - path: PublicBukkitValues.soulcore:variant
        operator: GLOB
        type: STRING
        value: 'blue-*'
      - path: PublicBukkitValues.soulcore:enabled
        operator: EXISTS
  texture: weapons/blue_blade.png
```

## 配置字段

| 字段 | 默认值 | 说明 |
|---|---:|---|
| `priority` | `0` | 数值越大，匹配优先级越高 |
| `match.material` | 无 | 物品注册 ID，可省略 `minecraft:` |
| `match.name` | 无 | 完整物品名称精确匹配 |
| `match.lore` | 无 | 任意一行 Lore 精确匹配 |
| `match.name-regex` | 无 | 完整物品名称正则匹配 |
| `match.lore-regex` | 无 | 任意一行 Lore 正则匹配 |
| `match.nbt` | 无 | `custom_data` NBT 条件，支持嵌套路径和列表索引 |
| `texture` | 必填 | 基础 2D 纹理；配置 3D 模型时也用于资源就绪检查和失败回退 |
| `model` | 无 | GeckoLib 可解析的 JSON 模型路径；填写后优先使用 3D 模型 |
| `icon` | 无 | 物品栏和 GUI 使用的独立 2D PNG |
| `animations` | 无 | GeckoLib `.animation.json` 动画路径 |
| `glow-texture` | 无 | GeckoLib 发光层 PNG 路径 |
| `scale` | `1.0` | 图片或模型缩放，范围 `0.1`–`4.0` |
| `icon-scale` | `1.0` | GUI 独立 2D 图标缩放，范围 `0.1`–`4.0` |
| `gui-scale` | `1.0` | GUI 中的 3D 模型缩放，范围 `0.1`–`4.0` |
| `gui-rotation` | `{x: 0, y: 0, z: 0}` | GUI 中 3D 模型的三轴旋转角度 |
| `handheld` | `false` | 是否使用手持物品变换 |

每条规则的 `match` 中至少需要一种匹配方式。

## 客户端资源

把规则引用的文件放入每个客户端自己的目录：

```text
.minecraft/resourcepacks/soulcore/
```

- 不需要 `pack.mcmeta`，也不需要在资源包界面启用。
- 支持子目录；路径使用 `/` 分隔，不能逃逸资源根目录。
- 图片必须能被 Minecraft 客户端正常解码。
- 仓库中的 `examples/item-images/soul_blade.png` 与同名 `.mcmeta` 可直接用于测试。

只替换客户端本地图片、模型、字体或动画文件后，执行：

```text
/soulcore-client reload
```

修改 `icons.yml` 规则后，执行服务端命令 `/soulcore reload`。

### 图片动画

图片同目录可放置同名 Minecraft 原生动画元数据，例如 `soul_blade.png.mcmeta`：

```json
{
  "animation": {
    "frametime": 2,
    "frames": [0, {"index": 1, "time": 4}],
    "interpolate": true
  }
}
```

图片高度应包含所有垂直排列的动画帧。

## GeckoLib 3D 物品模型

```yaml
gecko_soul_blade:
  priority: 100
  match:
    material: diamond_sword
    name: SoulBlade
  texture: items/soul_blade.png
  model: items/soul_blade.geo.json
  icon: items/soul_blade_gui.png
  icon-scale: 1.15
  animations: items/soul_blade.animation.json
  glow-texture: items/soul_blade_glow.png
  scale: 1.0
  handheld: true
  gui-scale: 0.85
  gui-rotation:
    x: 0
    y: 180
    z: 0
```

对应文件：

```text
.minecraft/resourcepacks/soulcore/items/soul_blade.png
.minecraft/resourcepacks/soulcore/items/soul_blade.geo.json
.minecraft/resourcepacks/soulcore/items/soul_blade_gui.png
.minecraft/resourcepacks/soulcore/items/soul_blade.animation.json
.minecraft/resourcepacks/soulcore/items/soul_blade_glow.png
```

- `icon`、`animations` 和 `glow-texture` 可以省略。
- 配置 `icon` 后，GUI 使用独立 2D 图标；手持、掉落、展示框和装备场景继续使用 3D 模型。
- 未配置 `icon` 时，GUI 继续显示可由 `gui-scale` 与 `gui-rotation` 调整的 3D 模型。
- `model` 只要求是 GeckoLib 可解析的 JSON，不强制文件名为 `.geo.json`；SoulCore 不直接解析 Blockbench `.bbmodel`。
- GeckoLib 已内嵌到 SoulCore NeoForge Mod，无需单独安装。

## 升级说明

如果新的 `plugins/SoulCore/modules/icons.yml` 尚不存在，插件会尝试迁移旧的 `icons.yml`、`items.yml` 或旧插件目录：

- 去掉旧的 `icons:` / `items:` 包裹层，把规则写到根节点。
- `image` 改为 `texture`。
- `custom-data` 改为 `nbt`。
- 旧文件不会被删除或覆盖。

## 相关

- [安装](/guide/installation) —— 客户端资源目录与升级迁移
- [平滑字体与字符图标](/guide/modules/smooth-fonts) —— 本地资源与重载命令
- [装备外观](/guide/modules/equipment-appearance) —— 相似的匹配规则，作用于装备外观
