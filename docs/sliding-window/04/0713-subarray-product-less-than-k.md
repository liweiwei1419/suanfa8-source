---
title: 「力扣」第 713 题：乘积小于 K 的子数组（中等）
icon: yongyan
category: 滑动窗口
tags:
  - 滑动窗口
---

![0713](https://tva1.sinaimg.cn/large/008i3skNgy1gx95j60i7mj30p00an0ta.jpg)

+ 题目链接：[713. 乘积小于K的子数组](https://leetcode-cn.com/problems/subarray-product-less-than-k/)、[剑指 Offer II 009. 乘积小于 K 的子数组](https://leetcode-cn.com/problems/ZVAVXX/)（两题一模一样）
+ 题解链接：[滑动窗口（Java）](https://leetcode-cn.com/problems/ZVAVXX/solution/hua-dong-chuang-kou-java-by-liweiwei1419-p81h/)

## 题目描述

给定一个正整数数组 `nums`。

找出该数组内乘积小于 `k` 的连续的子数组的个数。

**示例 1:**

```
输入: nums = [10,5,2,6], k = 100

输出: 8

解释: 8个乘积小于100的子数组分别为: [10], [5], [2], [6], [10,5], [5,2], [2,6], [5,2,6]。

需要注意的是 [10,5,2] 并不是乘积小于100的子数组。
```

**说明:**

- `0 < nums.length <= 50000`
- `0 < nums[i] < 1000`
- `0 <= k < 10^6`

## 思路分析

+ 暴力解法：枚举所有的输入数组的连续子数组，逐个判断它们的乘积是否严格小于 `k`；
+ 暴力解法没有利用到「**输入数组是正整数数组**」这个条件。

::: danger 关键字
+ 正整数：输入数组里所有的元素都是正整数，这一点很关键；
+ 连续子数组：连续很重要。
:::

::: info 本题可以使用「滑动窗口」的原因

**关键 1**：如果一个连续子数组的所有元素的乘积都严格小于 `k`，那么这个 **连续子数组的子集（同样也得保证是连续子数组）的乘积也一定严格小于 `k`**。

原因我们在「关键字」里也向大家强调过，数组里的所有元素都是正整数。

**关键 2**：如果某个连续子数组的乘积大于等于 `k`，包含它的更长的子数组一定也不满足。

基于以上两点，我们可以设计「滑动窗口」算法。因此「滑动窗口」方法是「暴力解法」的优化。
:::


因此我们可以使用「滑动窗口」找到 **最大可以撑开的** 窗口的长度，然后一下子计算出此时符合题意的子数组的个数。

**如何计数**：

计数的时候关键要做到 **不重不漏**。

::: danger 建议
我们建议大家用具体的例子在纸上写写画画，好摸清楚计数的规律。
:::

下面是我使用的计数的方法。以题目中给出的「示例 1」为例。

![image.png](https://pic.leetcode-cn.com/1630675151-PXmQum-image.png)

**说明**：这里把区间定义成左闭右闭也是完全可以的。我这样定义的原因是：

+ `right` 定义为开区间的端点，表示的意思是 `right` 左边的数值程序都看到过；
+ 此时 `[left..right)` 区间的长度表示为 `right - left`。


下面的「参考代码 1」和「参考代码 2」我们对区间的定义是不一样的，影响了编码中的一些细节，供大家比对。

我们写代码每一步都要有理由，我们人为定义的循环不变量就是我们写对代码的依据。

**参考代码 1**：

```java
public class Solution {

    public int numSubarrayProductLessThanK(int[] nums, int k) {
        // 特殊用例判断
        if (k <= 1) {
            return 0;
        }
        int len = nums.length;
        int left = 0;
        int right = 0;
        int count = 0;
        int product = 1;
        // 循环不变量：nums[left..right) 里所有元素的乘积严格小于 k
        while (right < len) {
            product *= nums[right];
            right++;
            while (product >= k) {
                product /= nums[left];
                left++;
            }
            count += (right - left);
        }
        return count;
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(N)$，这里 $N$ 是输入数组的长度。`right` 需要遍历输入数组一次，绝大多数情况下，`left` 还没有遍历到输入数组的末尾就停了下来。


**参考代码 2**：

```java
public class Solution {

    public int numSubarrayProductLessThanK(int[] nums, int k) {
        if (k <= 1) {
            return 0;
        }
        int len = nums.length;
        int left = 0;
        int right = 0;
        int count = 0;
        int product = 1;
        // 循环不变量：nums[left..right] 里所有元素的乘积严格小于 k
        while (right < len) {
            product *= nums[right];
            while (product >= k) {
                product /= nums[left];
                left++;
            }
            count += (right - left + 1);
            right++;
        }
        return count;
    }
}
```

这就是这一节的分享，我讲解的算法特别好懂，欢迎关注我的公众号「算法不好玩」。

![](https://files.mdnice.com/user/5576/e99835c7-09e3-4820-9956-721c37d13a14.png)

