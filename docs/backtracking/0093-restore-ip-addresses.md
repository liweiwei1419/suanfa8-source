---
title: 「力扣」第 93 题：复原 IP 地址（中等）
date: 2018-02-25 08:00:00
author: liweiwei1419
top: false
mathjax: true
categories: 专题 14：回溯算法
tags:
  - 回溯算法
  - 递归
  - 树形问题
  - 深度优先遍历
  - 字符串
permalink: leetcode-solution/0093-restore-ip-addresses
---

## 「力扣」第 93 题：复原 IP 地址（中等）

+ [链接](https://leetcode-cn.com/problems/restore-ip-addresses/description/)

+ [题解链接](https://leetcode-cn.com/problems/restore-ip-addresses/solution/hui-su-suan-fa-hua-tu-fen-xi-jian-zhi-tiao-jian-by/)

> 给定一个只包含数字的字符串，复原它并返回所有可能的 IP 地址格式。
>
> 示例：
>
> ```
> 输入: "25525511135"
> 输出: ["255.255.11.135", "255.255.111.35"]
> ```

思路：使用深度优先遍历、递归回溯的思想来完成。

1、IP 地址一共 4 段，每一段的最大值是 255，最小值是 0，我们采用搜索的办法来得到有效的 ip 段；

2、每一次循环判断接下来读进来的 3 个数字字符是有可能成为一个 ip 段，如果可以，加到已经形成的 ip 段后面（特别要注意，截取字符串的时候不能越界）；

3、接下来递归终止的条件就得分析清楚了，但是也不是难事，把握好总共分 4 段，当画上第 4 个点，并且下一个考察的下标已经「刚刚好」越界的时候，此时，我们就找到了一个有效的 ip 段分割。

