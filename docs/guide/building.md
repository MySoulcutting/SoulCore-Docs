# 构建与发布

## 环境要求

- Java `21+`
- Gradle（项目自带 Wrapper，无需手动安装）

## 本地构建

使用项目自带的 Gradle Wrapper：

```bash
./gradlew clean build
```

Windows：

```powershell
.\gradlew.bat clean build
```

构建产物：

```text
fabric-mod/build/libs/SoulCore-Fabirc-<version>.jar
paper-plugin/build/libs/SoulCore-Plugin-<version>.jar
protocol/build/libs/protocol-<version>.jar
```

### 只构建指定模块

只构建 Fabric Mod：

```bash
./gradlew :fabric-mod:build
```

只构建 Paper 插件：

```bash
./gradlew :paper-plugin:build
```

## GitHub Actions

仓库在以下情况自动执行完整构建：

- 推送到 `master`
- 创建或更新 Pull Request
- 手动运行工作流

构建成功后，可在对应 Actions 运行页面下载 Fabric、Paper 和 Protocol 三个 Artifact。

## 发布 Release

推送与 `gradle.properties` 中 `mod_version` 一致的 `v*` 标签时，GitHub Actions 会自动构建并创建 Release：

```bash
git tag v1.2.2
git push origin v1.2.2
```

::: warning 版本一致性
标签版本必须与 `gradle.properties` 中的 `mod_version` 一致，否则发布任务会拒绝执行。
:::

Release 自动包含：

```text
SoulCore-Fabirc-<version>.jar
SoulCore-Plugin-<version>.jar
SoulCore-Protocol-<version>.jar
```

## 版本信息

当前版本信息见根目录 `gradle.properties`：

| 属性 | 当前值 |
|---|---|
| `mod_version` | `1.2.2` |
| `minecraft_version` | `1.21.11` |
| `loader_version` | `0.19.3` |
| `fabric_api_version` | `0.141.6+1.21.11` |
| `geckolib_version` | `5.4.5` |

## 客户端功能验证

::: warning 注意
自动构建**不会**启动 Minecraft 客户端。涉及渲染、HUD 和动态纹理的功能需要在游戏内手动验证。
:::

验证清单：

- 战斗文字：攻击生物，观察颈部附近的伤害数字
- 怪物血条：接近敌对生物，观察头顶血条与数值
- 拾取提示：拾取物品，观察右下角通知
- 物品图片：配置规则后检查自定义图片显示
- 3D 模型：配置 GeckoLib 模型后检查模型渲染

## 下一步

- [FAQ](/faq) —— 常见问题
- [命令与权限](/guide/commands) —— 命令参考
