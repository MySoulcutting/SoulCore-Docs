# 服务端按键

::: danger 未测试功能
该功能尚未进行测试，可能存在 bug，请谨慎使用。
:::

服务端定义自定义按键，客户端显示在按键设置中，并将按键事件上报给服务端。配置位于 `plugins/SoulCore/modules/keybinds.yml`。

**模块状态**：服务端 · 依赖：客户端 Mod + input 协议通道

## 工作原理

- 玩家进服完成握手后，所有按键定义自动发送。
- 需要 `config.yml` 中 `modules.server-keybinds` 与 `protocol.input-channel-enabled` 均为 `true`。
- 客户端收到定义后，在按键设置界面显示，玩家可以绑定或改键。

## 配置示例

```yaml
open_menu:
  display-name: 打开服务器菜单
  default-key: key.keyboard.g
  category: soulcore:default
skill_1:
  display-name: 技能 1
  default-key: key.keyboard.r
  category: soulcore:skills
```

## 字段

| 字段 | 说明 |
|---|---|
| `display-name` | 按键显示名称 |
| `default-key` | 默认按键（Minecraft 按键标识，如 `key.keyboard.g`） |
| `category` | 按键分类（命名空间 ID，如 `soulcore:default`） |

## 限制

- 单次最多下发 64 个按键定义（受 `config.yml` 的 `limits.max-keybind-definitions` 控制）。
- 每名玩家每秒最多上报 20 个按键事件（受 `limits.max-key-events-per-second` 控制）。

## 相关

- [装备外观](/guide/modules/equipment-appearance) · [HUD 文本与图片](/guide/modules/hud)
