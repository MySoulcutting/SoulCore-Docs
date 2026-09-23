# 统一 GUI 配置

::: tip 快速定位
本页按「先跑起来 → 再做动态 → 最后做安全与迁移」组织。第一次配置只需要看[最小配置](#最小配置)、[组件](#组件)和[命令与重载](#命令与重载)。
:::

SoulCore 1.5.3 的 GUI 使用一套统一配置协议。它参考 DragonCore 的变量、组件、事件和表达式组织方式，但所有业务动作仍由 Paper 服务端授权执行，客户端只负责渲染和回传交互元素 ID。

::: tip 更新至 1.5.3 版本
自 1.5.3 版本起支持客户端运行时布局表达式、屏幕尺寸变量、组件属性引用、相对纹理路径、按组件类型推导默认 `layer`，以及原版/特殊槽位的混合交互保护。
:::

::: tip 更新至 1.5.3-fix-2 版本
背包界面改为统一 GUI 架构：`gui/inventory.yml` 负责界面，`modules/slots.yml` 负责槽位规则，两边用 `slot-id` 关联；根目录的 `inventory.yml` 不再被读取。GUI 文本组件同时支持 `§x` 十六进制颜色码。详见[背包槽位](/guide/modules/slots)。
:::

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

需要原版背包布局和槽位交互时使用：

```yaml
type: inventory
```

`inventory` 只允许由服务端打开，客户端会启用混合背包交互和鼠标手持物品渲染。

背包界面同时依赖 `modules/slots.yml`：`gui/inventory.yml` 里的每个 `slot` 组件通过 `slot-id` 关联该文件中的同名规则，界面只负责位置和尺寸，物品限制、只读状态和拒绝提示都由槽位规则决定。字段、必填槽位和迁移方式见[背包槽位](/guide/modules/slots)。

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
| `type` | `hud` / `menu` / `inventory` | HUD 自动显示；MENU/INVENTORY 由服务端打开 |
| `design` | mapping，可省略 | 逻辑画布尺寸、锚点和背景；省略时使用客户端当前 GUI 屏幕尺寸，坐标原点默认为左上角（自 1.5.3 版本起支持） |
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

`design` 可以省略。自 1.5.3 版本起，省略时客户端使用当前 GUI 屏幕尺寸作为逻辑画布尺寸，坐标原点默认为左上角；保留旧配置中的 `design` 时仍按显式设计尺寸和锚点布局。

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

当前最稳定的动态来源是 `server` 和 `view`。客户端运行时屏幕变量和组件属性引用由客户端求值，不应作为服务端业务状态来源。使用 PlaceholderAPI 来源时，需要在 Paper 服务端安装并启用 PlaceholderAPI。

## 表达式

自 1.5.3 版本起，支持客户端运行时表达式绑定。数值属性可以直接写表达式，不要求使用 `=` 前缀；保留 `=` 前缀的旧写法仍兼容：

```yaml
components:
  health:
    type: progress
    progress: "clamp(health / max_health, 0, 1)"

  title:
    type: text
    text: "=concat('&e玩家：', player_name)"
```

客户端运行时表达式支持以下屏幕变量：

| 变量 | 含义 |
|---|---|
| `w` | 当前 GUI 逻辑宽度 |
| `h` | 当前 GUI 逻辑高度 |
| `screen_width` | 客户端窗口物理宽度 |
| `screen_height` | 客户端窗口物理高度 |
| `gui_scale` | 客户端 GUI 缩放因子 |
| `current_time` | 客户端当前时间值，可用于随时间变化的显示属性 |

表达式也可以引用已声明组件的属性，例如 `background.width`、`background.x`。窗口尺寸变化时，客户端会重新计算这些绑定并更新布局；服务端仍保留静态值作为不支持运行时绑定客户端的 fallback。

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

除非显式填写 `layer`，组件会使用按类型定义的默认层级。自 1.5.3 版本起默认值如下：

| 组件类型 | 默认 `layer` |
|---|---:|
| `panel` / `rect` | `0` |
| `texture` / `image` | `0` |
| `progress` / `bar` | `1` |
| `entity` | `1` |
| `text` / `label` | `2` |
| `button` | `3` |
| `slot` | `3` |
| `textbox` | `3` |

显式填写的 `layer` 始终优先。

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

`text` 里的 `&` 颜色与格式码按原版规则解析，并保留显式换行。需要精确颜色时可以直接写十六进制颜色码：

```yaml
text: "§x§2§D§D§4§B§F自定义颜色"
```

`§x` 后必须紧跟 6 组 `§` + 十六进制字符，依次表示 RRGGBB；解析失败时按普通文本显示。组件级 `color` 只作为没有内嵌颜色码时的默认颜色。

### texture / image

自 1.5.3 版本起，纹理可以直接写资源包中的相对路径：

```yaml
icon:
  type: image
  x: 80
  y: 80
  width: 32
  height: 32
  texture: "gui/icon.png"
  alpha: 0.8
```

它对应客户端资源：

```text
.minecraft/resourcepacks/soulcore/gui/icon.png
```

旧的 `soulcore:textures/...` 写法仍兼容。纹理只发送资源 ID，不由 Paper 传输图片；图片必须存在于客户端资源包中。

### progress / bar

```yaml
health:
  type: progress
  x: 96
  y: 120
  width: 448
  height: 12
  layer: 1
  progress: "clamp(health / max_health, 0, 1)"
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

按钮只能用于 `menu` 或 `inventory`，HUD 不能放按钮：

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

### entity

自 1.5.3 版本起，`entity` 支持玩家预览和任意可解析的实体类型预览：

```yaml
preview:
  type: entity
  x: 92
  y: 88
  width: 100
  height: 150
  entity: player
  follow-mouse: true
  scale: 1.0
  interactive: true
  click-action: inspect
```

实体组件只能用于 `menu` 或 `inventory`。`interactive: true` 时，客户端只上报实体组件 ID 和实体 ID，服务端仍会重新校验对应的 `click-action`。响应式布局支持边界和 `scale` 更新；实体类型、角度、显示名和交互动作变化应通过新的完整快照生效。

### textbox

自 1.5.3 版本起，`textbox` 支持服务端定义的可编辑文本框，只能用于 `menu` 或 `inventory`：

```yaml
name_input:
  type: textbox
  x: 48
  y: 96
  width: 320
  height: 24
  placeholder: "请输入名称"
  value: ""
  max-length: 32
  input-mode: plain
  secret: false
  submit-action: submit_name
  cancel-action: cancel_name
```

- Enter 提交，Escape 取消；输入变化会回传服务端并参与下一次 reactive 编译。
- `input-mode` 支持 `plain`、`integer`、`decimal` 和 `identifier`。
- 文本框的当前值可以通过组件属性引用，例如 `name_input.value`。
- 服务端仍会校验长度、输入模式、session、view 和 sequence；action 不直接接收客户端参数。

### slot

自 1.5.3 版本起，`slot` 支持与原版背包槽位和特殊槽位混合显示：

```yaml
head:
  type: slot
  x: 52
  y: 120
  width: 24
  height: 24
  layer: 3
  slot-id: head
  click: true
```

| 字段 | 默认值 | 说明 |
|---|---|---|
| `slot-id` | 必填 | 关联 `modules/slots.yml` 的规则 ID，也是玩家背包槽位的内置 ID |
| `click` | `true` | 是否允许点击交互 |
| `read-only` | `false` | 只读时客户端不能取出或替换其中的物品 |
| `item-id` / `item-count` / `display-name` / `lore` / `custom-model-data` | 取自槽位状态 | 可作为没有服务端槽位数据时的静态回退值 |

- `type: inventory` 中必须包含 15 个必填特殊槽位；缺少时 GUI 仍会加载，但服务端会记录 `[背包] inventory rule mismatch` 并拒绝打开。
- 玩家背包和快捷栏槽位使用内置 ID，不需要在 `modules/slots.yml` 中声明规则，也不占用数据库。
- 详细的槽位规则、必填 ID 清单和旧字段迁移见[背包槽位](/guide/modules/slots)。

槽位交互按组件层级命中 tooltip，并遵循以下保护规则：

- 鼠标手持物品时，不显示任何槽位 tooltip。
- 特殊槽位中的物品不会覆盖鼠标当前手持物品。
- 多个槽位重叠时，tooltip 命中按 `layer` 从高到低处理。

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

目标必须是当前已启用的 `menu` 或 `inventory`。

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

- 滚动容器和拖拽
- 任意 Functions/Kether 脚本
- 模拟槽位点击或删除物品
- URL、网络请求、剪贴板
- 关闭游戏或修改客户端自由状态

## 更新记录

### 更新至 1.5.3-fix-2 版本

- 背包界面统一到 GUI 架构：`type: inventory` 的布局、标题和组件全部写在 `gui/inventory.yml`；根目录的 `inventory.yml` 不再被读取，其中的 `enable`、`title`、`rows`、`buttons`、`examples` 全部失效。
- `slot` 组件通过 `slot-id` 与 `modules/slots.yml` 的规则关联，不再使用数字 `inventory-slot` 映射；槽位拒绝提示改由 `slots.yml` 的 `slot-reject-message` 配置。
- 文本组件新增 `§x` 十六进制颜色码解析，可精确控制单个文本片段的颜色。

### 更新至 1.5.3 版本

- 新增客户端运行时布局表达式：支持屏幕尺寸变量、组件属性引用，并在窗口尺寸变化时重新计算布局。
- `design` 可以省略；省略时使用客户端当前 GUI 屏幕尺寸和左上角坐标原点。
- 纹理支持 `gui/pet.png` 等相对路径，并兼容旧的 `soulcore:textures/...` 写法。
- 组件未显式设置 `layer` 时按组件类型使用默认层级。
- 修复混合背包中的槽位 tooltip 和手持物品覆盖问题。
- 补齐 `entity`、`textbox` 的基础交互与响应式边界/值更新，并让别名组件参与属性表达式检查。

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

- [背包槽位](/guide/modules/slots) —— `gui/inventory.yml` 与 `modules/slots.yml` 的规则
- [安装](/guide/installation)
- [命令与权限](/guide/commands)
- [常见问题](/faq)
- [构建与发布](/guide/building)
