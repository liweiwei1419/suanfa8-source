---
title: 「力扣」第 238 题：除自身以外数组的乘积（中等）
icon: yongyan
category: 动态规划
tags:
  - 动态规划
---

+ 题目地址：[238. 除自身以外数组的乘积](https://leetcode-cn.com/problems/product-of-array-except-self/)。

## 题目描述

给你一个长度为 *n* 的整数数组 `nums`，其中 *n* > 1，返回输出数组 `output` ，其中 `output[i]` 等于 `nums` 中除 `nums[i]` 之外其余各元素的乘积。

**示例:**

```
输入: [1,2,3,4]
输出: [24,12,8,6]
```

**提示：**题目数据保证数组之中任意元素的全部前缀元素和后缀（甚至是整个数组）的乘积都在 32 位整数范围内。

**说明:** 请**不要使用除法，**且在 O(*n*) 时间复杂度内完成此题。

**进阶：**
你可以在常数空间复杂度内完成这个题目吗？（ 出于对空间复杂度分析的目的，输出数组**不被视为**额外空间。）

**参考代码**：

```java
import java.util.Arrays;

public class Solution {

    public int[] productExceptSelf(int[] nums) {
        int len = nums.length;

        // 前缀乘积：prefixPro[i] 表示区间 [0..i - 1] 所有元素的乘积
        // 转移方程：prefixPro[i] = nums[i - 1] * prefixPro[i - 1]
        int[] prefixPro = new int[len];
        prefixPro[0] = 1;
        for (int i = 1; i < len; i++) {
            prefixPro[i] = nums[i - 1] * prefixPro[i - 1];
        }
        // System.out.println(Arrays.toString(prefixPro));

        // 后缀乘积：suffixPro[i] 表示区间 [i + 1..len - 1] 所有元素的乘积
        // 转移方程：suffixPro[i] = nums[i + 1] * suffixPro[i + 1]
        int[] suffixPro = new int[len];
        suffixPro[len - 1] = 1;
        for (int i = len - 2; i >= 0; i--) {
            suffixPro[i] = nums[i + 1] * suffixPro[i + 1];
        }
        // System.out.println(Arrays.toString(suffixPro));

        int[] res = new int[len];
        for (int i = 0; i < len; i++) {
            res[i] = prefixPro[i] * suffixPro[i];
        }
        return res;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] nums = {1, 2, 3, 4};

        int[] res = solution.productExceptSelf(nums);
        System.out.println(Arrays.toString(res));
    }
}
```