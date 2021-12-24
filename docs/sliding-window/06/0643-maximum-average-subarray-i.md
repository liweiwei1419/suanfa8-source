---
title: 「力扣」第 643 题：子数组最大平均数 I（简单）
icon: yongyan
category: 滑动窗口
tags:
  - 滑动窗口
---

+ 题目链接：[643. 子数组最大平均数 I](https://leetcode-cn.com/problems/maximum-average-subarray-i/)。

## 题目描述

给你一个由 `n` 个元素组成的整数数组 `nums` 和一个整数 `k` 。

请你找出平均数最大且 **长度为 `k`** 的连续子数组，并输出该最大平均数。

任何误差小于 `10-5` 的答案都将被视为正确答案。

 

**示例 1：**

```
输入：nums = [1,12,-5,-6,50,3], k = 4
输出：12.75
解释：最大平均数 (12-5-6+50)/4 = 51/4 = 12.75
```

**示例 2：**

```
输入：nums = [5], k = 1
输出：5.00000
```

**提示：**

- `n == nums.length`
- $1 \le k \le n \le 10^5$
- $-104 \le nums[i] \le 10^4$

## 暴力解法

暴力解法需要计算 **所有** 长度为 `k` 的连续子区间的和的平均值，时间复杂度为 $O(N^2)$（这里 $N$ 是数组的长度）。而 **暴力解法考虑的「滑动窗口」有重合的部分**。

## 方法：滑动窗口

根据下面的幻灯片，我们把第 1 个长度为 `k` 的连续子区间的和计算出来以后，后面的长度为 `k` 的连续子区间的和就可以以 $O(1)$ 的时间复杂度计算出来。


**参考代码**：

```Java []
public class Solution {
    
    public double findMaxAverage(int[] nums, int k) {
        int len = nums.length;
        // 因为题目限制了 k <= len，因此不用做特判
        int windowSum = 0;
        for (int i = 0; i < k; i++) {
            windowSum += nums[i];
        }
        int res = windowSum;

        // 边界问题
        for (int i = k; i < len; i++) {
            windowSum = windowSum + nums[i] - nums[i - k];
            res = Math.max(res, windowSum);
        }
        return (double) res / k;
    }
}
```

