---
title: 「力扣」第 238 题：除自身以外数组的乘积（中等）
icon: yongyan
category: 动态规划
tags:
  - 动态规划
---



+ 题目地址：[238. 除自身以外数组的乘积](https://leetcode-cn.com/problems/product-of-array-except-self/)。


Java 代码：
```java
import java.util.Arrays;

public class Solution {

    public int[] productExceptSelf(int[] nums) {
        int len = nums.length;

        // 前缀乘积：prefixPro[i] 表示区间 [0, i - 1] 所有元素的乘积
        // 转移方程：prefixPro[i] = nums[i - 1] * prefixPro[i - 1]
        int[] prefixPro = new int[len];
        prefixPro[0] = 1;
        for (int i = 1; i < len; i++) {
            prefixPro[i] = nums[i - 1] * prefixPro[i - 1];
        }
        // System.out.println(Arrays.toString(prefixPro));

        // 后缀乘积：suffixPro[i] 表示区间 [i + 1, len - 1] 所有元素的乘积
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