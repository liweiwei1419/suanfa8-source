---
title: 「力扣」第 959 题：由斜杠划分区域（中等）
icon: shipin
category: 并查集
tags:
  - 并查集
---

- 题目链接：[959. 由斜杠划分区域](https://leetcode-cn.com/problems/regions-cut-by-slashes/)；
- 题解链接：[🎦 由斜杠划分区域](https://leetcode-cn.com/problems/regions-cut-by-slashes/solution/you-xie-gang-hua-fen-qu-yu-by-leetcode-67xb/)。

::: danger 视频讲解
:tv: 这道题在 [官方题解](https://leetcode-cn.com/problems/regions-cut-by-slashes/solution/you-xie-gang-hua-fen-qu-yu-by-leetcode-67xb/) 和 [B 站](https://www.bilibili.com/video/BV1Ry4y117HD) 可以收看视频讲解，可以点击下面的视频右上角「去 bilibili 观看」，选择快速播放，获得更好的观看体验。

:::

<div style="position: relative; padding: 30% 45%;">
<iframe style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;" src="https://player.bilibili.com/player.html?aid=798948748&bvid=BV1Ry4y117HD&cid=288731392&page=1" frameborder="no" scrolling="no"></iframe>
</div>
## 题目描述

在由 1 x 1 方格组成的 N x N 网格 `grid` 中，每个 1 x 1 方块由 `/`、`\` 或空格构成。这些字符会将方块划分为一些共边的区域。

（请注意，反斜杠字符是转义的，因此 `\` 用 `"\\"` 表示。）。

返回区域的数目。

**示例 1：**

```
输入：
[
  " /",
  "/ "
]
输出：2
解释：2x2 网格如下：
```

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/15/1.png)

**示例 2：**

```
输入：
[
  " /",
  "  "
]
输出：1
解释：2x2 网格如下：
```

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/15/2.png)

**示例 3：**

```
输入：
[
  "\\/",
  "/\\"
]
输出：4
解释：（回想一下，因为 \ 字符是转义的，所以 "\\/" 表示 \/，而 "/\\" 表示 /\。）
2x2 网格如下：
```

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/15/3.png)

**示例 4：**

```
输入：
[
  "/\\",
  "\\/"
]
输出：5
解释：（回想一下，因为 \ 字符是转义的，所以 "/\\" 表示 /\，而 "\\/" 表示 \/。）
2x2 网格如下：
```

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/15/4.png)

**示例 5：**

```
输入：
[
  "//",
  "/ "
]
输出：3
解释：2x2 网格如下：
```

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/15/5.png)

**提示：**

1. `1 <= grid.length == grid[0].length <= 30`
2. `grid[i][j]` 是 `'/'`、`'\'`、或 `' '`。

::: warning 说明
本题详解请见本文的「题解链接」，有视频讲解和文字讲解。
:::
