---
title: 「力扣」第 306 题：累加数（中等）
icon: yongyan
categories: 回溯算法
tags:
  - 回溯算法
  - 递归
  - 树形问题
  - 深度优先遍历
---

+ 题目链接：[「力扣」第 306 题：累加数（中等）](https://leetcode-cn.com/problems/additive-number/)。

## 题目描述

累加数是一个字符串，组成它的数字可以形成累加序列。

一个有效的累加序列必须至少包含 3 个数。除了最开始的两个数以外，字符串中的其他数都等于它之前两个数相加的和。

给定一个只包含数字 '0'-'9' 的字符串，编写一个算法来判断给定输入是否是累加数。

**说明**: 累加序列里的数不会以 0 开头，所以不会出现 1, 2, 03 或者 1, 02, 3 的情况。

**示例 1:**

```
输入: "112358"
输出: true 
解释: 累加序列为: 1, 1, 2, 3, 5, 8 。1 + 1 = 2, 1 + 2 = 3, 2 + 3 = 5, 3 + 5 = 8
```

**示例 2:**

```
输入: "199100199"
输出: true 
解释: 累加序列为: 1, 99, 100, 199。1 + 99 = 100, 99 + 100 = 199
```

**进阶:**
你如何处理一个溢出的过大的整数输入?

## 方法：回溯 + 剪枝

只能做 3 个分割。

**参考代码**：这个版本不是标准的大整数的版本。

```java
public class Solution {

    public boolean isAdditiveNumber(String num) {
        int len = num.length();
        char[] charArray = num.toCharArray();
        return dfs(charArray, len, 0, 0, 0, 0);
    }

    private boolean dfs(char[] charArray, int len, int begin, long num1, long num2, int k) {
        if (begin == len) {
            return k > 2;
        }

        long num3 = 0;
        for (int i = begin; i < len; i++) {
            num3 = num3 * 10 + (charArray[i] - '0');
            if (i > begin && charArray[begin] == '0') {
                continue;
            }

            if (k >= 2 && num3 != (num1 + num2)) {
                continue;
            }
            if (dfs(charArray, len, i + 1, num2, num3, k + 1)) {
                return true;
            }
        }
        return false;
    }
}
```

