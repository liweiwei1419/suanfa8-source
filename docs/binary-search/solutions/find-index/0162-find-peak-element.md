---
title: 「力扣」第 162 题：寻找峰值（中等）
icon: yongyan
category: 二分查找
tags:
  - 二分查找
---

- 题目链接：[162. 寻找峰值](https://leetcode-cn.com/problems/find-peak-element/)；
- 题解链接：[减而治之，二分查找](https://leetcode-cn.com/problems/find-peak-element/solution/jian-er-zhi-zhi-er-fen-cha-zhao-by-liweiwei1419/)。

## 题目描述

峰值元素是指其值严格大于左右相邻值的元素。

给你一个整数数组 `nums`，找到峰值元素并返回其索引。数组可能包含多个峰值，在这种情况下，返回 **任何一个峰值** 所在位置即可。

你可以假设 `nums[-1] = nums[n] = -∞` 。

你必须实现时间复杂度为 `O(log n)` 的算法来解决此问题。

**示例 1：**

```
输入：nums = [1,2,3,1]
输出：2
解释：3 是峰值元素，你的函数应该返回其索引 2。
```

**示例 2：**

```
输入：nums = [1,2,1,3,5,6,4]
输出：1 或 5
解释：你的函数可以返回索引 1，其峰值元素为 2；
     或者返回索引 5， 其峰值元素为 6。
```

**提示：**

- `1 <= nums.length <= 1000`
- $-2^{31} <= nums[i] <= 2^{31} - 1$
- 对于所有有效的 `i` 都有 `nums[i] != nums[i + 1]`

## 思路分析

这道题题目中的关键信息很重要。

1. 题目中说：数组可能包含多个峰值，在这种情况下，返回任何一个峰值所在位置即可；
2. 下面这个条件很重要：

> 你可以假设 `nums[-1] = nums[n] = -∞` 。

::: info 重点
因为「两端」是负无穷，画个图，**有凸起的的地方到「两端」一定会有转折**，题目只要求返回任何一个峰值所在位置即可。
:::

题目最后的提示：

> - 对于所有有效的 `i` 都有 `nums[i] != nums[i + 1]`

可以写出如下 **参考代码**：

**说明**：

下面两版代码都对，区别在于一个看左边元素，一个看右边元素。

<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {

    public int findPeakElement(int[] nums) {
        int len = nums.length;
        int left = 0;
        int right = len - 1;
        // 在 nums[left..right] 中查找峰值
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] < nums[mid + 1]) {
                // 下一轮搜索的区间 [mid + 1..right]
                left = mid + 1;
            } else {
                // 下一轮搜索的区间 [left..mid]
                right = mid;
            }
        }
        // left 与 right 重合
        return left;
    }

}

````
</CodeGroupItem>

<CodeGroupItem title="Java">
```java
public class Solution {

    public int findPeakElement(int[] nums) {
        int len = nums.length;
        int left = 0;
        int right = len - 1;
        // 在 nums[left..right] 中查找峰值
        while (left < right) {
            int mid = left + (right - left + 1) / 2;
            if (nums[mid - 1] > nums[mid]) {
                // 下一轮搜索的区间 [left..mid - 1]
                right = mid - 1;
            } else {
                // 下一轮搜索的区间 [mid..right]
                left = mid;
            }
        }
        // left 与 right 重合
        return left;
    }
}
````

</CodeGroupItem>
</CodeGroup>

**复杂度分析**:

- 时间复杂度：$O(\log N)$，其中 $N$ 是输入数组 `nums` 的长度；
- 空间复杂度：$O(1)$。
