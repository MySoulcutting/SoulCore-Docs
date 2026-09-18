---
layout: home

hero:
  name: SoulCore
  text: Minecraft 客户端与 Paper 服务端一体化增强
  tagline: NeoForge 客户端 Mod + Paper 服务端插件 + 双端共享协议，提供战斗反馈、自定义资源、ModernUI 平滑字体与 CustomQuest 客户端交互。
  image:
    src: /favicon.svg
    alt: SoulCore
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 自定义物品图片
      link: /guide/modules/item-images
    - theme: alt
      text: CustomQuest 集成
      link: /guide/modules/quest-dialogue

features:
  - icon: { src: /icons/sword.svg, alt: 战斗反馈 }
    title: 战斗反馈
    details: 客户端实时采样生命变化，在实体颈部显示像素风伤害/治疗数字，不改变服务端玩法结果。
  - icon: { src: /icons/heart-pulse.svg, alt: 怪物血条 }
    title: 怪物血条
    details: 敌对生物头顶显示名称、橙红生命条与当前生命数值，并支持 Paper 按完整名称下发显示白名单。
  - icon: { src: /icons/backpack.svg, alt: 拾取提示 }
    title: 拾取提示
    details: 拾取物品时右下角弹出图标、名称与数量的滑动通知，同屏最多五条，位置可自由拖动。
  - icon: { src: /icons/image.svg, alt: 自定义物品图片 }
    title: 自定义物品图片
    details: Paper 下发匹配规则，客户端将物品替换为自定义图片，支持名称/Lore/正则/NBT 匹配与动画。
  - icon: { src: /icons/box.svg, alt: 3D 物品模型 }
    title: 3D 物品模型
    details: 内置 GeckoLib 支持，为物品配置 3D 模型、动画与发光层纹理。
  - icon: { src: /icons/type.svg, alt: 平滑字体 }
    title: ModernUI 平滑字体
    details: 内嵌文字引擎，支持本地字体选择、整串塑形、字符图标，以及可选的彩色 Emoji 资源包。
  - icon: { src: /icons/compass.svg, alt: CustomQuest }
    title: CustomQuest 集成
    details: 提供服务端权威任务对话、世界导航标记与可调整布局的多任务追踪 HUD。
  - icon: { src: /icons/radio.svg, alt: 服务端效果 }
    title: 服务端效果
    details: 通过协议通道下发 HUD 文本/图片、Tooltip、粒子、屏幕叠加、相机效果与服务端按键。
  - icon: { src: /icons/box.svg, alt: 统一 GUI }
    title: 统一 GUI
    details: 使用单一 YAML schema 配置 HUD、菜单、组件、变量、生命周期事件、服务端动作与有限动画。
---

::: tip 项目构成
SoulCore 的核心产物包括 **SoulCore-NeoForge**（NeoForge 客户端 Mod）、**SoulCore-Plugin**（Paper 服务端插件）和 **Protocol**（双端共享网络协议）；构建中还包含供客户端内嵌的 **ModernUI Text Port**。CustomQuest 是可选集成，不要求安装 SoulCore Paper 插件。
:::

## 支持环境

| 组件 | 版本 |
|---|---|
| SoulCore | `1.5.2` |
| Minecraft | `1.21.8` |
| Java | `21+` |
| NeoForge | `21.8.54+` |
| GeckoLib | `5.2.2`（已内嵌到 NeoForge Mod） |
| ModernUI Core | `3.13.0`（文字引擎已内嵌） |
| Paper API | `1.21.8` |

## 下一步

- [快速开始](/guide/getting-started) —— 3 分钟完成客户端与服务端安装
- [平滑字体与字符图标](/guide/modules/smooth-fonts) —— 安装字体包、Emoji 与服务端字符图标
- [CustomQuest 集成](/guide/modules/quest-dialogue) —— 任务对话、导航和追踪 HUD
- [自定义 GUI](/guide/modules/gui) —— HUD、菜单、组件、变量和动画
- [自定义物品图片](/guide/modules/item-images) —— 最常用的进阶玩法
- [客户端模块](/guide/modules/settings) —— 战斗文字、怪物血条、拾取提示、字体与总控设置
- [服务端模块](/guide/modules/item-images) —— 物品图片、HUD、Tooltip、粒子、按键与装备外观
- [命令与权限](/guide/commands) —— 完整命令参考
