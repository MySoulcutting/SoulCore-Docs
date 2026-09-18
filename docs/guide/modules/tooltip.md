# Tooltip 增强

SoulCore 的 Tooltip 模块不是文本行追加器，而是**按物品匹配规则选择 Tooltip 外观**。Paper 发送匹配规则，NeoForge 客户端负责渲染边框、渐变背景、标题分隔线、物品模型和相关动画。

配置文件：

```text
plugins/SoulCore/modules/tooltip.yml
```

启用开关：

```yaml
features:
  tooltip: true
```

修改后执行：

```text
/soulcore reload
```

## 工作流程

1. Paper 加载 `tooltip.yml`。
2. 玩家完成 SoulCore 握手后，服务端按能力协商下发 Tooltip 规则。
3. 客户端按 `priority` 和规则顺序匹配物品。
4. 命中的最高优先级规则决定 Tooltip 样式。
5. 规则引用的边框纹理必须由客户端提供，Paper 不传输图片本体。

## 最小配置

```yaml
legendary_sword:
  priority: 100
  match:
    material: minecraft:diamond_sword
    rarity: epic
  frame: 0
  border-start: "#FF996922"
  border-end: "#FF5A3A1D"
  background-start: "#F0160A00"
  background-end: "#E8160A00"
  shadow: true
  shine: true
  name-separator: true
  centered-title: true
  compact-tooltips: true
  render-item-model: true
  model-scale: 0.8
```

## 匹配条件

同一条规则内的条件是 **AND**，至少配置一个条件：

```yaml
match:
  material: minecraft:diamond_sword
  name: "屠魔之刃"
  lore: "传奇武器"
  name-regex: "^屠魔之刃 \\+\\d+$"
  lore-regex: "^(传奇|神话)$"
  rarity: epic
  nbt:
    variant: blue
    stats.0.level: 7
```

支持：

| 字段 | 说明 |
|---|---|
| `material` | 物品注册 ID，未写命名空间时默认使用 `minecraft` |
| `name` | 完整物品名称精确匹配 |
| `lore` | 任意一行 Lore 精确匹配 |
| `name-regex` | 完整名称 Java 正则匹配 |
| `lore-regex` | 任意一行 Lore Java 正则匹配 |
| `rarity` | `common`、`uncommon`、`rare`、`epic` |
| `nbt` | `minecraft:custom_data` 条件，支持点路径和列表索引 |

高级 NBT：

```yaml
match:
  nbt:
    - path: PublicBukkitValues.soulcore:variant
      operator: GLOB
      type: STRING
      value: "blue-*"
    - path: PublicBukkitValues.soulcore:enabled
      operator: EXISTS
```

支持的 NBT 操作由协议模型限制，常用操作包括 `EQUALS`、`CONTAINS`、`GLOB`、`EXISTS`。

## 优先级

```yaml
priority: 100
```

数字越大越优先；相同优先级按文件中的顺序稳定处理。每条规则必须有匹配条件，否则会被跳过并写入服务端日志。

## 外观字段

### 边框与颜色

```yaml
frame: 0
border-start: "#FF996922"
border-end: "#FF5A3A1D"
background-start: "#F0160A00"
background-end: "#E8160A00"
```

`frame` 合法范围为 `-2..15`：

- `-2`：使用原版 Tooltip 外观。
- `-1`：不使用固定边框帧，允许渐变/自动模式。
- `0..15`：使用边框纹理中的对应帧。

颜色支持整数、`#RRGGBB` 和 `#AARRGGBB`。

### 渲染开关

```yaml
match-rarity: false
shadow: true
shine: true
name-separator: true
centered-title: true
enforce-minimum-width: false
compact-tooltips: true
render-item-model: true
```

| 字段 | 作用 |
|---|---|
| `match-rarity` | 是否根据物品稀有度自动决定渐变颜色 |
| `shadow` | Tooltip 文字是否绘制阴影 |
| `shine` | 是否绘制闪光动画 |
| `name-separator` | 标题与属性之间是否绘制分隔线 |
| `centered-title` | 标题是否在内容区域居中 |
| `enforce-minimum-width` | 是否强制使用装饰所需的最小宽度 |
| `compact-tooltips` | 是否隐藏装备属性前的重复修饰符标题 |
| `render-item-model` | 是否在标题左侧渲染原生物品模型 |

### 模型

```yaml
render-item-model: true
model-scale: 0.8
model-border-color: "#FF996922"
model-background-start: "#F0160A00"
model-background-end: "#E8160A00"
```

`model-scale` 范围为 `0.1..4.0`。模型小框颜色为空时会根据主 Tooltip 颜色自动推导。

### 背景和边框模式

```yaml
background-mode: auto
border-mode: auto
```

支持：

```text
auto
resources
gradient
```

- `resources`：使用客户端资源纹理。
- `gradient`：使用服务端下发的起止颜色绘制渐变。
- `auto`：根据资源和颜色自动选择可用模式。

### 自定义边框纹理

```yaml
frame-resource: gui/tooltip_borders.png
frame-width: 64
part-size: 8
part-offset: -1
corner-offset: 2
```

`frame-resource` 相对于客户端资源目录：

```text
.minecraft/resourcepacks/soulcore/gui/tooltip_borders.png
```

限制：

- `frame-width`：`16..256`
- `part-size`：`1..frame-width/2`
- `part-offset`：`-32..32`
- `corner-offset`：`-32..32`

## 客户端资源

Paper 只发送资源 ID。客户端需要自行准备纹理：

```text
.minecraft/resourcepacks/soulcore/gui/tooltip_borders.png
```

资源缺失时，客户端会根据 `background-mode`/`border-mode` 回退到渐变或原版表现，不会阻止其他模块加载。

## 能力协商

Tooltip 使用独立能力：

- `TOOLTIP_RULES`：基础 Tooltip 规则。
- `TOOLTIP_MODEL_COLORS`：模型小框颜色等扩展字段。

不支持扩展能力的旧客户端会收到兼容的基础 Tooltip 规则，不会因为新字段解码失败。

## 常见问题

### 配置改了但没有效果

1. 确认 `features.tooltip: true`。
2. 执行 `/soulcore reload`。
3. 查看服务端日志是否跳过了非法规则。
4. 确认物品确实命中 `match`，同一规则多个条件必须全部满足。
5. 确认客户端已安装与服务端协议兼容的 SoulCore NeoForge Mod。

### 边框纹理不显示

确认文件位于：

```text
.minecraft/resourcepacks/soulcore/gui/tooltip_borders.png
```

并且 `frame-resource` 是合法资源 ID 或相对路径。

### 为什么没有 `append` / `prepend` / `replace`？

当前 Tooltip 模块负责样式渲染，不负责修改文本行。旧版文本追加配置不属于当前 Tooltip schema，应迁移到实际支持的匹配与样式字段。

## 相关页面

- [服务端模块总览](/guide/modules/gui)
- [安装](/guide/installation)
- [自定义 GUI](/guide/modules/gui)
- [自定义物品图片](/guide/modules/item-images)
- [FAQ](/faq)
