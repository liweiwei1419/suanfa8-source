---
title: 「力扣」第 1202 题：交换字符串中的元素（中等）
icon: shipin
category: 并查集
tags:
  - 并查集
---

- 题目链接：[1202. 交换字符串中的元素](https://leetcode-cn.com/problems/smallest-string-with-swaps/)；
- 题解链接：[🎦 1202. 交换字符串中的元素](https://leetcode-cn.com/problems/smallest-string-with-swaps/solution/1202-jiao-huan-zi-fu-chuan-zhong-de-yuan-wgab/)。

::: danger 视频讲解
:tv: 这道题在 [官方题解](https://leetcode-cn.com/problems/smallest-string-with-swaps/solution/1202-jiao-huan-zi-fu-chuan-zhong-de-yuan-wgab/) 和 [B 站](https://www.bilibili.com/video/BV1Yh41127VH) 可以收看视频讲解，可以点击下面的视频右上角「去 bilibili 观看」，选择快速播放，获得更好的观看体验。

:::

<div style="position: relative; padding: 30% 45%;">
<iframe style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;" src="https://player.bilibili.com/player.html?aid=203640244&bvid=BV1Yh41127VH&cid=282280079&page=1" frameborder="no" scrolling="no"></iframe>
</div>

## 题目描述

给你一个字符串 `s`，以及该字符串中的一些「索引对」数组 `pairs`，其中 `pairs[i] = [a, b]` 表示字符串中的两个索引（编号从 0 开始）。

你可以 **任意多次交换** 在 `pairs` 中任意一对索引处的字符。

返回在经过若干次交换后，`s` 可以变成的按字典序最小的字符串。

**示例 1:**

```
输入：s = "dcab", pairs = [[0,3],[1,2]]
输出："bacd"
解释：
交换 s[0] 和 s[3], s = "bcad"
交换 s[1] 和 s[2], s = "bacd"
```

**示例 2：**

```
输入：s = "dcab", pairs = [[0,3],[1,2],[0,2]]
输出："abcd"
解释：
交换 s[0] 和 s[3], s = "bcad"
交换 s[0] 和 s[2], s = "acbd"
交换 s[1] 和 s[2], s = "abcd"
```

**示例 3：**

```
输入：s = "cba", pairs = [[0,1],[1,2]]
输出："abc"
解释：
交换 s[0] 和 s[1], s = "bca"
交换 s[1] 和 s[2], s = "bac"
交换 s[0] 和 s[1], s = "abc"
```

**提示：**

- `1 <= s.length <= 10^5`
- `0 <= pairs.length <= 10^5`
- `0 <= pairs[i][0], pairs[i][1] < s.length`
- `s` 中只含有小写英文字母

::: warning 说明
本题详解请见本文的「题解链接」，有视频讲解和文字讲解。
:::
