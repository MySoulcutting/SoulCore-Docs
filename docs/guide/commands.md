# 命令与权限

## 服务端命令

服务端命令通过 `/soulcore` 执行。

### /soulcore reload

重新加载服务端配置（`config.yml` 与 `modules/` 下所有文件）。

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

### /soulcore capabilities

查看指定玩家的能力协商结果（客户端声明了哪些 SoulCore 能力）。

```text
/soulcore capabilities <玩家>
```

| 项目 | 值 |
|---|---|
| 权限 | `soulcore.capabilities` |
| 默认 | OP |

### /soulcore effect clear

清除指定玩家的某个受约束效果。

```text
/soulcore effect clear <玩家> <effectId>
```

| 项目 | 值 |
|---|---|
| 权限 | `soulcore.effect.clear` |
| 默认 | OP |

## 客户端命令

客户端命令由 Fabric Mod 提供，**不会**发送到服务端。

### /soulcore-client

打开总控设置菜单（伤害显示、生命恢复、怪物血量开关，拾取 HUD 位置设置）。

```text
/soulcore-client
```

### /soulcore-client pickuphud

直接打开拾取 HUD 位置设置界面。

```text
/soulcore-client pickuphud
```

## 权限列表

| 权限 | 说明 | 默认 |
|---|---|---|
| `soulcore.reload` | 重载 SoulCore 配置 | OP |
| `soulcore.hud` | 手动发送 HUD 条目 | OP |
| `soulcore.capabilities` | 查看玩家能力协商结果 | OP |
| `soulcore.effect.clear` | 清除玩家效果 | OP |

## 下一步

- [构建与发布](/guide/building) —— 从源码构建、发布 Release
- [FAQ](/faq) —— 常见问题
