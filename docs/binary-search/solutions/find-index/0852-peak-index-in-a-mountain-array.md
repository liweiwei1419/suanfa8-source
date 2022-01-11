---
title: 「力扣」第 852 题：山脉数组的峰顶索引（简单）
icon: yongyan
category: 二分查找
tags:
  - 二分查找
---

+ 题目链接：[852. 山脉数组的峰顶索引](https://leetcode-cn.com/problems/peak-index-in-a-mountain-array/)。

## 题目描述

符合下列属性的数组 `arr` 称为 **山脉数组** ：

- `arr.length >= 3`
- 存在 `i`（`0 < i < arr.length - 1`）使得：
  - `arr[0] < arr[1] < ... arr[i-1] < arr[i]`
  - `arr[i] > arr[i+1] > ... > arr[arr.length - 1]`

给你由整数组成的山脉数组 `arr` ，返回任何满足 `arr[0] < arr[1] < ... arr[i - 1] < arr[i] > arr[i + 1] > ... > arr[arr.length - 1]` 的下标 `i` 。

**示例 1：**

```
输入：arr = [0,1,0]
输出：1
```

**示例 2：**

```
输入：arr = [0,2,1,0]
输出：1
```

**示例 3：**

```
输入：arr = [0,10,5,2]
输出：1
```

**示例 4：**

```
输入：arr = [3,4,5,1]
输出：2
```

**示例 5：**

```
输入：arr = [24,69,100,99,79,78,67,36,26,19]
输出：2
```

**提示：**

- `3 <= arr.length <= 10^4`
- `0 <= arr[i] <= 10^6`
- 题目数据保证 `arr` 是一个山脉数组

**进阶：**很容易想到时间复杂度 `O(n)` 的解决方案，你可以设计一个 `O(log(n))` 的解决方案吗？

## 思路分析

+ **根据题目中的描述**，题目中的描述虽然是「任何」，英文描述为 `any`，实施上「峰顶」是唯一的；
+ 在 `arr[mid] < arr[mid + 1]`  的时候，`mid` 以及 `mid` 的左边一定不存在山脉数组的「峰顶」，封顶只可能存在于下标区间 `[mid + 1..right]` ，此时设置 `left = mid + 1`；
+ 否则，就在下标区间 `[left..mid]` 里查找答案，此时设置 `right = mid`。

**参考代码**：

```java
public class Solution {

    public int peakIndexInMountainArray(int[] arr) {
        int len = arr.length;
        int left = 1;
        int right = len - 2;
        while (left < right) {
            int mid = (left + right) / 2;
            if (arr[mid] < arr[mid + 1]) {
                // 下一轮搜索区间在 [mid + 1..right]
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(\log N)$，这里 $N$ 是输入数组的长度；
+ 空间复杂度：$O(1)$。