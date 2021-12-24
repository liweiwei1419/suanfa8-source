---
title: 「力扣」第 977 题：有序数组的平方（简单）
icon: yongyan
category: 双指针
tags:
  - 双指针
---

## 题目描述

+ [题目链接](https://leetcode-cn.com/problems/squares-of-a-sorted-array/)

给你一个按 **非递减顺序** 排序的整数数组 `nums`，返回 **每个数字的平方** 组成的新数组，要求也按 **非递减顺序** 排序。

示例 1：

```
输入：nums = [-4,-1,0,3,10]

输出：[0,1,9,16,100]

解释：平方后，数组变为 [16,1,0,9,100]

排序后，数组变为 [0,1,9,16,100]
```

示例 2：

```
输入：nums = [-7,-3,2,3,11]

输出：[4,9,9,49,121]
```

![img](https://tva1.sinaimg.cn/large/008i3skNgy1gu5ou27u5kj60na0bqmxm02.jpg)

## 理解题意

注意题目中给出的条件：给出的数组 `nums` 是一个非递减数组。

## 解题思路

```java
public class Solution {

    public int[] sortedSquares(int[] A) {
        int len = A.length;
        int[] res = new int[len];

        // 从后向前赋值，平方值最大的数只能出现在输入数组的头和尾
        int index = len - 1;
        int left = 0;
        int right = len - 1;
        while (left <= right) {
            if (A[left] * A[left] > A[right] * A[right]) {
                res[index] = A[left] * A[left];
                left++;
            } else {
                res[index] = A[right] * A[right];
                right--;
            }
            index--;
        }
        return res;
    }
}
```

