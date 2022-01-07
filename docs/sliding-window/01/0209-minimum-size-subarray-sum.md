---
title: 「力扣」第 209 题：长度最小的子数组（中等）
icon: yongyan
category: 滑动窗口
tags:
  - 滑动窗口
---


+ 题目链接：[209. 长度最小的子数组](https://leetcode-cn.com/problems/minimum-size-subarray-sum/)。


## 题目描述

给定一个含有 `n` 个正整数的数组和一个正整数 `target` **。**

找出该数组中满足其和 `≥ target` 的长度最小的 **连续子数组** $[nums_l,nums_{l+1}, ..., nums_{r-1}, nums_r]$ ，并返回其长度**。**如果不存在符合条件的子数组，返回 `0` 。

**示例 1：**

```
输入：target = 7, nums = [2,3,1,2,4,3]
输出：2
解释：子数组 [4,3] 是该条件下的长度最小的子数组。
```

**提示：**

+ $1 \le target \le 10^9$
+ $1 \le nums.length \le 10^5$
+ $1 \le nums[i] \le 10^5$

**进阶：**

- 如果你已经实现 $O(n)$ 时间复杂度的解法, 请尝试设计一个 $O(n \log(n))$ 时间复杂度的解法。

## 题意分析

**由于输入数组的所有元素都是正整数**，如果某个连续子数组的和大于等于 target，那么左端点固定、且长度更长的连续子数组的和一定也大于等于 **target。**

## 解题思路

但是题目要求找最短子数组，此时左端点需要右移。

符合滑动窗口性质：向右边扩散得到和越来越大，向左边界扩散得到和越来越小。

## 暴力解法

+ 枚举所有子数组，时间复杂度为 $O(N^2)$；
+ 计算它们的和，时间复杂度为 $O(N)$。如果和  `≥ target` ，记录长度，求出最小值。

总的时间复杂度为 $O(N^3)$。

## 暴力解法的优化

+ **可以使用滑动窗口的原因**：如果一个连续子数组的和   `≥ target` ，又因为 **题目中给出的数组是正整数数组**，左端点固定长度更长的子串一定满足 和   `≥ target` ，但是题目要求找长度最小值，因此这些连续子数组就没有必要考虑。

我们可以设计算法如下：

初始化的时候 `left = 0`、`right = 0`。

+ 先让 `right` 右移，直到窗口内的元素的和大于等于 `target` ；

+ 然后让 `left` 右移，使得有元素离开窗口，接着判断窗口内的元素的和是否依然大于等于 `target` ：

  + 如果是，就找到了一个满足题意的长度更小的连续子数组；
  + 如果不是，继续让 `right` 右移，直到窗口内的元素的和大于等于 `target` 。

以上右指针变量 `right` 和左指针变量 `left` 交替向右移动，就可以找到满足题意的长度最小连续子数组的长度。

**参考代码 1**：

```java
public class Solution {

    public int minSubArrayLen(int s, int[] nums) {
        int len = nums.length;

        int left = 0;
        int right = 0;
        int sum = 0;
        // 循环不变量：nums[left..right) >= s
        int minLen = len + 1;
        while (right < len) {
            sum += nums[right];
            right++;

            while (sum >= s) {
                // 如果加上某个数的和刚好大于 s，此时左边界需要右移，右移很可能不止一次，所以内部也是 while 循环
                minLen = Math.min(minLen, right - left);

                sum -= nums[left];
                left++;
            }
        }

        // 特殊用例判断
        if (minLen == len + 1) {
            return 0;
        }
        return minLen;
    }
}
```

**时间复杂度**：右指针遍历了数组一次、左指针还没有遍历到数组的末尾就停了下来，因此时间复杂度为 $O(N)$。

**进阶**：既然需要求连续子数组的和，我们可以先计算前缀和数组，通过前缀和之差求区间和。

+ 枚举每一个左边界 `left`，可以使用二分查找找到最小的右边界 `right` ，使得 `nums[left..right]` 的和大于等于 `target`，进而计算连续子数组长度的最小值；
+ 枚举每一个右边界 `right`，可以使用二分查找找到最大的左边界 `left` ，使得 `nums[left..right]` 的和大于等于 `target`，进而计算连续子数组长度的最小值，下面的「参考代码 2」就是这种实现。

大家可以不妨拿这道问题练习「二分查找」，看看自己是不是真正掌握了如何找边界呢？

**参考代码 2**：

```java
public class Solution {

    public int minSubArrayLen(int s, int[] nums) {

        int len = nums.length;
        if (len == 0) {
            return 0;
        }
        // 由于 nums 全都是正整数，因此 preSum 严格单调增加
        // preSum 表示 sum(nums[0..i))
        int[] preSum = new int[len + 1];
        preSum[0] = 0;
        for (int i = 0; i < len; i++) {
            preSum[i + 1] = preSum[i] + nums[i];
        }

        // System.out.println(Arrays.toString(preSum));
        int minLen = len + 1;
        // 遍历一次，找到和大于等于 s 的最大下标
        for (int i = 0; i < len; i++) {
            // 对于前缀和数组来说，有 1 个位置的偏移，找使得区间和 sum[left..right] >= s 的最大的 left
            int left = 0;
            int right = i;
            while (left < right) {
                int mid = left + (right - left + 1) / 2;
                // 什么时候解我们不需要呢，sum(nums[mid..i]) < s
                if (preSum[i + 1] - preSum[mid] < s) {
                    // 下一轮搜索区间在 [left..mid - 1]
                    right = mid - 1;
                } else {
                    // 下一轮搜索区间在 [mid..right]
                    left = mid;
                }
            }

            // 这里后处理
            // System.out.println("left = " + left);
            // System.out.println("区间和 = " + (preSum[i + 1] - preSum[left]));
            if (preSum[i + 1] - preSum[left] >= s) {
                minLen = Math.min(minLen, i - left + 1);
            }
        }

        if (minLen == len + 1) {
            return 0;
        }
        return minLen;
    }
}
```

**时间复杂度**：枚举右边界 $O(N)$，二分查找找到最短的左边界 $\log N$，总的时间复杂度为 $O(N \log N)$。
