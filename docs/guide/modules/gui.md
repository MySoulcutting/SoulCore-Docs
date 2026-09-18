# 统一 GUI 配置

::: tip 快速定位
本页按「先跑起来 → 再做动态 → 最后做安全与迁移」组织。第一次配置只需要看[最小配置](#最小配置)、[组件](#组件)和[命令与重载](#命令与重载)。
:::

SoulCore 1.5.2 的 GUI 使用一套统一配置协议。它参考 DragonCore 的变量、组件、事件和表达式组织方式，但所有业务动作仍由 Paper 服务端授权执行，客户端只负责渲染和回传交互元素 ID。

配置目录：

```text
plugins/SoulCore/gui/*.yml
plugins/SoulCore/gui/*.yaml
```

默认示例：

```text
plugins/SoulCore/gui/example.yml
```

默认示例为关闭状态：

```yaml
enable: false
```

启用后执行：

```text
/soulcore reload
```

## 重要：只有一套配置格式

当前版本不再区分 v1、v2、v3。以下字段已经移除，不能继续使用：

```text
version
kind
theme
style
顶层 title
```

GUI 类型统一使用：

```yaml
type: hud
```

或：

```yaml
type: menu
```

如果配置中出现旧字段，SoulCore 会记录字段路径并跳过该 GUI，不会静默按旧语义加载。

标题不再使用顶层 `title`，必须写成普通文本组件：

```yaml
components:
  title:
    type: text
    x: 40
    y: 30
    width: 560
    height: 28
    layer: 2
    text: "&6&l玩家状态"
    color: "#FFFBBF24"
    scale: 1.1
    align: center
```

这样标题的位置、大小、缩放、颜色和层级都可以独立控制。

## 最小配置

```yaml
enable: true
id: example:profile
type: menu

design:
  width: 640
  height: 360
  anchor: center
  background: "#B8000000"

components:
  panel:
    type: panel
    x: 24
    y: 24
    width: 592
    height: 312
    layer: 0
    color: "#E0142033"
    border: "#FF2DD4BF"
    border-width: 2

  title:
    type: text
    x: 48
    y: 48
    width: 544
    height: 30
    layer: 1
    text: "&6&l玩家状态"
    color: "#FFFBBF24"
    scale: 1.1
    align: center
```

## 顶层字段

::: warning 先记住这条
统一配置只保留一套 schema；不要把旧版本字段复制进新文件。旧字段会导致当前 GUI 被跳过，并在服务端日志中给出字段路径。
:::

| 字段 | 类型 | 说明 |
|---|---|---|
| `enable` | boolean | 是否启用，默认 `true`；示例默认关闭 |
| `id` | namespaced ID | GUI 唯一 ID，例如 `example:profile` |
| `type` | `hud` / `menu` | HUD 自动显示；MENU 由服务端打开 |
| `design` | mapping | 逻辑画布尺寸、锚点和背景 |
| `refresh` | mapping | 响应式刷新周期 |
| `state` | mapping | 变量声明 |
| `actions` | mapping | 服务端动作声明 |
| `events` | mapping | `open`、`tick`、`close` 生命周期动作 |
| `animations` | mapping | 有限 `alpha` / `scale` 动画 |
| `components` | mapping | 普通组件 |
| `navigation` | mapping | 菜单按钮的简写，最终会合并到组件树 |

## design 画布

```yaml
design:
  width: 640
  height: 360
  anchor: center
  background: "#B8000000"
```

`width` 和 `height` 是逻辑设计尺寸，合法范围为 `1..4096`。客户端会按照窗口大小等比缩放整个画布。

支持的锚点：

```text
top-left       top-center       top-right
center-left    center            center-right
bottom-left    bottom-center     bottom-right
```

背景颜色支持：

```text
#RRGGBB
#AARRGGBB
```

例如：

```yaml
background: "#00000000" # 完全透明
background: "#80000000" # 半透明黑色
background: "#FF000000" # 不透明黑色
```

## refresh 刷新周期

```yaml
refresh:
  interval-ticks: 10
```

合法范围为 `0..1200` tick：

- `0`：不按周期执行 `tick` 事件。
- `10`：每 10 tick 执行一次 `tick` 事件和动态求值。
- 动画会由服务端按 tick 推进，不依赖 `refresh.interval-ticks` 才能开始。

## state 变量

```yaml
state:
  variables:
    player_name:
      scope: server
      type: string
      source: "%player_name%"

    health:
      scope: server
      type: decimal
      source: "%player_health%"

    max_health:
      scope: server
      type: decimal
      source: "%player_max_health%"

    page:
      scope: view
      type: integer
      default: 0
```

支持类型：

```text
boolean
integer
decimal
string
color
```

支持的作用域：

| scope | 当前用途 |
|---|---|
| `constant` | 配置中的固定值 |
| `server` | 由服务端或 PlaceholderAPI 解析 |
| `view` | 当前打开 GUI 的临时状态，可由 `set-variable` 修改 |
| `player` | 预留的玩家级作用域，当前不提供本地持久化保证 |
| `client` | 预留的客户端作用域，不能由客户端直接提交业务状态 |

当前最稳定的动态来源是 `server` 和 `view`。使用 PlaceholderAPI 来源时，需要在 Paper 服务端安装并启用 PlaceholderAPI。

## 表达式

字符串以 `=` 开头时会作为受限表达式编译：

```yaml
components:
  health:
    type: progress
    progress: "=clamp(health / max_health, 0, 1)"

  title:
    type: text
    text: "=concat('&e玩家：', player_name)"
```

允许函数：

```text
min
max
clamp
round
floor
ceil
abs
lerp
if
concat
format
```

示例：

```yaml
visible: "=health > 0"
text: "=if(health > 0, '&a存活', '&c死亡')"
```

表达式会限制节点数、深度、参数数量、字符串长度和源文本长度。以下能力明确禁止：

- 任意脚本或 Kether
- 反射和 `Class.forName`
- 网络请求、URL、剪贴板
- 客户端命令或控制台命令
- 客户端自由发包
- 任意客户端状态修改

## 组件

::: tip 选择哪种 GUI 能力？
仅需进服后显示一段临时文字或图片时，可以继续使用 `modules/hud.yml`；需要完整画布、菜单按钮、变量、生命周期或动画时，使用本页的统一 GUI 配置。
:::

### panel

```yaml
frame:
  type: panel
  x: 24
  y: 24
  width: 592
  height: 312
  layer: 0
  color: "#E0142033"
  border: "#FF2DD4BF"
  border-width: 2
```

### text / label

```yaml
title:
  type: text
  x: 48
  y: 48
  width: 544
  height: 30
  layer: 1
  text: "&6&l玩家状态"
  color: "#FFFBBF24"
  scale: 1.1
  shadow: true
  align: center
```

`align` 支持：

```text
left
center
right
```

### texture / image

```yaml
icon:
  type: image
  x: 80
  y: 80
  width: 32
  height: 32
  layer: 1
  texture: "soulcore:textures/gui/icon.png"
  alpha: 0.8
```

纹理只发送资源 ID，不由 Paper 传输图片。图片必须存在于客户端：

```text
.minecraft/resourcepacks/soulcore/
```

### progress / bar

```yaml
health:
  type: progress
  x: 96
  y: 120
  width: 448
  height: 12
  layer: 1
  progress: "=clamp(health / max_health, 0, 1)"
  background: "#FF1E293B"
  color: "#FF22C55E"
  direction: left-to-right
```

`direction` 支持：

```text
left-to-right
right-to-left
top-to-bottom
bottom-to-top
```

### button

按钮只能用于 `menu`，HUD 不能放按钮：

```yaml
close_button:
  type: button
  x: 356
  y: 286
  width: 128
  height: 30
  layer: 2
  text: "&c关闭"
  action: close
```

按钮支持鼠标、Tab、方向键、Enter 和 Space。客户端只上报按钮元素 ID，动作由服务端重新校验。

## actions 动作

### close

```yaml
actions:
  close:
    type: close
```

### refresh

```yaml
actions:
  refresh:
    type: refresh
```

### open-gui

```yaml
actions:
  open_profile:
    type: open-gui
    gui: example:profile
```

目标必须是当前已启用的 `menu`。

### set-variable

只能修改 `scope: view` 变量：

```yaml
state:
  variables:
    page:
      scope: view
      type: integer
      default: 0

actions:
  next_page:
    type: set-variable
    variable: page
    value: 1
```

### server-action

```yaml
actions:
  claim_reward:
    type: server-action
    handler: example:claim_reward
```

Handler 必须由 Paper 插件代码注册。客户端不能提交 Handler 名称、命令文本或任意参数。

## events 生命周期

```yaml
events:
  open: [refresh]
  tick: [refresh]
  close: [refresh]
```

支持：

- `open`：GUI 成功打开后执行。
- `tick`：按 `refresh.interval-ticks` 执行。
- `close`：GUI 被关闭、替换或 view 失效时执行。

事件只能引用已声明的 action，并有递归深度与动作数量限制。

## animations 动画

当前只支持服务端推进的有限线性动画：

```yaml
animations:
  title_scale:
    target: title
    property: scale
    from: 1.0
    to: 1.2
    duration-ticks: 10

  icon_fade:
    target: icon
    property: alpha
    from: 0.0
    to: 1.0
    duration-ticks: 10
```

限制：

- `alpha` 范围 `0..1`，只能作用于图片。
- `scale` 范围 `0.1..8`，只能作用于文本。
- `duration-ticks` 范围 `1..1200`。
- 服务端计算插值，通过 revision patch 发送给客户端。
- 客户端不执行动画脚本。

## 命令与重载

打开菜单：

```text
/soulcore gui <玩家> <id>
```

权限：

```text
soulcore.gui
```

重载：

```text
/soulcore reload
```

GUI reload 失败时保留上一份有效配置；单个文件无效时跳过该文件并记录字段路径。

## 协议与安全

交互菜单使用 session、view UUID、递增 sequence 和每玩家限流保护：

- 旧 view 的输入会被拒绝。
- 重复或倒退 sequence 会被拒绝。
- 每玩家默认每秒最多 8 次 GUI 操作，可配置范围为 `1..50`。
- 未协商 `GUI_INTERACTIONS` 的旧客户端不会收到交互按钮菜单。
- 未协商 `GUI_REACTIVE` 时，统一文档可降级为静态快照。
- 未知 patch opcode、非法属性、越界数值和尾随数据会拒绝整条消息。

## 当前不支持

以下 DragonCore 高级能力当前不支持：

- `textbox`
- `slot`
- `entity`
- 滚动容器和拖拽
- 任意 Functions/Kether 脚本
- 模拟槽位点击或删除物品
- URL、网络请求、剪贴板
- 关闭游戏或修改客户端自由状态

## 旧配置迁移

旧 GUI 如果包含以下字段，需要手动迁移：

```text
version
kind
theme
style
title
```

迁移原则：

| 旧写法 | 新写法 |
|---|---|
| `kind: menu` | `type: menu` |
| 顶层 `title` | `components.title`，类型为 `text` |
| `theme` | 直接在组件中写 `color`、`border`、`scale` 等字段 |
| `style` | 把样式字段复制到对应组件 |
| `version: 1/2/3` | 删除字段 |
| `navigation` | 可以保留，最终按 button 组件解析 |

旧字段不会静默兼容，迁移后执行：

```text
/soulcore reload
```

## 相关页面

- [安装](/guide/installation)
- [命令与权限](/guide/commands)
- [常见问题](/faq)
- [构建与发布](/guide/building)
