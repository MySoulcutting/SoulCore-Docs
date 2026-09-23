# 背包槽位

背包槽位模块提供服务器权威的特殊装备槽与饰品槽：物品实际保存在服务端数据库中，客户端只负责渲染和回传交互。配置分为两个文件：

```text
plugins/SoulCore/gui/inventory.yml    # 界面布局、标题、组件位置
plugins/SoulCore/modules/slots.yml    # 槽位规则、物品限制、拒绝提示
plugins/SoulCore/database.yml         # 槽位数据存储
```

**模块状态**：服务端 · 依赖：客户端 Mod + `SLOTS` 能力

::: warning 1.5.3-fix-2 起的架构调整
根目录的 `plugins/SoulCore/inventory.yml` 已移除，插件不再读取其中的 `enable`、`title`、`rows`、`buttons`、`examples` 或 `slot-reject-message`。这些内容现在分别由 `gui/inventory.yml` 和 `modules/slots.yml` 承担。
:::

## 工作原理

- `gui/inventory.yml` 中的 `slot` 组件通过 `slot-id` 关联 `modules/slots.yml` 中的同名规则；`slot-id` 是两边唯一的关联键。
- `gui/inventory.yml` 只决定界面位置、尺寸和外观，物品白名单、数量上限、只读状态和拒绝提示都由 `modules/slots.yml` 决定。
- 玩家背包槽位（`player-main-*`、`player-hotbar-*`、`player-offhand`）使用内置 ID，不需要声明规则，直接读写玩家物品栏。
- `head`、`chest`、`legs`、`feet` 也映射到玩家原版护甲槽，但需要在 `slots.yml` 中声明规则才能限制可放入的物品。
- 其余声明了规则的槽位（饰品、合成槽、武器槽等）为数据库槽位，物品保存在 `database.yml` 配置的 SQLite 或 MySQL 中。
- 客户端未协商 `SLOTS` 能力时不会收到槽位数据，槽位为空且不可交互。

## 最小配置

先确认 `config.yml` 中 `features.gui: true`，再在 `modules/slots.yml` 声明规则：

```yaml
slot-reject-message: "&c该物品不符合槽位限制。"

weapon:
  label: "&c武器"
  placeholder-material: RED_STAINED_GLASS_PANE
  max-amount: 1
  whitelist:
    material:
      - DIAMOND_SWORD
      - NETHERITE_SWORD
```

然后在 `gui/inventory.yml` 中把界面槽位与规则关联：

```yaml
weapon:
  type: slot
  x: 150
  y: 120
  width: 24
  height: 24
  layer: 3
  slot-id: weapon
  click: true
```

改完执行：

```text
/soulcore reload
```

## slots.yml 字段

顶层除了槽位规则，还支持一个全局字段：

| 字段 | 默认值 | 说明 |
|---|---|---|
| `slot-reject-message` | `&c该物品不符合槽位限制。` | 物品不符合规则时发给玩家的提示，支持 `&` 颜色代码 |

每个槽位规则支持：

| 字段 | 默认值 | 说明 |
|---|---|---|
| `label` | 槽位 ID | 槽位显示名 |
| `placeholder-material` | `LIGHT_BLUE_STAINED_GLASS_PANE` | 空槽位占位物品 |
| `max-amount` | `1` | 单槽最大堆叠，范围 `1..64` |
| `read-only` | `false` | 只读槽位，客户端不能取出或替换物品 |
| `whitelist` | 无 | 物品白名单条件，至少需要一项 |
| `limits` | `{max-amount: <max-amount>}` | 数值上限表；内置校验只使用其中的 `max-amount` |
| `scripts` | 无 | 槽位脚本注册项，按 `equip`、`unequip` 等触发名绑定 |

`limits` 也可以写成槽位根节点的 `limit`（单数形式），两种写法等价。`limits` 支持映射或 `{name, value}` 列表；写成字符串列表时，每一项会按 `limit-0`、`limit-1` 的触发名注册为脚本。

`scripts` 与 `limit` 中的脚本只做解析和注册，实际执行交给注册了同名处理器的外部集成：

