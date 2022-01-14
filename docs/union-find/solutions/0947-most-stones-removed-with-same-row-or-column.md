---
title: 「力扣」第 947 题：移除最多的同行或同列石头（中等）
icon: shipin
category: 并查集
tags:
  - 并查集
---

- 题目链接：[947. 移除最多的同行或同列石头](https://leetcode-cn.com/problems/most-stones-removed-with-same-row-or-column/)；
- 题解链接：[🎦 947. 移除最多的同行或同列石头](https://leetcode-cn.com/problems/most-stones-removed-with-same-row-or-column/solution/947-yi-chu-zui-duo-de-tong-xing-huo-tong-ezha/)。

::: danger 视频讲解
:tv: 这道题在 [官方题解](https://leetcode-cn.com/problems/most-stones-removed-with-same-row-or-column/solution/947-yi-chu-zui-duo-de-tong-xing-huo-tong-ezha/) 和 [B 站](https://www.bilibili.com/video/BV1Nr4y1K7Gj) 可以收看视频讲解，可以点击下面的视频右上角「去 bilibili 观看」，选择快速播放，获得更好的观看体验。

:::

<div style="position: relative; padding: 30% 45%;">
<iframe style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;" src="https://player.bilibili.com/player.html?aid=756368279&bvid=BV1Nr4y1K7Gj&cid=285382785&page=1" frameborder="no" scrolling="no"></iframe>
</div>

## 题目描述

`n` 块石头放置在二维平面中的一些整数坐标点上。每个坐标点上最多只能有一块石头。

如果一块石头的 **同行或者同列** 上有其他石头存在，那么就可以移除这块石头。

给你一个长度为 `n` 的数组 `stones` ，其中 $stones[i] = [x_i, y_i]$ 表示第 `i` 块石头的位置，返回 **可以移除的石子** 的最大数量。

**示例 1：**

```
输入：stones = [[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]]
输出：5
解释：一种移除 5 块石头的方法如下所示：
1. 移除石头 [2,2] ，因为它和 [2,1] 同行。
2. 移除石头 [2,1] ，因为它和 [0,1] 同列。
3. 移除石头 [1,2] ，因为它和 [1,0] 同行。
4. 移除石头 [1,0] ，因为它和 [0,0] 同列。
5. 移除石头 [0,1] ，因为它和 [0,0] 同行。
石头 [0,0] 不能移除，因为它没有与另一块石头同行/列。
```

**示例 2：**

```
输入：stones = [[0,0],[0,2],[1,1],[2,0],[2,2]]
输出：3
解释：一种移除 3 块石头的方法如下所示：
1. 移除石头 [2,2] ，因为它和 [2,0] 同行。
2. 移除石头 [2,0] ，因为它和 [0,0] 同列。
3. 移除石头 [0,2] ，因为它和 [0,0] 同行。
石头 [0,0] 和 [1,1] 不能移除，因为它们没有与另一块石头同行/列。
```

**示例 3：**

```
输入：stones = [[0,0]]
输出：0
解释：[0,0] 是平面上唯一一块石头，所以不可以移除它。
```

**提示：**

- `1 <= stones.length <= 1000`
- $0 \le x_i, y_i \le 10^4$
- 不会有两块石头放在同一个坐标点上

::: warning 说明
本题详解请见本文的「题解链接」，有视频讲解和文字讲解。
:::
