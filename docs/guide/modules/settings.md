# 总控设置

提供统一的 SoulCore 客户端设置入口，把各功能模块的开关集中在同一个菜单中，同时保持各功能模块独立拥有自己的状态与配置。

**模块状态**：客户端 · 已实现 · 依赖：战斗文字、拾取提示、怪物血条、任务追踪、平滑字体

## 打开方式

在游戏中输入：

```text
/soulcore-client
```

::: tip 纯客户端命令
`/soulcore-client` 是纯客户端命令，**不会**发送到服务端。单机世界或任意服务器都能使用。
:::

## 菜单内容

| 项目 | 作用 | 所属模块 |
|---|---|---|
| 伤害显示 | 开关战斗文字伤害数字 | 战斗文字 |
| 生命恢复 | 开关战斗文字治疗数字 | 战斗文字 |
| 怪物血量 | 开关怪物头顶血条 | 怪物血条 |
| 设置拾取 HUD 位置 | 进入拖动位置设置界面 | 拾取提示 |
| 设置任务追踪 HUD 布局 | 调整任务面板位置、宽高与收起状态 | CustomQuest 任务追踪 |
| 平滑字体设置 | 选择本地字体并调整 ModernUI Text Engine 参数 | 平滑字体 |
| 完成 | 关闭总控菜单并返回游戏或父界面 | 总控设置 |

物品图片没有客户端开关。安装 SoulCore 后，该模块会始终参与服务端能力协商。

## 行为说明

- 菜单不暂停游戏，也不重复渲染原版模糊背景。
- 点击完成或按 Escape 返回父界面；从聊天命令打开时返回游戏。
- 拾取 HUD 位置界面完成或按 Escape 后返回总控菜单。
- 任务追踪与字体设置界面完成或按 Escape 后返回总控菜单。
- GUI 高度不足 `200` 时，七个按钮自动改为两列布局，避免纵向溢出。
- 配置加载或保存失败由所属功能模块记录日志；总控菜单仍可打开。

## 直达与资源命令

```text
/soulcore-client pickuphud
```

直接打开拾取 HUD 位置设置界面（与总控菜单中的按钮等价）。

```text
/soulcore-client questtracking
```

直接打开任务追踪 HUD 布局设置界面。

```text
/soulcore-client reload
```

重新读取客户端本地的物品图片、模型、动画、字体和字符图标资源。修改服务端规则时仍应使用服务端 `/soulcore reload`。

## 相关

- [战斗文字](/guide/modules/combat-text) · [怪物血条](/guide/modules/monster-health) · [拾取提示](/guide/modules/pickup-hud)
- [平滑字体与字符图标](/guide/modules/smooth-fonts) · [任务追踪 HUD](/guide/modules/quest-tracking)
