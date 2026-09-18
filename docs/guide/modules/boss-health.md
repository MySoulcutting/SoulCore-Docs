# Boss 多管血条

SoulCore 的 Boss Health 使用独立规则文件：

```text
plugins/SoulCore/modules/boss_health.yml
```

功能开关：

```yaml
features:
  monster-health: true
```

Boss Health 与普通怪物血条共享 `monster-health` 能力开关，但使用独立规则和多管血条布局。

## 最小配置

```yaml
abyss_lord:
  priority: 100
  match:
    name:
      - "深渊领主"

  x: 0
  y: 18
  scale: 1.0
  stack-spacing: 46
  display-distance: 32.0
  health-per-bar: 0.0
  damage-animation-ticks: 10.0

  background:
    texture: gui/boss/default.png
    x: 0
    y: 0
    width: 202
    height: 26

  bar-background:
    texture: gui/boss/bar-background.png
    x: 10
    y: 11
    width: 182
    height: 5

  bars:
    - texture: gui/boss/progress1.png
      x: 10
      y: 11
      width: 182
      height: 5
```

纹理必须由客户端提供：

```text
.minecraft/resourcepacks/soulcore/gui/boss/
```

## 匹配规则

Boss 规则按优先级匹配实体：

```yaml
match:
  entity-type:
    - minecraft:zombie
  name:
    - "深渊领主"
  name-regex:
    - "^深渊领主.*$"
  tag:
    - boss:abyss_lord
```

实际可用条件以 `boss_health.yml` 和服务端加载日志为准。至少配置一个有效匹配条件。

## 布局字段

| 字段 | 说明 |
|---|---|
| `priority` | 数值越大越优先 |
| `x` / `y` | 相对实体血条位置的 GUI 偏移 |
| `scale` | 整体缩放 |
| `stack-spacing` | 多个 Boss Health 实例的垂直间距 |
| `display-distance` | 显示距离，单位为方块 |
| `health-per-bar` | 每管代表的生命值；`0` 表示按 `bars` 数量平均分配 |
| `damage-animation-ticks` | 伤害残影追赶时长 |

当 `health-per-bar` 大于 `0` 时，最大生命值会自动换算为多管；颜色/纹理按 `bars` 循环使用。

## 背景、血条和文本

### background

```yaml
background:
  texture: gui/boss/default.png
  x: 0
  y: 0
  width: 202
  height: 26
```

### bar-background

```yaml
bar-background:
  texture: gui/boss/bar-background.png
  x: 10
  y: 11
  width: 182
  height: 5
```

### bars

```yaml
bars:
  - texture: gui/boss/progress1.png
    x: 10
    y: 11
    width: 182
    height: 5
  - texture: gui/boss/progress2.png
    x: 10
    y: 11
    width: 182
    height: 5
```

### 文本

```yaml
name:
  text: "&5{name}"
  x: 0
  y: -30
  scale: 1.15

health-value:
  text: "&f{health} / {max-health}"
  x: 0
  y: -8
  scale: 1.0

phase-label:
  text: "&e{remaining-bars}"
  x: 115
  y: -38
  scale: 1.0
```

支持占位符：

```text
{name}
{health}
{max-health}
{remaining-bars}
```

文本支持 `&` 和 `§` 颜色/格式码。

## 生命周期与限制

- 超出 `display-distance` 不渲染。
- 实体死亡、卸载、切换世界、断线和重载时清理客户端状态。
- Paper 只发送规则和资源路径，不发送图片文件。
- 修改后执行 `/soulcore reload`。

## 相关页面

- [怪物血条](/guide/modules/monster-health)
- [实体模型](/guide/modules/entity-model)
- [安装](/guide/installation)

## 常见问题

### Boss 血条不显示

1. 确认 `features.monster-health: true`。
2. 确认实体名称或类型与 `match` 完全匹配。
3. 确认客户端资源路径存在。
4. 确认实体距离在 `display-distance` 内。
5. 查看服务端日志是否跳过了非法规则。
