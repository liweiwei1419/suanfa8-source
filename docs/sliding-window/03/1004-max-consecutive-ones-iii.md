---
title: 「力扣」第 1004 题：最大连续1的个数 III（中等）
icon: yongyan
category: 滑动窗口
tags:
  - 滑动窗口
---

- 题目链接：[1004. 最大连续 1 的个数 III](https://leetcode-cn.com/problems/max-consecutive-ones-iii/)。

## 题目描述

给定一个由若干 `0` 和 `1` 组成的数组 `A`，我们最多可以将 `K` 个值从 0 变成 1 。

返回仅包含 1 的最长（连续）子数组的长度。

**示例 1：**

```
输入：A = [1,1,1,0,0,0,1,1,1,1,0], K = 2
输出：6
解释：
[1,1,1,0,0,1,1,1,1,1,1]
粗体数字从 0 翻转到 1，最长的子数组长度为 6。
```

**示例 2：**

```
输入：A = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], K = 3
输出：10
解释：
[0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]
粗体数字从 0 翻转到 1，最长的子数组长度为 10。
```

**提示：**

1. `1 <= A.length <= 20000`
2. `0 <= K <= A.length`
3. `A[i]` 为 `0` 或 `1`

---

可以参考官方题解：[最大连续 1 的个数 III](https://leetcode-cn.com/problems/max-consecutive-ones-iii/solution/zui-da-lian-xu-1de-ge-shu-iii-by-leetcod-hw12/)

**知识点：前缀和与二分查找**

**这题还可以用「二分查找」，需要留意。**

技巧：**要想快速判断一个区间内 0 的个数，我们可以考虑将数组** **_A_** **中的 0 变成 1，1 变成 0。**

## 方法一：前缀和 + 二分查找

思路还是比较直观的，可以学习一下。

**参考代码**：

```java
public class Solution {

    public int longestOnes(int[] nums, int k) {
        int len = nums.length;
        int[] preSum = new int[len + 1];
        for (int i = 0; i < len; i++) {
            // 1 - nums[i] 是为了统计 0 的个数，这是一个技巧
            preSum[i + 1] = preSum[i] + (1 - nums[i]);
        }

        int res = 0;
        // 枚举右边界，针对固定的右边界，找到最多替换 k 次以后，最小的 left 的下标
        for (int right = 0; right < len; right++) {
            int left = binarySearch(preSum, preSum[right + 1] - k);
            res = Math.max(res, right - left + 1);
        }
        return res;
    }

    public int binarySearch(int[] preSum, int target) {
        int left = 0;
        int right = preSum.length - 1;
        while (left < right) {
            int mid = (right - left) / 2 + left;
            if (preSum[mid] < target) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    }
}
```

## 方法二：滑动窗口

**参考代码**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {

    public int longestOnes(int[] nums, int k) {
        int len = nums.length;

        int left = 0;
        int right = 0;
        int res = 0;
        while (right < len) {
            if (nums[right] == 0) {
                k--;
            }
            right++;

            if (k < 0) {
                if (nums[left] == 0) {
                    k++;
                }
                left++;
            }
            res = Math.max(res, right - left);
        }
        return res;
    }

}

````
</CodeGroupItem>

<CodeGroupItem title="Java">
```java
public class Solution {

    public int longestOnes(int[] nums, int k) {
        int len = nums.length;
        int left = 0;
        int right = 0;
        while (right < len) {
            if (nums[right] == 0) {
                k--;
            }
            right++;
            if (k < 0) {
                if (nums[left] == 0) {
                    k++;
                }
                left++;
            }

        }
        return right - left;
    }
}
````

</CodeGroupItem>
</CodeGroup>
