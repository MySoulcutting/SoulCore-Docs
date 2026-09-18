# 实体模型

SoulCore 支持服务端下发实体模型规则，NeoForge 客户端负责加载本地模型、纹理和动画资源。

配置文件：

```text
plugins/SoulCore/modules/entity_model.yml
```

功能开关：

```yaml
features:
  entity-models: true
```

默认配置中该功能通常关闭，启用后执行 `/soulcore reload`。

## 资源边界

Paper 只发送规则和资源路径，不发送模型、纹理或动画文件。每个客户端需要准备：

```text
.minecraft/resourcepacks/soulcore/
```

SoulCore 直接兼容 MythicMobs 的 `model`、`state`、`defaultstate` 机制，不要求安装 ModelEngine。模型资源可以使用 GeckoLib 可解析的 JSON/资源格式；项目默认示例也保留 `.bbmodel` 路径用于旧配置参考，但客户端最终必须能解析实际资源。

## 最小配置

```yaml
example_zombie:
  priority: 0
  match:
    entity-type: minecraft:zombie
  model: models/entity/zombie.bbmodel
  idle-animation: animation.zombie.idle
  walk-animation: animation.zombie.walk
  scale: 1.0
  offset-y: 0.0
  render-name: true
  shadow: true
```

## 匹配条件

```yaml
match:
  entity-type: minecraft:zombie
  tag: mythicmob:nightharrow_wendigo
```

`match` 用于实体自动匹配。如果只通过 MythicMobs 的 `model{mid=...}` 或 `modelid` 直接绑定，可以省略自动匹配部分。

规则根键会作为模型 ID 使用。例如：

```yaml
nightharrow_wendigo:
  model: mobs/nightharrow_wendigo/nightharrow_wendigo.geo.json
```

MythicMobs 中可以使用：

```text
model{mid=nightharrow_wendigo} @self
```

## 视觉字段

| 字段 | 说明 |
|---|---|
| `priority` | 匹配优先级，数值越大越先处理 |
| `model` | 模型资源路径 |
| `texture` | 模型纹理路径，部分模型配置需要提供 |
| `animations` | 动画 JSON 路径 |
| `idle-animation` | 默认待机动画名 |
| `walk-animation` | 移动动画名 |
| `scale` | 模型缩放 |
| `offset-y` | 模型垂直偏移 |
| `render-name` | 是否渲染实体名称 |
| `shadow` | 是否显示模型阴影 |

## 碰撞盒

```yaml
collision-box:
  enabled: true
  width: 1.35
  height: 3.80
  offset-x: 0.0
  offset-y: 0.0
  offset-z: 0.0
```

碰撞盒用于服务端/客户端实体模型的空间边界和相关显示定位。修改后需要重载配置并重新绑定模型。

## MythicMobs 状态与动画

状态参数会同步到客户端：

```text
state{s=combo1;li=5;lo=5;speed=<random.float.0.9to1.3>} @self
defaultstate{t=walk;s=run;li=5;lo=5} @self
model{mid=nightharrow_wendigo;remove=true} @self
```

其中 `li`、`lo` 使用 tick；`speed`、`priority`、`loop`、`override`、`merge` 等参数由服务端规则和协议约束。

## 生命周期

- 模型绑定、清除、部件可见性、动画和默认状态均由服务端下发。
- 玩家死亡/复活、实体重建或客户端世界重建期间，客户端会保留短暂模型状态，等待服务端重新同步。
- 玩家退出、切换服务器、session 重建和配置 reload 会清理旧模型状态。

## 相关页面

- [自定义物品图片](/guide/modules/item-images)
- [装备外观](/guide/modules/equipment-appearance)
- [Boss 多管血条](/guide/modules/boss-health)

## 常见问题

### 模型没有显示

1. 确认 `features.entity-models: true`。
2. 确认客户端资源路径和 JSON 文件存在。
3. 确认服务端安装了 MythicMobs（如果使用 MythicMobs 绑定）。
4. 确认模型 ID、`match` 条件和技能参数一致。
5. 修改后执行 `/soulcore reload`，重新触发模型绑定。

### 复活后模型暂时不可见

SoulCore 会在客户端玩家实体或世界重建期间暂停清理，等待服务端重新同步。如果长时间不恢复，请查看服务端和客户端日志，确认模型绑定事件是否重新触发。
