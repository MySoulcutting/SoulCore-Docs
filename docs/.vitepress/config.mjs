import { defineConfig } from 'vitepress'

// GitHub Pages 项目站点需要 base 与仓库名一致。
// 本地预览时用默认 '/'，CI 部署时通过环境变量注入。
const base = process.env.DOCS_BASE || '/SoulCore-Docs/'

export default defineConfig({
  title: 'SoulCore',
  description: 'SoulCore —— Minecraft 客户端 Mod 与 Paper 服务端插件',
  lang: 'zh-CN',
  base,

  // UI/UX Pro Max 设计系统：Dark Mode (OLED) 仅暗色主题
  // appearance: false 禁用切换按钮；暗色变量已在 theme/style.css 的 :root 中定义
  appearance: false,

  head: [
    ['link', { rel: 'icon', href: `${base}favicon.svg` }],
    ['meta', { name: 'theme-color', content: '#0F172A' }],
    ['meta', { name: 'color-scheme', content: 'dark' }]
  ],

  themeConfig: {
    logo: '/favicon.svg',
    siteTitle: 'SoulCore',

    nav: [
      { text: '首页', link: '/' },
      { text: '使用教程', link: '/guide/getting-started' },
      { text: 'FAQ', link: '/faq' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '入门',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '安装', link: '/guide/installation' },
            { text: '命令与权限', link: '/guide/commands' },
            { text: '构建与发布', link: '/guide/building' }
          ]
        },
        {
          text: '客户端模块',
          items: [
            { text: '总控设置', link: '/guide/modules/settings' },
            { text: '战斗文字', link: '/guide/modules/combat-text' },
            { text: '怪物血条', link: '/guide/modules/monster-health' },
            { text: '拾取提示', link: '/guide/modules/pickup-hud' }
          ]
        },
        {
          text: '服务端模块',
          items: [
            { text: '自定义物品图片', link: '/guide/modules/item-images' },
            { text: 'HUD 文本与图片', link: '/guide/modules/hud' },
            { text: 'Tooltip 增强', link: '/guide/modules/tooltip' },
            { text: '粒子效果', link: '/guide/modules/particles' },
            { text: '服务端按键', link: '/guide/modules/keybinds' },
            { text: '装备外观', link: '/guide/modules/equipment-appearance' }
          ]
        }
      ]
    },

    // VitePress 内置本地搜索（基础功能）
    search: {
      provider: 'local'
    },

    // 社交链接（部署后替换为真实仓库地址）
    socialLinks: [
      { icon: 'github', label: 'GitHub', link: 'https://github.com/MySoulcutting/SoulCore' }
    ],

    footer: {
      message: 'SoulCore 开源项目文档',
      copyright: 'Copyright © 2025'
    },

    outline: {
      level: [2, 3],
      label: '本页目录'
    },

    lastUpdated: {
      text: '最后更新'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',
    langMenuLabel: '语言'
  }
})
