---
title: 「力扣」第 1267 题：统计参与通信的服务器（中等）
icon: yongyan
categories: 并查集
tags:
  - 并查集
---

## 「力扣」第 1267 题：[统计参与通信的服务器](https://leetcode-cn.com/problems/count-servers-that-communicate/)

+ [链接](https://leetcode-cn.com/problems/count-servers-that-communicate)

这里有一幅服务器分布图，服务器的位置标识在 m * n 的整数矩阵网格 grid 中，1 表示单元格上有服务器，0 表示没有。

如果两台服务器位于同一行或者同一列，我们就认为它们之间可以进行通信。

请你统计并返回能够与至少一台其他服务器进行通信的服务器的数量。

提示：

+ `m == grid.length`
+ `n == grid[i].length`
+ `1 <= m <= 250`
+ `1 <= n <= 250`
+ `grid[i][j] == 0 or 1`

