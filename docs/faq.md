# FAQ

## 安装相关

### 服务端没有生成配置文件？

- 确认 Paper 版本为 `1.21.11`。
- 查看服务端日志，确认插件加载成功（`SoulCore` 出现在插件列表中）。
- 检查 `plugins/` 目录权限。

### 客户端没有自动创建 `resourcepacks/soulcore/`？

- 确认 Mod 已加载：Mod 列表或 F3 界面中可见 SoulCore。
- 目录由 Mod 启动时自动创建；若已存在则不会修改其中的文件。

## 物品图片相关

### 物品图片不生效？

按顺序排查：

1. 服务端已执行 `/soulcore reload`（需要 `soulcore.reload` 权限）。
2. 图片已放入客户端 `.minecraft/resourcepacks/soulcore/`，文件名与 `texture` 配置一致。
3. 规则 `match` 中至少有一种匹配方式，且物品满足所有条件。
4. 客户端为兼容版本（支持物品图片能力）。
5. 只替换了客户端本地文件时，执行 `/soulcore-client reload` 重读资源。

### 如何调试匹配规则？

- 确认 `material` 自动补全了 `minecraft:` 命名空间。
- `name` 需要与完整物品名称完全一致（区分大小写）。
- `lore` 只需要任意一行一致。
- 多条件同时填写时需要全部满足。
- 规则之间条件重叠时，`priority` 数值大者优先。
- 新规则直接写在 `icons.yml` 根节点；旧 `icons:` / `items:` 包裹层仅用于兼容。

### 为什么设置菜单里没有物品图片开关？

从 `1.3.1` 起客户端开关已移除。安装 SoulCore 后物品图片始终参与能力协商；旧的 `item-images.properties` 不再生效。服务端可通过 `config.yml` 的 `modules.item-images` 与 `client.send-rules` 控制是否发送规则。

### 图片动画不动？

- 动画元数据文件必须与图片同名且同目录（`soul_blade.png.mcmeta`）。
- 图片高度需包含所有垂直排列的动画帧。
- 使用 Minecraft 原生 `animation` 格式。

## 3D 模型相关

### GeckoLib 3D 模型不显示？

- `model`、`animations`、`glow-texture` 使用 `/` 分隔的规范相对路径；`model` 必须是 GeckoLib 可解析的 `.json`，不能直接使用 `.bbmodel`。
- 模型、动画、贴图文件需放入客户端 `resourcepacks/soulcore/` 对应路径。
- `texture` 仍然必填，是模型加载失败时的回退图片。
- 修改后服务端执行 `/soulcore reload`。

### 需要单独安装 GeckoLib 吗？

不需要。GeckoLib `5.4.5` 已内嵌到 SoulCore Fabric Mod。如果 `mods` 目录已有其他 GeckoLib 版本，请保持版本兼容，避免同时加载不兼容版本。

## 客户端功能相关

### 战斗文字不显示？

- 确认总控菜单中「伤害显示」「生命恢复」开关已开启（默认开启）。
- 伤害数字只显示正整数；小于 `0.5` 的有效变化显示 `1`。
- 纯吸收值下降需要实体近期处于受伤状态才显示为伤害。
- 隐身实体不产生新文字。

### 怪物血条不显示？

- 只显示敌对生物（`Enemy` 契约）；第三方怪物若未实现该接口不会显示。
- 血条有距离限制：超过 32 格或不在视锥内不渲染；隔墙不可见。
- 确认总控菜单「怪物血量」开关已开启。
- 连接 SoulCore Paper 时，检查 `plugins/SoulCore/modules/mob_health.yml`：`name: ["*"]` 显示全部，普通名称区分大小写精确匹配，`name: []` 会全部隐藏。
- 修改名称列表后执行 `/soulcore reload`。

### 拾取提示不出现？

- 只提示**实际拾取**的物品：不提示经验球、容器转移、合成产物、命令给予、创造模式直接放入背包。
- 同屏最多 5 条，最新条目在底部。
- 位置可通过 `/soulcore-client pickuphud` 拖动调整。

