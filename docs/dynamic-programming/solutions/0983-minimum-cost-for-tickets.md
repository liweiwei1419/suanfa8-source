---
title: 「力扣」第 983 题：最低票价（中等）
icon: yongyan
category: 动态规划
tags:
  - 动态规划
---

- 题目链接：[983. 最低票价](https://leetcode-cn.com/problems/minimum-cost-for-tickets)。

## 题目描述

在一个火车旅行很受欢迎的国度，你提前一年计划了一些火车旅行。在接下来的一年里，你要旅行的日子将以一个名为 ys 的数组给出。每一项是一个从 1 到 365 的整数。

火车票有三种不同的销售方式：

- 一张为期一天的通行证售价为 `costs[0]` 美元；
- 一张为期七天的通行证售价为 `costs[1]` 美元；
- 一张为期三十天的通行证售价为 `costs[2]` 美元。
  通行证允许数天无限制的旅行。 例如，如果我们在第 2 天获得一张为期 7 天的通行证，那么我们可以连着旅行 7 ：第 2 天、第 3 天、第 4 天、第 5 天、第 6 天、第 7 天和第 8 天。

返回你想要完成在给定的列表 `days` 中列出的每一天的旅行所需要的最低消费。

示例 1：

```
输入：days = [1,4,6,7,8,20], costs = [2,7,15]
输出：11
解释：
例如，这里有一种购买通行证的方法，可以让你完成你的旅行计划：
在第 1 天，你花了 costs[0] = $2 买了一张为期 1 天的通行证，它将在第 1 天生效。
在第 3 天，你花了 costs[1] = $7 买了一张为期 7 天的通行证，它将在第 3, 4, ..., 9 天生效。
在第 20 天，你花了 costs[0] = $2 买了一张为期 1 天的通行证，它将在第 20 天生效。
你总共花了 $11，并完成了你计划的每一天旅行。

```

示例 2：

```
输入：days = [1,2,3,4,5,6,7,8,9,10,30,31], costs = [2,7,15]
输出：17
解释：
例如，这里有一种购买通行证的方法，可以让你完成你的旅行计划：
在第 1 天，你花了 costs[2] = $15 买了一张为期 30 天的通行证，它将在第 1, 2, ..., 30 天生效。
在第 31 天，你花了 costs[0] = $2 买了一张为期 1 天的通行证，它将在第 31 天生效。
你总共花了 $17，并完成了你计划的每一天旅行。
```

提示：

- `1 <= days.length <= 365`
- `1 <= days[i] <= 365`
- `days 按顺序严格递增`
- `costs.length == 3`
- `1 <= costs[i] <= 1000`

## 方法：动态规划

> 提示：
>
> 1、动态规划问题常常用于多阶段问题求解，跟这道问题很类似的有「股票问题」，即「一天一天地求出到今天为止的最少利润」；
>
> 2、要注意一些细节的问题，这里细节的问题体现在代码中了。

Java 代码：

```java
import java.util.Arrays;

public class Solution {

    public int mincostTickets(int[] days, int[] costs) {
        int len = days.length;
        int lastDay = days[len - 1];

        // 数组的作用是代替哈希表，以便后续快速检测是否当天有旅行
        int[] hashMap = new int[366];
        for (int day : days) {
            hashMap[day]++;
        }

        // dp[i]：到下标为 i 的这一天，旅行所需要的最低消费
        int[] dp = new int[lastDay + 1];
        for (int i = 1; i <= lastDay; i++) {
            if (hashMap[i] == 1) {
                dp[i] = min(dp[Math.max(0, i - 1)] + costs[0], dp[Math.max(0, i - 7)] + costs[1], dp[Math.max(0, i - 30)] + costs[2]);
            } else {
                dp[i] = dp[i - 1];
            }
        }
        return dp[lastDay];
    }

    private int min(int a, int b, int c) {
        return Math.min(a, Math.min(b, c));
    }

    public static void main(String[] args) {
        int[] days = {1, 4, 6, 7, 8, 20};
        int[] costs = {7, 2, 15};
//        int[] days = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 30, 31};
//        int[] costs = {2, 7, 15};
        Solution solution = new Solution();
        int res = solution.mincostTickets(days, costs);
        System.out.println(res);
    }
}
```
