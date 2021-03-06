---
title: 「力扣」第 1052 题：爱生气的书店老板（中等）
icon: yongyan
category: 滑动窗口
tags:
  - 滑动窗口
---

- 题目链接：[1052. 爱生气的书店老板](https://leetcode-cn.com/problems/grumpy-bookstore-owner/)。

## 题目描述

今天，书店老板有一家店打算试营业 `customers.length` 分钟。每分钟都有一些顾客（`customers[i]`）会进入书店，所有这些顾客都会在那一分钟结束后离开。

在某些时候，书店老板会生气。 如果书店老板在第 `i` 分钟生气，那么 `grumpy[i] = 1`，否则 `grumpy[i] = 0`。当书店老板生气时，那一分钟的顾客就会不满意，不生气则他们是满意的。

书店老板知道一个秘密技巧，能抑制自己的情绪，可以让自己连续 `X` 分钟不生气，但却只能使用一次。

请你返回这一天营业下来，最多有多少客户能够感到满意。

**示例：**

```
输入：customers = [1,0,1,2,1,1,7,5], grumpy = [0,1,0,1,0,1,0,1], X = 3
输出：16
解释：
书店老板在最后 3 分钟保持冷静。
感到满意的最大客户数量 = 1 + 1 + 1 + 1 + 7 + 5 = 16.
```

**提示：**

- `1 <= X <= customers.length == grumpy.length <= 20000`
- `0 <= customers[i] <= 1000`
- `0 <= grumpy[i] <= 1`

## 思路分析

> **关键点**：枚举所有的固定大小的滑动窗口里，「本来因为老板生气不满意，现在因为秘密技巧而感到满意的顾客」的最大值。

- **滑动窗口的最大值**（「力扣」第 239 题）；
- 条件 1：所有这些顾客都会在那一分钟结束后离开；
- 条件 2：书店老板知道一个秘密技巧，能抑制自己的情绪，可以让自己连续 `X` 分钟不生气，但却只能使用一次；

---

- 所有这些顾客都会在那一分钟结束后离开；

- 书店老板知道一个秘密技巧，能抑制自己的情绪，可以让自己连续 X 分钟不生气，但却只能使用一次。

## 方法一：

```Java []
public class Solution {

    // 方法一：滑动窗口
    // 参考资料：https://leetcode-cn.com/problems/grumpy-bookstore-owner/solution/hua-dong-chuang-kou-xiang-xi-jiang-jie-z-80ni/

    public int maxSatisfied(int[] customers, int[] grumpy, int X) {
        int m = customers.length;

        // 第 2 步：统计生气的顾客数
        int grumpyCount = 0;
        for (int i = 0; i < X; ++i) {
            if (grumpy[i] == 1) {
                grumpyCount += customers[i];
            }
        }

        // 第 3 步：固定长度的滑动窗口
        int add = grumpyCount;
        for (int i = X; i < m; ++i) {
            // 第 i 分钟，本来不满意，现在因为秘密技巧而满意的顾客
            // 进入滑动窗口，所以要增加
            if (grumpy[i] == 1) {
                grumpyCount += customers[i];
            }
            // 移出滑动窗口，所以要减少
            if (grumpy[i - X] == 1) {
                grumpyCount -= customers[i - X];
            }

            // 理解这是是关键，在滑动过程中的最大值，「力扣」第 239 题
            add = Math.max(add, grumpyCount);
        }

      	int res = 0;
      	// 第 1 步：统计本来就不生气的顾客数
        for (int i = 0; i < m; ++i) {
            if (grumpy[i] == 0) {
                res += customers[i];
            }
        }
        return res + add;
    }
}
```

## 方法二：

- 先求出原本就满意的客户数；
- 再利用滑动窗口求出 X 区间内所有不满意的用户，两者相加就是最大满意数。

因此问题可以转换为：求出固定 X 窗口大小的滑动窗口内，最大生气值。

```Java []
public class Solution {

    // 参考资料：https://leetcode-cn.com/problems/grumpy-bookstore-owner/solution/qian-zhui-he-hua-dong-chuang-kou-by-liuchuan1992/
    // 前缀和 + 哈希表

    // 先求出原本就满意的客户数，再利用滑动窗口求出 X 区间内所有不满意的用户，两者相加就是最大满意数

    public int maxSatisfied(int[] customers, int[] grumpy, int X) {

        int maxAngryCount = 0;
        // 前缀和
        int len = grumpy.length;
        int[] preSum = new int[len + 1];

        // 统计 1、所有本来就不生气的顾客数量；2、前缀和数组
        int originCount = 0;
        for (int i = 0; i < len; i++) {
            if (grumpy[i] == 0) { // 不生气
                originCount += customers[i];
                preSum[i + 1] = preSum[i];
            } else {
                preSum[i + 1] = preSum[i] + customers[i];
            }
        }

        // 固定长度的滑动窗口的左边界：[i, i + X)
        for (int left = 0; left < len - X + 1; left++) {
            maxAngryCount = Math.max(maxAngryCount, preSum[left + X] - preSum[left]);
        }
        // 所有本来就不生气的顾客
        return originCount + maxAngryCount;
    }
}
```
