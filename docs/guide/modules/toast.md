# Toast 消息悬浮条

Toast 模块把匹配到的聊天消息转换成屏幕中央的悬浮条显示。

配置文件：

```text
plugins/SoulCore/modules/toast.yml
```

功能开关：

```yaml
features:
  center-toast: true
```

修改后执行：

```text
/soulcore reload
```

## 最小配置

```yaml
strip-keyword: false
scale: 0.85
vertical-offset: -50

toasts:
  - "【系统】"
  - "【消息】"
```

命中这些关键字的消息会从聊天栏改为屏幕中央悬浮条显示。匹配使用消息纯文本，颜色代码不影响匹配；实际显示仍保留服务端发送的颜色和样式。

## 全局字段

| 字段 | 说明 |
|---|---|
| `strip-keyword` | 是否从显示文本中移除匹配关键字 |
| `scale` | 全局文字缩放，范围 `0.1..8.0` |
| `vertical-offset` | 相对屏幕中心的垂直偏移，负值向上 |
| `toasts` | 关键字字符串或带详细设置的规则列表 |

## 简单规则

```yaml
toasts:
  - "【系统】"
  - "【消息】"
```

字符串规则使用默认匹配模式和默认外观。

## 详细规则

```yaml
toasts:
  - keyword: "【公告】"
    mode: prefix
    strip-keyword: true
    duration-ticks: 60
    background: "#B0101010"
    vertical-offset: -40
    scale: 1.0
    shadow: true
```

字段说明：

| 字段 | 说明 |
|---|---|
| `keyword` | 要匹配的关键字 |
| `mode` | `prefix` 匹配开头；`contains` 匹配任意位置 |
| `strip-keyword` | 覆盖全局设置 |
| `duration-ticks` | 显示时长，范围 `1..1200`；默认约 60 tick |
| `background` | `#AARRGGBB` 或 `#RRGGBB` 背景色 |
| `vertical-offset` | 覆盖全局垂直偏移 |
| `scale` | 覆盖全局文字缩放，范围 `0.1..8.0` |
| `shadow` | 是否绘制文字阴影 |

## 显示限制

- 最多同时显示 4 条。
- 超出时最旧的一条会被移除。
- 最后一段会进行约 0.4 秒淡出。
- 匹配的是纯文本，颜色码不影响关键字判断。
- 显示文本会保留原始 legacy `&`/`§` 颜色和格式。

## 相关页面

- [HUD 文本与图片](/guide/modules/hud)
- [命令与权限](/guide/commands)
- [安装](/guide/installation)

## 常见问题

### 消息没有转换成 Toast

1. 确认 `features.center-toast: true`。
2. 确认关键字与消息纯文本匹配。
3. `prefix` 只匹配开头；需要匹配中间文字时使用 `contains`。
4. 修改后执行 `/soulcore reload`。
5. 确认客户端已安装兼容版本的 SoulCore NeoForge Mod。

### 文字位置或大小不对

优先检查全局和单条规则的 `scale`、`vertical-offset`。单条规则会覆盖全局值。
