---
layout: home

hero:
  name: SoulCore
  text: Minecraft 客户端与 Paper 服务端一体化增强
  tagline: Fabric 客户端 Mod + Paper 服务端插件 + 双端共享协议，为你的服务器提供战斗反馈、怪物血条、自定义物品图片与多样化客户端效果。
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

features:
  - icon: ⚔️
    title: 战斗反馈
    details: 客户端实时采样生命变化，在实体颈部显示像素风伤害/治疗数字，不改变服务端玩法结果。
  - icon: 🧟
    title: 怪物血条
    details: 敌对生物头顶显示朝向摄像机的名称、橙红生命条与当前生命数值，自动隐藏原版名牌。
  - icon: 🎒
    title: 拾取提示
    details: 拾取物品时右下角弹出图标、名称与数量的滑动通知，同屏最多五条，位置可自由拖动。
  - icon: 🖼️
    title: 自定义物品图片
    details: Paper 下发匹配规则，客户端将物品替换为自定义图片，支持名称/Lore/正则/NBT 匹配与动画。
  - icon: 🎨
    title: 3D 物品模型
    details: 内置 GeckoLib 支持，为物品配置 3D 模型、动画与发光层纹理。
  - icon: 📡
    title: 服务端效果
    details: 通过协议通道下发 HUD 文本/图片、Tooltip、粒子、屏幕叠加、相机效果与服务端按键。
---

::: tip 项目构成
SoulCore 是一个多模块项目，包含 **SoulCore-Fabirc**（Fabric 客户端 Mod）、**SoulCore-Plugin**（Paper 服务端插件）和 **Protocol**（双端共享网络协议）。三个模块相互配合，客户端负责渲染与交互，服务端负责规则与效果下发。
:::

## 支持环境

| 组件 | 版本 |
|---|---|
| Minecraft | `1.21.11` |
| Java | `21+` |
| Fabric Loader | `0.19.3+` |
| Fabric API | `0.141.6+1.21.11` |
| GeckoLib | `5.4.5`（已内嵌到 Fabric Mod） |
| Paper API | `1.21.11` |

## 下一步

- [快速开始](/guide/getting-started) —— 3 分钟完成客户端与服务端安装
- [自定义物品图片](/guide/modules/item-images) —— 最常用的进阶玩法
- [客户端模块](/guide/modules/settings) —— 战斗文字、怪物血条、拾取提示、总控设置
- [服务端模块](/guide/modules/hud) —— HUD、Tooltip、粒子、按键与装备外观
- [命令与权限](/guide/commands) —— 完整命令参考
