# 装备外观

按物品匹配规则为装备应用自定义外观纹理，与物品图片功能类似，但作用于装备的显示外观。配置位于 `plugins/SoulCore/modules/armor.yml`。

**模块状态**：服务端下发规则 + 客户端渲染 · 依赖：客户端 Mod + equipment_appearance 协议通道

## 工作原理

- 玩家进服完成握手后，装备外观规则自动发送。
- 客户端根据匹配规则为符合条件的物品应用外观纹理。
- 需要 `config.yml` 中 `features.equipment-appearance: true`；客户端能力协商决定是否接收装备外观规则。

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
| `texture` | 客户端 `resourcepacks/soulcore/` 下的外观纹理路径；也可填写路径列表 |
| `model` | 可选：GeckoLib 可解析的 `.json` 模型，不强制使用 `.geo.json` 文件名 |
| `animations` | 可选：GeckoLib `.animation.json` 动画 |
| `glow-texture` | 可选：发光层 PNG |

`texture` 可以是单一路径，也可以按“基础纹理、overlay”顺序填写最多两个路径：

```yaml
texture:
  - equipment/legendary_blade.png
  - equipment/legendary_blade_overlay.png
```

第二项会作为 overlay 层；不需要 overlay 时只填写第一项。

## 匹配规则

- 每条规则的 `match` 中至少需要一种匹配方式。
- 填写多个匹配条件时，所有条件都必须满足。
- 外观纹理、模型与动画放在客户端 `resourcepacks/soulcore/` 下，与物品图片共用内置的 `SoulCore Resources` 资源包。
- `model` 不接受 Blockbench `.bbmodel` 工程文件；请先导出为 GeckoLib 可解析的 JSON。

## 限制

- 装备外观 Manifest 最多包含 512 条规则（受 `config.yml` 的 `limits.max-appearance-rules` 控制）。

## 相关

- [物品图片](/guide/modules/item-images) —— 相似的匹配规则语法
- [服务端按键](/guide/modules/keybinds) · [HUD 文本与图片](/guide/modules/hud)
