---
title: 「力扣」第 778 题：水位上升的泳池中游泳（困难）
icon: shipin
category: 并查集
tags:
  - 并查集
  - 二分查找
  - 深度优先遍历
  - 广度优先遍历
  - 单源最短路径
---

- 题目链接：[778. 水位上升的泳池中游泳](https://leetcode-cn.com/problems/swim-in-rising-water/)；
- 题解链接：[🎦 水位上升的泳池中游泳](https://leetcode-cn.com/problems/swim-in-rising-water/solution/shui-wei-shang-sheng-de-yong-chi-zhong-y-862o/)。

::: danger 视频讲解
:tv: 这道题在 [官方题解](https://leetcode-cn.com/problems/swim-in-rising-water/solution/shui-wei-shang-sheng-de-yong-chi-zhong-y-862o/) 和 [B 站](https://www.bilibili.com/video/BV1kv4y1f7to) 可以收看视频讲解，可以点击下面的视频右上角「去 bilibili 观看」，选择快速播放，获得更好的观看体验。

:::

<div style="position: relative; padding: 30% 45%;">
<iframe style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;" src="https://player.bilibili.com/player.html?aid=543883098&bvid=BV1kv4y1f7to&cid=291911006&page=1" frameborder="no" scrolling="no"></iframe>
</div>

## 题目描述

在一个 N x N 的坐标方格 `grid` 中，每一个方格的值 `grid[i][j]` 表示在位置 `(i,j)` 的平台高度。

现在开始下雨了。当时间为 `t` 时，此时雨水导致水池中任意位置的水位为 `t` 。你可以从一个平台游向四周相邻的任意一个平台，但是前提是此时水位必须同时淹没这两个平台。假定你可以瞬间移动无限距离，也就是默认在方格内部游动是不耗时的。当然，在你游泳的时候你必须待在坐标方格里面。

你从坐标方格的左上平台 (0，0) 出发。最少耗时多久你才能到达坐标方格的右下平台 `(N-1, N-1)`？

**示例 1:**

```
输入: [[0,2],[1,3]]
输出: 3
解释:
时间为0时，你位于坐标方格的位置为 (0, 0)。
此时你不能游向任意方向，因为四个相邻方向平台的高度都大于当前时间为 0 时的水位。

等时间到达 3 时，你才可以游向平台 (1, 1). 因为此时的水位是 3，坐标方格中的平台没有比水位 3 更高的，所以你可以游向坐标方格中的任意位置。
```

**示例 2:**（这个例子的着重号没有显示出来，请读者直接看 [原题目描述](https://leetcode-cn.com/problems/swim-in-rising-water/)）

```
输出: 16
解释:
 0  1  2  3  4
24 23 22 21  5
12 13 14 15 16
11 17 18 19 20
10  9  8  7  6

最终的路线用加粗进行了标记。
我们必须等到时间为 16，此时才能保证平台 (0, 0) 和 (4, 4) 是连通的
```

**提示:**

1. `2 <= N <= 50`.
2. `grid[i][j]` 是 `[0, ..., N*N - 1]` 的排列。