- `scripts` 下的 `equip`、`unequip` 等触发名不会参与内置校验，未接入集成时只是不执行。
- 以 `limit` 开头的触发名会在放入物品时参与校验。没有集成注册同名处理器时，这些脚本一律返回拒绝，该槽位会拒绝所有物品；不打算接入脚本时不要使用字符串形式的 `limit` 列表。

旧版 `slots.yml` 顶层的 `enable` 字段会被忽略，背包不再有独立开关；可用性由数据库状态和 `SLOTS` 能力协商决定。

## whitelist 匹配条件

`whitelist` 使用与物品图片一致的 `match` 风格字段名：

| 字段 | 说明 |
|---|---|
| `material` | 物品材质，可写单个值或列表；省略 `minecraft:` 命名空间 |
| `name` | 完整物品名称精确匹配 |
| `lore` | 任意一行 Lore 包含该字符串即命中 |
| `name-regex` | 完整物品名称正则匹配（Java `Pattern` 语法） |
| `lore-regex` | 任意一行 Lore 正则匹配 |
| `nbt` | 按 `PersistentDataContainer` 的 namespaced key 精确匹配标量值 |
| `allow-any` | 为 `true` 时接受任意非空物品，常用于真实合成输入槽 |

同一列表内的多个值是 OR，不同字段之间是 AND：

```yaml
ring-1:
  label: "&d戒指 1"
  max-amount: 1
  whitelist:
    material: AMETHYST_SHARD
    name-regex: "示例戒指.*"
```

等价写法：单值字段可以写标量，也可以写列表。

```yaml
head:
  whitelist:
    material:
      - DIAMOND_HELMET
      - NETHERITE_HELMET
```

::: warning 旧字段名不再兼容
`materials`、`names`、`lores`、`custom-model-data` 已经移除。插件遇到这些字段会报 `contains unsupported key ...` 并跳过该条规则，而不是按旧语义加载。
:::

## NBT 匹配

`nbt` 按 namespaced key 匹配物品 `PersistentDataContainer` 中的标量值，类型由 YAML 值的字面类型推断：

```yaml
weapon:
  label: "&c武器"
  max-amount: 1
  whitelist:
    material: DIAMOND_SWORD
    nbt:
      soulcore:grade: 3
      soulcore:bound: true
      soulcore:owner: "Steve"
```

| YAML 值 | 匹配类型 |
|---|---|
| 字符串 | `STRING`，精确匹配 |
| `true` / `false` | `BOOLEAN`，按 PDC 的 byte 标量比较 |
| 整数 | `BYTE` / `SHORT` / `INTEGER` / `LONG`，按写入时的标量类型精确匹配 |
| 小数 | `FLOAT` / `DOUBLE` |

同一个 `nbt` 映射内的多个条件需要全部满足。值必须是非空标量，写列表或嵌套映射会在加载时报错。这里与[自定义物品图片](/guide/modules/item-images)的 `match.nbt` 不同：物品图片使用 `custom_data` 的点路径匹配，槽位规则只做 PDC 标量精确匹配。

## 必填槽位

`type: inventory` 的 GUI 必须包含以下特殊槽位，缺少任意一个都会导致 GUI 无法打开（服务端记录 `[背包] inventory rule mismatch`，玩家收到「背包配置不匹配」提示）：

```text
craft-input-1  craft-input-2  craft-input-3  craft-input-4  craft-output
head  chest  legs  feet
ring-1  ring-2  amulet  element-core  badge  mount
```

`modules/slots.yml` 中也必须存在这 15 个同名规则，否则会在重载时记录 `modules/slots.yml is missing required special slot rule ...` 并拒绝打开背包。

这 15 个槽位的存储方式并不相同：

| 槽位 | 存储 | 规则作用 |
|---|---|---|
| `head` / `chest` / `legs` / `feet` | 玩家原版护甲槽 | 白名单、`read-only`、`max-amount` 直接作用于护甲槽 |
| `craft-input-1..4` / `craft-output` 与其余自定义槽位 | 服务端数据库 | 全部规则生效，物品不进入原版背包 |

`gui/inventory.yml` 中的玩家背包和快捷栏槽位使用内置 ID，不需要在 `slots.yml` 中声明规则，也不写数据库：

```text
player-hotbar-0 … player-hotbar-8
player-main-0 … player-main-26
player-offhand
```

## 槽位交互

