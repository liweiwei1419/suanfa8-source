---
title: 「力扣」第 1128 题：等价多米诺骨牌对的数量（简单）
icon: shipin
category: 位运算
tags:
  - 位运算
---

- 题目链接：[1128. 等价多米诺骨牌对的数量](https://leetcode-cn.com/problems/number-of-equivalent-domino-pairs/)。

::: danger 视频讲解
:tv: 这道题在 [官方题解](https://leetcode-cn.com/problems/number-of-equivalent-domino-pairs/solution/deng-jie-duo-mi-nuo-gu-pai-dui-de-shu-li-08z8/) 和 [B 站](https://www.bilibili.com/video/BV1fV411q7ZY) 可以收看视频讲解，可以点击下面的视频右上角「去 bilibili 观看」，选择快速播放，获得更好的观看体验。

:::

<div style="position: relative; padding: 30% 45%;">
<iframe style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;" src="https://player.bilibili.com/player.html?aid=416433823&bvid=BV1fV411q7ZY&cid=291046663&page=1" frameborder="no" scrolling="no"></iframe>
</div>
## 题目描述

给你一个由一些多米诺骨牌组成的列表 `dominoes`。

如果其中某一张多米诺骨牌可以通过旋转 `0` 度或 `180` 度得到另一张多米诺骨牌，我们就认为这两张牌是等价的。

形式上，`dominoes[i] = [a, b]` 和 `dominoes[j] = [c, d]` 等价的前提是 `a==c` 且 `b==d`，或是 `a==d` 且 `b==c`。

在 `0 <= i < j < dominoes.length` 的前提下，找出满足 `dominoes[i]` 和 `dominoes[j]` 等价的骨牌对 `(i, j)` 的数量。

**示例：**

```
输入：dominoes = [[1,2],[2,1],[3,4],[5,6]]
输出：1
```

**提示：**

- `1 <= dominoes.length <= 40000`
- `1 <= dominoes[i][j] <= 9`

::: warning 说明
本题详解请见本文的「题解链接」，有视频讲解和文字讲解。
:::
