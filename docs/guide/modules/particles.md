# 粒子效果

::: danger 未测试功能
该功能尚未进行测试，可能存在 bug，请谨慎使用。
:::

服务端在玩家进服时自动在指定坐标生成粒子效果。配置位于 `plugins/SoulCore/modules/particles.yml`。

**模块状态**：服务端 · 依赖：客户端 Mod + effects 协议通道

## 工作原理

- 玩家进服完成握手后，所有条目自动发送。
- 需要 `config.yml` 中 `modules.particles` 与 `protocol.effects-channel-enabled` 均为 `true`。

## 配置示例

```yaml
spawn_sparkle:
  particle-id: minecraft:end_rod
  x: 0.5
  y: 65.0
  z: 0.5
  offset-x: 0.3
  offset-y: 0.3
  offset-z: 0.3
  speed: 0.05
  count: 40
```

## 字段

| 字段 | 说明 |
|---|---|
| `particle-id` | 粒子类型 ID（如 `minecraft:end_rod`） |
| `x` / `y` / `z` | 粒子坐标 |
| `offset-x` / `offset-y` / `offset-z` | 各轴偏移量 |
| `speed` | 粒子速度 |
| `count` | 粒子数量 |

## 限制

- 单次粒子事件最多生成 128 个粒子（受 `config.yml` 的 `limits.max-particle-count` 控制）。
- 每名玩家每秒最多接收 40 个效果事件（受 `limits.max-events-per-player-per-second` 控制）。

## 相关

- [HUD 文本与图片](/guide/modules/hud) · [Tooltip 增强](/guide/modules/tooltip)
