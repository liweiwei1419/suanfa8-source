---
title: 「力扣」第 1482 题：制作 m 束花所需的最少天数（中等）
icon: yongyan
category: 二分查找
tags:
  - 二分查找
---

- 题目链接：[1482. 制作 m 束花所需的最少天数](https://leetcode-cn.com/problems/minimum-number-of-days-to-make-m-bouquets/)。

## 题目描述

给你一个整数数组 `bloomDay`，以及两个整数 `m` 和 `k` 。

现需要制作 `m` 束花。制作花束时，需要使用花园中 **相邻的 `k` 朵花** 。

花园中有 `n` 朵花，第 `i` 朵花会在 `bloomDay[i]` 时盛开，**恰好** 可以用于 **一束** 花中。

请你返回从花园中摘 `m` 束花需要等待的最少的天数。如果不能摘到 `m` 束花则返回 **-1** 。

**示例 1：**

```
输入：bloomDay = [1,10,3,10,2], m = 3, k = 1
输出：3
解释：让我们一起观察这三天的花开过程，x 表示花开，而 _ 表示花还未开。
现在需要制作 3 束花，每束只需要 1 朵。
1 天后：[x, _, _, _, _]   // 只能制作 1 束花
2 天后：[x, _, _, _, x]   // 只能制作 2 束花
3 天后：[x, _, x, _, x]   // 可以制作 3 束花，答案为 3
```

**示例 2：**

```
输入：bloomDay = [1,10,3,10,2], m = 3, k = 2
输出：-1
解释：要制作 3 束花，每束需要 2 朵花，也就是一共需要 6 朵花。而花园中只有 5 朵花，无法满足制作要求，返回 -1 。
```

**示例 3：**

```
输入：bloomDay = [7,7,7,7,12,7,7], m = 2, k = 3
输出：12
解释：要制作 2 束花，每束需要 3 朵。
花园在 7 天后和 12 天后的情况如下：
7 天后：[x, x, x, x, _, x, x]
可以用前 3 朵盛开的花制作第一束花。但不能使用后 3 朵盛开的花，因为它们不相邻。
12 天后：[x, x, x, x, x, x, x]
显然，我们可以用不同的方式制作两束花。
```

**示例 4：**

```
输入：bloomDay = [1000000000,1000000000], m = 1, k = 1
输出：1000000000
解释：需要等 1000000000 天才能采到花来制作花束
```

**示例 5：**

```
输入：bloomDay = [1,10,2,9,3,8,4,7,5,6], m = 4, k = 2
输出：9
```

**提示：**

- `bloomDay.length == n`
- `1 <= n <= 10^5`
- `1 <= bloomDay[i] <= 10^9`
- `1 <= m <= 10^6`
- `1 <= k <= n`

## 题意分析

依然是题目用着重号强调了「需要使用花园中 **相邻的 `k` 朵花**」（连续），并且花朵数量这件事情肯定是正数。

分析单调性和左右逼近留给读者。

**参考代码**：

```java
public class Solution {

    public int minTime(int[] time, int m) {
        int sum = 0;
        for (int num : time) {
            sum += num;
        }

        int left = 0;
        int right = sum;

        while (left < right) {
            int mid = (left + right) >>> 1;
            // mid 是 T 值的意思
            int splits = split(time, mid);
            if (splits > m) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    }

    private int split(int[] nums, long maxSum) {
        int splits = 1;

        int len = nums.length;
        int curMax = nums[0];
        int tempSum = nums[0];

        for (int i = 1; i < len; i++) {
            curMax = Math.max(curMax, nums[i]);
            if (tempSum + nums[i] - curMax > maxSum) {
                tempSum = 0;
                curMax = nums[i];
                splits++;
            }
            tempSum += nums[i];
        }
        return splits;
    }
}
```
