---
title: 「力扣」第 152 题：乘积最大子序列（中等）
icon: yongyan
categories: 动态规划
tags:
  - 动态规划
---

+ 题目链接：[152. 乘积最大子数组](https://leetcode-cn.com/problems/maximum-product-subarray/)；

+ 题解链接：[动态规划（理解无后效性）](https://leetcode-cn.com/problems/maximum-product-subarray/solution/er-wei-dong-tai-gui-hua-by-liweiwei1419/)。

## 题目描述

给你一个整数数组 `nums` ，请你找出数组中乘积最大的连续子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。

**示例 1：**

```
输入: [2, 3, -2, 4]
输出: 6
解释: 子数组 [2,3] 有最大乘积 6。
```

**示例 2：**

```
输入: [-2, 0, -1]
输出: 0
解释: 结果不能为 2, 因为 [-2,-1] 不是子数组。
```

**Constraints:**

- `1 <= nums.length <= 2 * 104`
- `-10 <= nums[i] <= 10`
- The product of any prefix or suffix of `nums` is **guaranteed** to fit in a **32-bit** integer.

## 思路分析


这道题思考「状态」以及「状态转移方程」的推导思路类似  [「力扣」第 53 题：最大子序和](https://leetcode-cn.com/problems/maximum-subarray/) ，感兴趣的朋友可以先做一下。我只要把一些特殊的情况考虑清楚，状态转移方程就没有那么难写。

数组的动态规划问题、子序列、连续子序列的一个常见的状态定义是：

> 以下标 `i` 结尾的连续子序列的乘积的最大值。

最后把整个 `dp` 数组看一遍求最大值即可。因此状态转移方程可能是：

```
dp[i] = max(dp[i - 1] * nums[i], nums[i])
```

说明：牢记状态的定义，一定以下标 `i` 结尾，即：**乘积数组中 `nums[i]` 必须被选取**。

+ 如果 `dp[i - 1]` 是负数，乘上 `nums[i]` 还是负数，倒不如另起炉灶。
+ 如果 `nums[i]` 是负数该怎么办呢？`dp[i - 1]` 是正数的时候，越乘越小，`dp[i - 1]` 是负数的时候，越乘越大，于是我们可能就需要记录一下负数的那个最小数。

::: info 提示
遇到这样的问题，其实就在提示我们状态不够用了。因此，需要在原来的一维 `dp` 后面新增一个状态。
:::

针对这道题，第 2 维状态只需要两个：

+ 用 `0` 表示遍历的过程中得到的以 `nums[i]` 结尾的连续子序列的乘积的最小值；
+ 用 `1` 表示遍历的过程中得到的以 `nums[i]` 结尾的连续子序列的乘积的最大值。

当 `nums[i] = 0` 的时候包含在上面二者之中，无需单独讨论。

状态转移方程写在了参考代码 1 中。即使用二维状态数组同时记录乘积的最大值和最小值，本来写了一堆文字的，后来看太长了，好多废话，直接看代码比较清楚一些。

这里就声明一下状态：

+ `dp[i][1]` 表示：以 `nums[i]` 结尾的连续子序列的乘积的最大值；
+ `dp[i][0]` 表示：以 `nums[i]` 结尾的连续子序列的乘积的最小值。

**参考代码 1**：

```java
public class Solution {


    public int maxProduct(int[] nums) {
        int len = nums.length;
        if (len == 0) {
            return 0;
        }

        // 状态定义：以索引 i 结尾
        int[][] dp = new int[len][2];

        dp[0][0] = nums[0];
        dp[0][1] = nums[0];

        for (int i = 1; i < len; i++) {
            if (nums[i] >= 0) {
                dp[i][1] = Math.max(nums[i], dp[i - 1][1] * nums[i]);
                dp[i][0] = Math.min(nums[i], dp[i - 1][0] * nums[i]);
            } else {
                dp[i][1] = Math.max(nums[i], dp[i - 1][0] * nums[i]);
                dp[i][0] = Math.min(nums[i], dp[i - 1][1] * nums[i]);
            }
        }

        int res = dp[0][1];
        for (int i = 1; i < len; i++) {
            res = Math.max(res, dp[i][1]);
        }
        return res;
    }

}
```
**复杂度分析**：
+ 时间复杂度：$O(N)$，这里 $N$ 表示数组的长度；
+ 空间复杂度：$O(N)$，使用了两个状态数组，每一个数组的规模是 $N$。

或者设置两个状态数组，这样语义会更清晰一些。

**参考代码 2**：

```java
public class Solution {

    // 参考：「力扣」第 53 题思路

    public int maxProduct(int[] nums) {
        int len = nums.length;
        if (len == 0) {
            return 0;
        }

        // 状态定义：以索引 i 结尾
        // 思考清楚一种特例： [2, -1 ,3]，前面乘起来是负数的话，倒不如另起炉灶
        int[] maxDp = new int[len];
        int[] minDp = new int[len];

        maxDp[0] = nums[0];
        minDp[0] = nums[0];

        for (int i = 1; i < len; i++) {
            if (nums[i] >= 0) {
                maxDp[i] = Math.max(nums[i], maxDp[i - 1] * nums[i]);
                minDp[i] = Math.min(nums[i], minDp[i - 1] * nums[i]);
            } else {
                maxDp[i] = Math.max(nums[i], minDp[i - 1] * nums[i]);
                minDp[i] = Math.min(nums[i], maxDp[i - 1] * nums[i]);
            }
        }

        int res = maxDp[0];
        for (int i = 1; i < len; i++) {
            res = Math.max(res, maxDp[i]);
        }
        return res;
    }
}
```

**复杂度分析**：（同上）。

因为每一个状态只与前一个状态有关，可以使用「滚动变量」技巧，使用常数个变量完成这道问题。

**参考代码 3**：


```java
public class Solution {

    public int maxProduct(int[] nums) {
        int len = nums.length;
        if (len == 0) {
            return 0;
        }

        int preMax = nums[0];
        int preMin = nums[0];
        int curMax;
        int curMin;

        int res = nums[0];
        for (int i = 1; i < len; i++) {
            if (nums[i] >= 0) {
                curMax = Math.max(preMax * nums[i], nums[i]);
                curMin = Math.min(preMin * nums[i], nums[i]);
            } else {
                curMax = Math.max(preMin * nums[i], nums[i]);
                curMin = Math.min(preMax * nums[i], nums[i]);
            }
            res = Math.max(res, curMax);

            // 滚动变量
            preMax = curMax;
            preMin = curMin;
        }
        return res;
    }
}
```
**复杂度分析**：
+ 时间复杂度：$O(N)$，这里 $N$ 表示数组的长度；
+ 空间复杂度：$O(1)$，使用了常数个变量。