# 物品图层

物品图层模块为命中的物品叠加统一的背景层和前景层：

```text
背景 → 物品本体 → 前景
```

配置文件：

```text
plugins/SoulCore/modules/item_layers.yml
```

功能开关：

```yaml
features:
  item-images: true
```

Paper 只发送匹配规则和纹理路径，不发送 PNG 文件。客户端纹理目录为：

```text
.minecraft/resourcepacks/soulcore/
```

## 最小配置

```yaml
test-background:
  type: background
  texture: item-layers/test-background-opaque.png
  priority: 100
  match:
    material:
      - diamond_sword

test-foreground:
  type: foreground
  texture: item-layers/test-foreground.png
  priority: 100
  match:
    material:
      - diamond_sword
```

## 字段

| 字段 | 说明 |
|---|---|
| `type` | `background` 或 `foreground` |
| `texture` | 相对于客户端 `resourcepacks/soulcore/` 的 PNG 路径 |
| `priority` | 数值越大越优先；同优先级按文件顺序处理 |
| `match` | 物品匹配条件 |
| `scale` | 图层缩放 |
| `offset-x` | X 方向偏移 |
| `offset-y` | Y 方向偏移 |

## 匹配条件

同一字段中的多个值是 OR，不同字段之间是 AND：

```yaml
legendary-background:
  type: background
  texture: item-backgrounds/legendary.png
  priority: 100
  match:
    material:
      - diamond_sword
      - iron_sword
      - netherite_sword
    name:
      - "灵魂之刃"
      - "觉醒灵魂之刃"
```

可使用的匹配字段与物品图片规则保持一致，包括：

- `material`
- `name`
- `lore`
- `name-regex`
- `lore-regex`
- `nbt`

## 资源要求

- 图片必须由每个客户端本地提供。
- 建议背景使用不透明 PNG，避免透明边角出现缺口。
- 背景和前景应保持相同画布尺寸，通常使用 16×16 或 32×32。
- 模型物品也会使用相同的背景/前景层，不要为模型额外扩大图层边界。
- 修改本地 PNG 后执行：

```text
/soulcore-client reload
```

- 修改服务端规则后执行：

```text
/soulcore reload
```

## 常见问题

### 普通物品和模型物品背景大小不一致

确认背景与前景 PNG 的画布尺寸一致，并检查 `scale`、`offset-x`、`offset-y`。当前渲染器会让普通图片物品和模型物品共用统一图层范围。

### 图层没有显示

1. 确认 `features.item-images: true`。
2. 确认 `texture` 路径相对于 `resourcepacks/soulcore/`。
3. 确认物品满足 `match` 条件。
4. 执行服务端和客户端重载。
