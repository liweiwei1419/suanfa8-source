---
title: 「力扣」第 1203 题：项目管理（困难）
icon: shipin
category: 广度优先遍历
tags:
  - 广度优先遍历
  - 拓扑排序
---

- 题目链接：[1203. 项目管理（困难）](https://leetcode-cn.com/problems/sort-items-by-groups-respecting-dependencies/)；
- :tv: 题解链接：[视频题解与文字题解](https://leetcode-cn.com/problems/sort-items-by-groups-respecting-dependencies/solution/1203-xiang-mu-guan-li-by-leetcode-t63b/)。

::: danger 视频讲解
:tv: 这道题在 [官方题解](https://leetcode-cn.com/problems/sort-items-by-groups-respecting-dependencies/solution/1203-xiang-mu-guan-li-by-leetcode-t63b/) 和 [B 站](https://www.bilibili.com/video/BV1iy4y1m7ye) 可以收看视频讲解，可以点击下面的视频右上角「去 bilibili 观看」，选择快速播放，获得更好的观看体验。

:::

<div style="position: relative; padding: 30% 45%;">
<iframe style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;" src="https:////player.bilibili.com/player.html?aid=798749392&bvid=BV1iy4y1m7ye&cid=284091196&page=1" frameborder="no" scrolling="no"></iframe>
</div>

## 题目描述

公司共有 `n` 个项目和 `m` 个小组，每个项目要不没有归属，要不就由其中的一个小组负责。

我们用 `group[i]` 代表第 `i` 个项目所属的小组，如果这个项目目前无人接手，那么 `group[i]` 就等于 $-1$。（项目和小组都是从零开始编号的）

请你帮忙按要求安排这些项目的进度，并返回排序后的项目列表：

- 同一小组的项目，排序后在列表中彼此相邻；
- 项目之间存在一定的依赖关系，我们用一个列表 `beforeItems` 来表示，其中 `beforeItems[i]` 表示在进行第 `i` 个项目前（位于第 `i` 个项目左侧）应该完成的所有项目。

**结果要求**：

- 如果存在多个解决方案，只需要返回其中任意一个即可。
- 如果没有合适的解决方案，就请返回一个 **空列表**。

关键：每个项目要不没有归属，要不就由其中的一个小组负责。

**示例 1**：

![img](https://tva1.sinaimg.cn/large/e6c9d24egy1h2tpf40064j205b051mx4.jpg)

```
输入：n = 8, m = 2, group = [-1,-1,1,0,0,1,0,-1], beforeItems = [[],[6],[5],[6],[3,6],[],[],[]]
输出：[6,3,4,1,5,2,0,7]
```

**示例 2**：

```
输入：n = 8, m = 2, group = [-1,-1,1,0,0,1,0,-1], beforeItems = [[],[6],[5],[6],[3],[],[4],[]]
输出：[]
解释：与示例 1 大致相同，但是在排序后的列表中，4 必须放在 6 的前面。
```

**提示：**

- `1 <= m <= n <= 3 * 10^4`
- `group.length == beforeItems.length == n`
- `-1 <= group[i] <= m - 1`
- `0 <= beforeItems[i].length <= n - 1`
- `0 <= beforeItems[i][j] <= n - 1`
- `i != beforeItems[i][j]`
- `beforeItems[i]` 不含重复元素

（请见上面「题解链接」，有视频讲解与文字题解。）
