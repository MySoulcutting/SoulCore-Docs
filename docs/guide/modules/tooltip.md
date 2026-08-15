# Tooltip 增强

::: danger 未测试功能
该功能尚未进行测试，可能存在 bug，请谨慎使用。
:::

服务端在玩家进服时下发规则，为物品 Tooltip 追加、前置或替换文本行。配置位于 `plugins/SoulCore/modules/tooltip-text.yml`。

**模块状态**：服务端 · 依赖：客户端 Mod + effects 协议通道

## 工作原理

- 玩家进服完成握手后，所有条目自动发送。
- 需要 `config.yml` 中 `modules.tooltip` 与 `protocol.effects-channel-enabled` 均为 `true`。

## 配置示例

```yaml
rare_hint:
  operation: append
  lines:
    - '&7来自 SoulCore 的提示'
    - '&6这是一件稀有物品'
  duration-ticks: 200
```

## 字段

| 字段 | 说明 |
|---|---|
| `operation` | `append`（追加）/ `prepend`（前置）/ `replace`（替换） |
| `lines` | 文本行列表，支持 `&` 颜色代码 |
| `duration-ticks` | 显示时长（tick） |

### operation 说明

| 值 | 行为 |
|---|---|
| `append` | 在 Tooltip 末尾追加指定行 |
| `prepend` | 在 Tooltip 开头插入指定行 |
| `replace` | 替换原有 Tooltip 内容 |

## 限制

- 单个 Tooltip 最多包含 16 行（受 `config.yml` 的 `limits.max-tooltip-lines` 控制）。
- 单行文本最多 512 个字符（受 `limits.max-text-characters` 控制）。

## 相关

- [HUD 文本与图片](/guide/modules/hud) · [粒子效果](/guide/modules/particles)
