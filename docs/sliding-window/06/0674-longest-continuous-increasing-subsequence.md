---
title: 「力扣」第 674 题：最长连续递增序列（简单）
icon: yongyan
category: 滑动窗口
tags:
  - 滑动窗口
---

- 题目链接：[674. 最长连续递增序列](https://leetcode-cn.com/problems/longest-continuous-increasing-subsequence/)。

## 题目描述

给定一个未经排序的整数数组，找到最长且 **连续递增的子序列**，并返回该序列的长度。

**连续递增的子序列** 可以由两个下标 `l` 和 `r`（`l < r`）确定，如果对于每个 `l <= i < r`，都有 `nums[i] < nums[i + 1]` ，那么子序列 `[nums[l], nums[l + 1], ..., nums[r - 1], nums[r]]` 就是连续递增子序列。

**示例 1：**

```
输入: [1,3,5,4,7]
输出: 3
解释: 最长连续递增序列是 [1,3,5], 长度为3。
尽管 [1,3,5,7] 也是升序的子序列, 但它不是连续的，因为 5 和 7 在原数组里被 4 隔开。
```

**示例 2:**

```
输入: [2,2,2,2,2]
输出: 1
解释: 最长连续递增序列是 [2], 长度为1。
```

**提示：**

- `0 <= nums.length <= 10^4`

- `-10^9 <= nums[i] <= 10^9`

要求是连续的子数组，画图分析。

## 滑动窗口

**参考代码**：

```Java []
public class Solution {

    public int findLengthOfLCIS(int[] nums) {
        int len = nums.length;
        if (len < 2) {
            return len;
        }
        int res = 0;

        int left = 0;
        int right = 0;
        while (right < len) {
            // 看清题目的条件，严格单调递增子数组（要求连续）
            if (right > 0 && nums[right - 1] >= nums[right]) {
                left = right;
            }
            right++;
            res = Math.max(res, right - left);
        }
        return res;
    }
}
```
