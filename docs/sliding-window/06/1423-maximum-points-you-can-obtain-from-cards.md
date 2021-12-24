---
title: 「力扣」第 1423 题：可获得的最大点数（中等）
icon: yongyan
category: 滑动窗口
tags:
  - 滑动窗口
---


+ 题目链接：[可获得的最大点数](https://leetcode-cn.com/problems/maximum-points-you-can-obtain-from-cards/)

**参考代码**：

```java
public class Solution {

    // 方法二：固定长度（len - k）的滑动窗口问题
    // 目标：使得 k 最大，就要使得 len - k 窗口最小
    // 我们可以拿走的部分在头和尾，中间的那部分是连续的

    public int maxScore(int[] cardPoints, int k) {
        int len = cardPoints.length;
        // 滑动窗口大小为 n - k
        int windowSize = len - k;

        // 第 1 步：初始化 n - k 大小的滑动窗口的和
        int windowSum = 0;
        for (int i = 0; i < windowSize; i++) {
            windowSum += cardPoints[i];
        }

        // 第 2 步：计算滑动窗口的最小值
        int sum = windowSum;
        int windowMinSum = windowSum;
        for (int i = windowSize; i < len; i++) {
            windowSum = windowSum + cardPoints[i] - cardPoints[i - windowSize];
            windowMinSum = Math.min(windowMinSum, windowSum);
            sum += cardPoints[i];
        }
        return sum - windowMinSum;
    }
}
```

