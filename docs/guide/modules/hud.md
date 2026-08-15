# HUD 文本与图片

服务端在玩家进服时自动下发屏幕上的文本或图片元素，也可以由管理员手动触发。配置位于 `plugins/SoulCore/modules/hud.yml`。

**模块状态**：服务端 · 依赖：客户端 Mod + effects 协议通道

## 工作原理

- 玩家进服完成握手后，`hud.yml` 中 `enable: true` 的条目自动发送。
- `enable: false` 的条目需要 OP 用 `/soulcore hud <玩家> <id>` 手动发送。
- 需要 `config.yml` 中 `modules.hud-text` / `modules.hud-images` 与 `protocol.effects-channel-enabled` 均为 `true`。

## 文本条目

```yaml
welcome_message:
  enable: true
  type: text
  text:
    - "欢迎来到服务器"
    - "第二行文本"
  anchor: top-center
  x: 0
  y: 10
  argb: -256
  scale: 1.5
  shadow: true
  priority: 10
  duration-ticks: 100
```

### 字段

| 字段 | 默认值 | 说明 |
|---|---|---:|
| `enable` | `true` | 是否进服自动发送 |
| `type` | - | `text` 表示文本条目 |
| `text` | - | 文本行列表；多行会逐行展开，每行向下偏移一个行高 |
| `anchor` | - | 屏幕锚点，见下方取值 |
| `x` / `y` | `0` | 相对锚点的偏移（GUI 像素） |
| `argb` | - | 颜色，ARGB 整数（如 `-256` 为不透明白色） |
| `scale` | `1.0` | 文本缩放 |
| `shadow` | `false` | 是否绘制阴影 |
| `priority` | `0` | 绘制优先级 |
| `duration-ticks` | - | 显示时长（tick） |

## 图片条目

```yaml
spawn_banner:
  enable: true
  type: texture
  texture: hud/spawn_banner.png
  anchor: top-right
  x: -10
  y: 10
  width: 64
  height: 32
  alpha: 1.0
  scale: 1.0
  layer: 0
  duration-ticks: 200
```

### 字段

| 字段 | 默认值 | 说明 |
|---|---|---:|
| `type` | - | `texture` 表示图片条目 |
| `texture` | - | 客户端 `resourcepacks/soulcore/` 下的图片路径 |
| `width` / `height` | - | 图片显示尺寸（GUI 像素） |
| `alpha` | `1.0` | 不透明度，`0.0` 至 `1.0` |
| `layer` | `0` | 图层顺序（数值大者在上） |

## anchor 取值

| 值 | 位置 |
|---|---|
| `top-left` / `top-center` / `top-right` | 顶部左/中/右 |
| `center-left` / `center` / `center-right` | 中部左/中/右 |
| `bottom-left` / `bottom-center` / `bottom-right` | 底部左/中/右 |

## 相关命令

| 命令 | 说明 |
|---|---|
| `/soulcore hud <玩家> <id>` | 向指定玩家手动发送一个 HUD 条目 |
| `/soulcore effect clear <玩家> <effectId>` | 清除指定玩家的某个 HUD 效果 |

## 相关

- [总控配置](/faq) —— `config.yml` 模块开关
- [Tooltip 增强](/guide/modules/tooltip) · [粒子效果](/guide/modules/particles)