## 字体与 Emoji

### 安装字体包后仍是原版字体？

- `SoulCore-Fonts-<version>.zip` 必须解压，最终路径为 `.minecraft/resourcepacks/soulcore/fonts/smooth.ttf`。
- 字体目录不需要在资源包界面启用；不要把 ZIP 多解压出一层同名目录。
- 打开 `/soulcore-client` →「平滑字体设置」，确认本地字体已启用且选择了有效文件。
- 字体缺失、超过 64 MiB 或格式无效时会安全回退 Minecraft 字体，并在 `logs/latest.log` 记录警告。

### 彩色 Emoji 不显示？

Emoji 包和字体包安装方式不同：`SoulCore-Color-Emoji-<version>.zip` 应保持压缩状态放入 `.minecraft/resourcepacks/`，并在 Minecraft 资源包界面启用。

### 字符图标仍显示 `<sword>` 原文？

检查 `font.yml` 的 `font-id`、`token`、`texture`、`width`、`height` 和 `ascent`；客户端 PNG 尺寸必须与配置一致。修改服务端规则后执行 `/soulcore reload`，只替换 PNG 时执行 `/soulcore-client reload`。

## CustomQuest 集成

### 任务对话、导航或追踪 HUD 没有出现？

- 客户端需要 SoulCore `1.4.0` 或协议兼容版本。
- CustomQuest 必须支持对应的 SoulCore 客户端通道；这三项功能不依赖 SoulCore Paper 插件。
- 没有任务快照时追踪面板保持为空；连续约 13 秒没有心跳也会自动清空。
- 导航目标超过 256 米且不超过 512 米时只显示光柱，超过 512 米不显示导航视觉。
- 提供客户端 `logs/latest.log` 和 CustomQuest 服务端日志以排查通道或消息校验问题。

### 如何滚动、收起任务面板或点击导航？

按 `T` 打开原版聊天解锁鼠标，然后在任务面板上操作。布局可通过 `/soulcore-client questtracking` 调整；拾取 HUD 仍使用 `/soulcore-client pickuphud`。

## 服务端效果相关

### 效果文件改了但没生效？

- 执行 `/soulcore reload`。
- 确认 `config.yml` 中对应模块开关（`modules.*`）与协议通道（`protocol.*-channel-enabled`）已启用。
- `config.yml` 只提供 `reload.watch-icons`、`reload.watch-hud` 和 `reload.watch-armor`；`font.yml`、`mob_health.yml`、Tooltip、粒子与按键配置仍需手动执行 `/soulcore reload`。

### 玩家进服没收到效果？

- 客户端必须为兼容版本（能力协商通过）。
- `client.compatibility.mode` 为 `require-compatible` 时，仅向声明对应能力的客户端发送。
- 查看服务端日志，确认没有条目被跳过（条目非法时只跳过该条目并记录警告）。

## 构建相关

### 构建失败？

- 确认 Java 版本为 `21+`。
- 使用项目自带的 Gradle Wrapper（`./gradlew` / `.\gradlew.bat`）。
- 完整构建：`./gradlew clean build`；单模块：`:fabric-mod:build` 或 `:paper-plugin:build`。

### 发布 Release 失败？

- 推送的标签必须是 `v*` 格式，且版本号与 `gradle.properties` 中的 `mod_version` 完全一致。把下面的 `X.Y.Z` 替换为尚未发布的版本；不要重建已经存在的 `v1.4.0`：

```bash
git tag vX.Y.Z
git push origin vX.Y.Z
```

## 兼容性相关

### 支持哪些 Minecraft 版本？

目前支持 `1.21.11`。升级 Minecraft、Loader、Fabric API 或 Paper 版本时，需要同步更新项目配置并重新构建。

### 客户端必须安装 SoulCore 吗？

不是。SoulCore Paper 默认使用 `allow-unknown`，可允许未安装 Mod 的普通客户端连接；只有安装 Fabric Mod 的客户端才能体验客户端增强。CustomQuest 是否要求新客户端由它自己的兼容策略决定。