- 特殊槽位的点击由客户端通过 Slots 通道上报槽位 ID、鼠标键和递增序列号；服务端校验会话、序列、每玩家限流、槽位 ID 和白名单后才执行，客户端不参与结果计算。
- 原版槽位（合成格、护甲、背包、快捷栏、副手）沿用原版容器交互，由服务端背包逻辑处理。
- 物品不满足 `whitelist` 或超过 `max-amount` 时，操作被拒绝并发送 `slot-reject-message`。
- `read-only: true` 的槽位（例如 `craft-output`）只能由服务端写入，客户端不能取出。
- 鼠标手持物品时不显示任何槽位 tooltip；`type: inventory` 中的特殊槽位物品不会覆盖当前手持物品。
- 中键克隆服务端槽位物品需要 `soulcore.slot.clone` 权限（默认 OP）。
- 槽位保存失败时会自动回滚到操作前的状态，并在服务端日志记录 `[槽位] 保存失败，已回滚 ...`。

## 数据库

`database.yml` 决定槽位数据的存储位置：

```yaml
type: sqlite
table-prefix: soulcore_
sqlite:
  file: data/slots.db
mysql:
  host: 127.0.0.1
  port: 3306
  database: soulcore
  username: root
  password: ""
  use-ssl: false
  connect-timeout-ms: 5000
```

- `type` 支持 `sqlite` 与 `mysql`，切换存储时会重新创建连接池。
- 数据库不可用时，玩家登录会被拒绝并提示联系管理员，避免出现物品丢失。
- 从旧版本升级后首次启动会按新架构读取 `slots.yml`，已有槽位数据仍按槽位 ID 保留在数据库中。

## 命令与重载

```text
/soulcore reload                  # 重载 slots.yml、database.yml 与 gui/
/soulcore inventory <玩家>         # 打开服务端权威背包
```

`/soulcore inventory` 需要 `soulcore.inventory` 权限（默认 OP）；玩家也可以对自己的 ID 执行该命令。

修改 `slots.yml` 或 `gui/inventory.yml` 后必须执行 `/soulcore reload`。开启 `config.yml` 的 `auto-reload.enabled` 后，`modules/` 与 `gui/` 下的改动会自动生效。

## 更新记录

### 更新至 1.5.3-fix-2 版本

- 移除根目录 `inventory.yml`，背包界面统一由 `gui/inventory.yml` 描述。
- 槽位规则改用 `slot-id` 关联，删除数字 `inventory-slot` 字段及其范围、重复校验。
- 白名单字段改为 `material`、`name`、`lore`、`name-regex`、`lore-regex`，新增 `nbt` 精确匹配，移除 `custom-model-data`。
- 新增 `slot-reject-message`，槽位拒绝提示从 `inventory.yml` 迁移到 `slots.yml`。
- 槽位文本改用 legacy 序列化，保留 `&` 与 `§x` 颜色信息。
- 背包不再有独立总开关，可用性由数据库状态和 `SLOTS` 能力协商决定。

## 常见问题

### 重载后槽位规则没有生效？

1. 确认规则写在 `plugins/SoulCore/modules/slots.yml` 而非其他文件。
2. 确认没有使用 `materials`、`names`、`lores`、`custom-model-data` 等旧字段；日志会提示 `contains unsupported key`。
3. 确认 `gui/inventory.yml` 中对应组件的 `slot-id` 与规则名一致。
4. 执行 `/soulcore reload` 并查看日志中的槽位警告。

### 玩家进服被踢出并提示数据库不可用？

槽位数据存储在 `database.yml` 指定的数据库中。SQLite 模式请确认 `plugins/SoulCore/data/slots.db` 可写；MySQL 模式请确认账号、库名和网络连通性。数据库恢复后重新执行 `/soulcore reload`。

### 物品放进槽位后消失？

装饰性槽位（非 `head`、`chest`、`legs`、`feet`）的物品保存在服务端数据库，不会出现在原版背包中。物品数据随玩家 UUID 保存，删除数据库会同时删除其中的物品。

## 相关页面

- [统一 GUI 配置](/guide/modules/gui) —— `slot` 组件字段与界面布局
- [自定义物品图片](/guide/modules/item-images) —— `match.nbt` 的点路径写法
- [命令与权限](/guide/commands)
- [安装](/guide/installation)
