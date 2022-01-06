---
title: 「力扣」第 494 题：目标和（中等）
icon: yongyan
category: 动态规划
tags:
  - 动态规划
---

+ [题目链接](https://leetcode-cn.com/problems/combination-sum/)
+ [题解链接](https://leetcode-cn.com/problems/combination-sum/solution/hui-su-suan-fa-jian-zhi-python-dai-ma-java-dai-m-2/)

## 题目描述

给定一个非负整数数组，a1, a2, ..., an, 和一个目标数，S。现在你有两个符号 `+` 和 `-`对于数组中的任意一个整数，你都可以从 `+` 或 `-`中选择一个符号添加在前面。

返回可以使最终数组和为目标数 S 的所有添加符号的方法数。

**示例 1:**

```
输入: nums: [1, 1, 1, 1, 1], S: 3
输出: 5
解释: 

-1+1+1+1+1 = 3
+1-1+1+1+1 = 3
+1+1-1+1+1 = 3
+1+1+1-1+1 = 3
+1+1+1+1-1 = 3

一共有5种方法让最终目标和为3。
```

**注意:**

1. 数组的长度不会超过20，并且数组中的值全为正数。
2. 初始的数组的和不会超过1000。
3. 保证返回的最终结果为32位整数。

**参考代码**：

```java
public class Solution3 {

    // 方法二：动态规划（一维状态数组）

    public int findTargetSumWays(int[] nums, int S) {
        int len = nums.length;
        if (len == 0) {
            return 0;
        }

        int sum = 0;
        for (int num : nums) {
            sum += num;
        }

        if (S > sum) {
            return 0;
        }

        int target = sum + S;
        if ((target & 1) != 0) {
            return 0;
        }

        target /= 2;
        int[] dp = new int[target + 1];
        dp[0] = 1;
        for (int num : nums) {
            for (int j = target; j >= num; j--) {
                dp[j] += dp[j - num];
            }
        }
        return dp[target];
    }
}
```



