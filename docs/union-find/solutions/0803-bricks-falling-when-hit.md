---
title: 「力扣」第 803 题：打砖块（困难）
icon: shipin
category: 并查集
tags:
  - 并查集
---

- 题目链接：[803. 打砖块](https://leetcode-cn.com/problems/bricks-falling-when-hit/)
- 题解链接：[🎦 803. 打砖块](https://leetcode-cn.com/problems/bricks-falling-when-hit/solution/803-da-zhuan-kuai-by-leetcode-r5kf/)。

::: danger 视频讲解
:tv: 这道题在 [官方题解](https://leetcode-cn.com/problems/bricks-falling-when-hit/solution/803-da-zhuan-kuai-by-leetcode-r5kf/) 和 [B 站](https://www.bilibili.com/video/BV1Xv411W74B) 可以收看视频讲解，可以点击下面的视频右上角「去 bilibili 观看」，选择快速播放，获得更好的观看体验。

:::

<div style="position: relative; padding: 30% 45%;">
<iframe style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;" src="https://player.bilibili.com/player.html?aid=246251062&bvid=BV1Xv411W74B&cid=287320353&page=1" frameborder="no" scrolling="no"></iframe>
</div>

## 题目描述

有一个 `m x n` 的二元网格，其中 `1` 表示砖块，`0` 表示空白。砖块 **稳定**（不会掉落）的前提是：

- 一块砖直接连接到网格的顶部，或者
- 至少有一块相邻（4 个方向之一）砖块 **稳定** 不会掉落时

给你一个数组 `hits` ，这是需要依次消除砖块的位置。每当消除 `hits[i] = (rowi, coli)` 位置上的砖块时，对应位置的砖块（若存在）会消失，然后其他的砖块可能因为这一消除操作而掉落。一旦砖块掉落，它会立即从网格中消失（即，它不会落在其他稳定的砖块上）。

返回一个数组 `result` ，其中 `result[i]` 表示第 `i` 次消除操作对应掉落的砖块数目。

**注意**，消除可能指向是没有砖块的空白位置，如果发生这种情况，则没有砖块掉落。

**示例 1：**

```
输入：grid = [[1,0,0,0],[1,1,1,0]], hits = [[1,0]]
输出：[2]
解释：
网格开始为：
[[1,0,0,0]，
 [1,1,1,0]]
消除 (1,0) 处加粗的砖块，得到网格：
[[1,0,0,0]
 [0,1,1,0]]
两个加粗的砖不再稳定，因为它们不再与顶部相连，也不再与另一个稳定的砖相邻，因此它们将掉落。得到网格：
[[1,0,0,0],
 [0,0,0,0]]
因此，结果为 [2] 。
```

**示例 2：**

```
输入：grid = [[1,0,0,0],[1,1,0,0]], hits = [[1,1],[1,0]]
输出：[0,0]
解释：
网格开始为：
[[1,0,0,0],
 [1,1,0,0]]
消除 (1,1) 处加粗的砖块，得到网格：
[[1,0,0,0],
 [1,0,0,0]]
剩下的砖都很稳定，所以不会掉落。网格保持不变：
[[1,0,0,0],
 [1,0,0,0]]
接下来消除 (1,0) 处加粗的砖块，得到网格：
[[1,0,0,0],
 [0,0,0,0]]
剩下的砖块仍然是稳定的，所以不会有砖块掉落。
因此，结果为 [0,0] 。
```

**提示：**

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 200`
- `grid[i][j]` 为 `0` 或 `1`
- `1 <= hits.length <= 4 * 10^4`
- `hits[i].length == 2`
- $0 \le x_i \le m - 1$
- $0 \le y_i \le n - 1$
- 所有 $(x_i, y_i)$ 互不相同

::: warning 说明
本题详解请见本文的「题解链接」，有视频讲解和文字讲解。
:::
