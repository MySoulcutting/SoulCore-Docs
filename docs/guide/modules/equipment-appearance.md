# 装备外观

按物品匹配规则为装备应用自定义外观纹理，与物品图片功能类似，但作用于装备的显示外观。配置位于 `plugins/SoulCore/modules/armor.yml`。

**模块状态**：服务端下发规则 + 客户端渲染 · 依赖：客户端 Mod + equipment_appearance 协议通道

## 工作原理

- 玩家进服完成握手后，装备外观规则自动发送。
- 客户端根据匹配规则为符合条件的物品应用外观纹理。
- 需要 `config.yml` 中 `modules.equipment-appearance` 与 `protocol.equipment-appearance-channel-enabled` 均为 `true`。

## 配置示例

```yaml
魔法盔甲:
  match:
    name: "XXX"
    lore: "XXX"
    nbt:
      key: value
  texture: equipment/legendary_blade.png
```

## 字段

| 字段 | 说明 |
|---|---|
| `match.material` | 物品注册 ID（可省略 `minecraft:`） |
| `match.name` | 完整物品名称精确匹配 |
| `match.lore` | 任意一行 Lore 精确匹配 |
| `match.name-regex` | 完整物品名称正则匹配 |
| `match.lore-regex` | 任意一行 Lore 正则匹配 |
| `match.nbt` | NBT 条件（同物品图片，支持嵌套路径与列表索引） |
| `texture` | 客户端 `resourcepacks/soulcore/` 下的外观纹理路径 |
| `model` | 可选：GeckoLib `.geo.json` 模型 |
| `animations` | 可选：GeckoLib `.animation.json` 动画 |
| `glow-texture` | 可选：发光层 PNG |

## 匹配规则

- 每条规则的 `match` 中至少需要一种匹配方式。
- 填写多个匹配条件时，所有条件都必须满足。
- 外观纹理放在客户端 `resourcepacks/soulcore/` 下（同物品图片目录）。

## 限制

- 装备外观 Manifest 最多包含 512 条规则（受 `config.yml` 的 `limits.max-appearance-rules` 控制）。

## 相关

- [物品图片](/guide/modules/item-images) —— 相似的匹配规则语法
- [服务端按键](/guide/modules/keybinds) · [HUD 文本与图片](/guide/modules/hud)
