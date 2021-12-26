---
title: 「力扣」第 977 题：有序数组的平方（简单）
icon: yongyan
category: 双指针
tags:
  - 双指针
---

+ 题目链接：[977. 有序数组的平方](https://leetcode-cn.com/problems/squares-of-a-sorted-array/)。

## 题目描述

给你一个按 **非递减顺序** 排序的整数数组 `nums`，返回 **每个数字的平方** 组成的新数组，要求也按 **非递减顺序** 排序。

**示例 1：**

```
输入：nums = [-4,-1,0,3,10]

输出：[0,1,9,16,100]

解释：平方后，数组变为 [16,1,0,9,100]

排序后，数组变为 [0,1,9,16,100]
```

**示例 2：**

```
输入：nums = [-7,-3,2,3,11]

输出：[4,9,9,49,121]
```

**提示：**

- $1 \le nums.length \le 10^4$
- $-10^4 \le nums[i] \le 10^4$
- `nums` 已按 **非递减顺序** 排序

**进阶：**

- 请你设计时间复杂度为 `O(n)` 的算法解决本问题

## 理解题意

注意题目中给出的条件：给出的数组 `nums` 是一个非递减数组。

## 方法一：暴力解法

**参考代码 1**：

```Java []
import java.util.Arrays;

public class Solution {

    public int[] sortedSquares(int[] A) {
        int len = A.length;
        int[] res = new int[len];
        for (int i = 0; i < len; i++) {
            res[i] = A[i] * A[i];
        }
        Arrays.sort(res);
        return res;
    }
}
```

## 方法二：双指针

**参考代码 2**：

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



```Java []
public class Solution {

    public int[] sortedSquares(int[] A) {
        int n = A.length;
        int[] ans = new int[n];

        // 从后向前赋值
        int index = n - 1;
        // 双指针
        int left = 0;
        int right = n - 1;
        while (left <= right) {
            if (A[left] * A[left] > A[right] * A[right]) {
                ans[index] = A[left] * A[left];
                left++;
            } else {
                ans[index] = A[right] * A[right];
                right--;
            }
            index--;
        }
        return ans;
    }
}
```
