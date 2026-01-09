---
layout: home

hero:
  name: "ArchLinuxForCNUser"
  tagline: 面向中文用户的 Arch Linux 实用指南
  image:
    src: https://img.makis-life.cn/icon/Arch.png
    alt: ArchLinux
  actions:
    - theme: brand
      text: 开始安装
      link: /guides/installation
    - theme: alt
      text: Niri
      link: /tutorials/niri/
---

# 核心内容

## 概述

I use Arch btw.

本人初入 Linux 不久，对各种核心概念与术语并不熟悉，但已经入教 Arch 了哈哈。在安装与配置过程中遇到不少问题，发现中文资料真的非常匮乏，希望通过整理自己的安装与配置经验，帮助更多中文用户顺利使用 Arch Linux。同时也是帮助自己，帮助每一个曾经的自己。

若有误解或不准确之处，欢迎指正。

## Installation guides

- [安装前准备](/guides/before-installation)
- [ArchLinux 安装步骤](/guides/installation)

> 安装后配置与常用软件：相关页面可在 [Apps](/apps/) 与 [Dotfiles](/dotfiles) 部分找到

- [常见概念与术语](/tutorials/concepts-and-terminology) **TODO**

> like: wtf is tty? wtf is shell, wtf is dm wm, wtf is dotfiles...

## 桌面与窗口管理

- [Niri 教程](/tutorials/niri/)
- [Hyprland 教程](/tutorials/hyprland/) **TODO**
- [KDE Plasma 教程](/tutorials/kde-plasma/) **TODO**

> 说明：Niri 是我目前正在使用的 Window Manager。

## 配置文件与工具

- [Profile](/dotfiles/profile)：包含常用命令别名与环境变量 **TODO**
- [zsh](/dotfiles/zshrc)
- [魔法](/dotfiles/magic)：**TODO**

[常用工具](/tools/) **TODO**

### 终端模拟器

- Kitty 配置：[kitty](/dotfiles/kitty)
- WezTerm 配置：[wezterm](/dotfiles/wezterm)

## 常用软件（Apps）

- OneDrive、VirtualBox、WeChat、音乐客户端等：`/apps/`

## 贡献与维护

- 欢迎提交 PR 或在 Issues 中报告问题、补充示例或改进文档。
  若你熟悉 Niri、Xwayland、NVIDIA 修复或本地镜像加速，特别欢迎贡献实战经验。
- 提交前请尽量保持文档风格一致：每篇文档包含“前提 / 操作步骤 / 配置示例 / 故障排查 / 参考”。

## 参考

- [Arch Linux Wiki](https://wiki.archlinux.org/)
- [Niri Configuration Introduction](https://yalter.github.io/niri/Configuration%3A-Introduction.html)
- [Kitty: A GPU-Based Terminal Emulator](https://sw.kovidgoyal.net/kitty/)
- [WezTerm: GPU-Accelerated Terminal Emulator](https://wezfurlong.org/wezterm/)
- [iceKylin ArchInstallGuide](https://arch.icekylin.online/guide/rookie/basic-install)
