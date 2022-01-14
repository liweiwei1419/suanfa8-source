---
title: 「力扣」第 907 题：子数组的最小值之和（中等）
icon: yongyan
category: 栈
tags:
  - 栈
  - 单调栈
---

- 题目链接：[907. 子数组的最小值之和](https://leetcode-cn.com/problems/sum-of-subarray-minimums/)。

## 题目描述

给定一个整数数组 `arr`，找到 `min(b)` 的总和，其中 `b` 的范围为 `arr` 的每个（连续）子数组。

由于答案可能很大，因此 **返回答案模** `**10^9 + 7**` **。**

**示例 1：**

```
输入：arr = [3,1,2,4]
输出：17
解释：
子数组为 [3]，[1]，[2]，[4]，[3,1]，[1,2]，[2,4]，[3,1,2]，[1,2,4]，[3,1,2,4]。
最小值为 3，1，2，4，1，1，2，1，1，1，和为 17。
```

**示例 2：**

```
输入：arr = [11,81,94,43,3]
输出：444
```

**提示：**

- `1 <= arr.length <= 3 * 10^4`

- `1 <= arr[i] <= 3 * 10^4`

> 根据提示，知道需要一次遍历，空间换时间，选择合适的数据结构。

## 题意分析

找 **所有**、**连续** 子数组的最小值的和。

## 方法：单调栈

**参考代码**：

```java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {

    public int sumSubarrayMins(int[] A) {
        int MOD = 1_000_000_007;
        int N = A.length;

        // 第 1 步：计算当前下标 i 的左边第 1 个比 A[i] 小的元素的下标
        Deque<Integer> stack1 = new ArrayDeque<>();
        int[] prev = new int[N];
        for (int i = 0; i < N; i++) {
            while (!stack1.isEmpty() && A[i] <= A[stack1.peekLast()]) {
                stack1.removeLast();
            }
            prev[i] = stack1.isEmpty() ? -1 : stack1.peekLast();
            stack1.addLast(i);
        }

        // 第 2 步：计算当前下标 i 的右边第 1 个比 A[i] 小的元素的下标
        Deque<Integer> stack2 = new ArrayDeque<>();
        int[] next = new int[N];
        for (int i = N - 1; i >= 0; i--) {
            while (!stack2.isEmpty() && A[i] < A[stack2.peekLast()]) {
                stack2.removeLast();
            }
            next[i] = stack2.isEmpty() ? N : stack2.peekLast();
            stack2.addLast(i);
        }

        // 第 3 步：计算结果
        long ans = 0;
        for (int i = 0; i < N; ++i) {
            // 注意：乘法可能越界，须要先转成 long 类型
            ans += (long) (i - prev[i]) * (next[i] - i) % MOD * A[i] % MOD;
            ans %= MOD;
        }
        return (int) ans;
    }
}
```
