# 命令与权限

## 服务端命令

服务端命令通过 `/soulcore` 执行。

### /soulcore reload

重新加载服务端配置（`config.yml`、`advanced.yml`、`modules/` 与 `gui/` 下的配置文件）。

```text
/soulcore reload
```

| 项目 | 值 |
|---|---|
| 权限 | `soulcore.reload` |
| 默认 | OP |

### /soulcore hud

向指定玩家手动发送 `hud.yml` 中的一个 HUD 条目（对 `enable: false` 的条目很有用）。

```text
/soulcore hud <玩家> <条目ID>
```

| 项目 | 值 |
|---|---|
| 权限 | `soulcore.hud` |
| 默认 | OP |

### /soulcore gui

打开统一 GUI 配置中的 `menu`。

```text
/soulcore gui <玩家> <GUI ID>
```

权限：`soulcore.gui`（默认 OP）。HUD 不能通过此命令打开；GUI ID 使用配置中的 `id`。

### /soulcore capabilities

查看指定玩家的能力协商结果（客户端声明了哪些 SoulCore 能力）。

```text
/soulcore capabilities <玩家>
```

| 项目 | 值 |
|---|---|
| 权限 | `soulcore.capabilities` |
| 默认 | OP |

### /soulcore effect

清除指定玩家的某个受约束效果。

```text
/soulcore effect <玩家> clear <effectId>
```

| 项目 | 值 |
|---|---|
| 权限 | `soulcore.effect.clear` |
| 默认 | OP |

## 客户端命令

客户端命令由 NeoForge Mod 提供，**不会**发送到服务端。

### /soulcore-client

打开总控设置菜单（伤害显示、生命恢复、怪物血量开关，以及拾取 HUD、任务追踪 HUD 和平滑字体设置）。

```text
/soulcore-client
```

### /soulcore-client pickuphud

直接打开拾取 HUD 位置设置界面。

```text
/soulcore-client pickuphud
```

### /soulcore-client questtracking

直接打开 CustomQuest 任务追踪 HUD 布局设置界面。

```text
/soulcore-client questtracking
```

### /soulcore-client reload

重新读取客户端本地的物品图片、模型、动画、字体与字符图标，并触发 SoulCore 资源重载。

```text
/soulcore-client reload
```

::: tip 两种重载的区别
`/soulcore-client reload` 只重读当前客户端本地资源；修改 `plugins/SoulCore/` 下的服务端规则后，应执行 `/soulcore reload`。
:::

## 权限列表

| 权限 | 说明 | 默认 |
|---|---|---|
| `soulcore.reload` | 重载 SoulCore 配置 | OP |
| `soulcore.hud` | 手动发送 HUD 条目 | OP |
| `soulcore.capabilities` | 查看玩家能力协商结果 | OP |
| `soulcore.effect.clear` | 清除玩家效果 | OP |
| `soulcore.gui` | 打开统一 GUI 配置中的 MENU | OP |

## 下一步

- [构建与发布](/guide/building) —— 从源码构建、发布 Release
- [总控设置](/guide/modules/settings) —— 客户端设置菜单
- [FAQ](/faq) —— 常见问题
